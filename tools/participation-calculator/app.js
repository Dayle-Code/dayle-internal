const projectNameInput = document.getElementById("project-name");
const memberCountInput = document.getElementById("member-count");
const businessDaysInput = document.getElementById("business-days");
const tolerancePreview = document.getElementById("tolerance-preview");
const membersList = document.getElementById("members-list");
const calculateButton = document.getElementById("calculate-button");
const resetMembersButton = document.getElementById("reset-members");
const loadExampleButton = document.getElementById("load-example");
const clearStorageButton = document.getElementById("clear-storage");
const result = document.getElementById("result");

const STORAGE_KEY = "daely-participation-calculator:v2";

const POLICY = {
  toleranceRate: 0.05,
  minimumValidParticipation: 30,
  minimumShareWithValidParticipation: 5,
};

const EXAMPLE_STATE = {
  projectName: "Web institucional cliente",
  memberCount: 5,
  businessDays: 45,
  members: [
    { name: "Integrante 1", absences: 0, validParticipation: 100, manuallyBonusEligible: true },
    { name: "Integrante 2", absences: 1, validParticipation: 95, manuallyBonusEligible: true },
    { name: "Integrante 3", absences: 2, validParticipation: 80, manuallyBonusEligible: true },
    { name: "Integrante 4", absences: 6, validParticipation: 70, manuallyBonusEligible: true },
    { name: "Integrante 5", absences: 20, validParticipation: 20, manuallyBonusEligible: true },
  ],
};

function clampNumber(value, min, max) {
  const number = Number(value);
  if (Number.isNaN(number)) return min;
  return Math.min(Math.max(number, min), max);
}

function round2(value) {
  return Math.round((Number(value) + Number.EPSILON) * 100) / 100;
}

function formatPercent(value) {
  const rounded = round2(value);
  return Number.isInteger(rounded) ? `${rounded}%` : `${rounded.toFixed(2)}%`;
}

function formatNumber(value) {
  const rounded = round2(value);
  return Number.isInteger(rounded) ? String(rounded) : rounded.toFixed(2);
}

function calculateToleratedAbsences(businessDays) {
  return Math.floor(businessDays * POLICY.toleranceRate);
}

function calculateDiscount(penalizableAbsences) {
  const absences = Math.max(0, Number(penalizableAbsences));

  if (absences <= 3) {
    return absences * 1;
  }

  if (absences <= 6) {
    return 3 + (absences - 3) * 2;
  }

  return 9 + (absences - 6) * 3;
}

function getAbsenceRatioStatus(absenceRatio) {
  if (absenceRatio >= 50) return { label: "Revisión 0%", className: "badge-danger" };
  if (absenceRatio >= 40) return { label: "Pierde piso posible", className: "badge-danger" };
  if (absenceRatio >= 20) return { label: "Revisión obligatoria", className: "badge-warn" };
  return { label: "Escala normal", className: "badge-ok" };
}

function getParticipationStatus(row) {
  if (!row.hasMinimumParticipation) return { label: "0% por baja participación", className: "badge-danger" };
  if (row.postPenaltyShare === POLICY.minimumShareWithValidParticipation && row.preliminaryShare < POLICY.minimumShareWithValidParticipation) {
    return { label: "Conserva piso mínimo", className: "badge-warn" };
  }
  if (row.wasPenalized) return { label: "Penalizado", className: "badge-warn" };
  return { label: "Sin penalización", className: "badge-ok" };
}

function createMemberCard(member, index) {
  const card = document.createElement("article");
  card.className = "member-card";
  card.innerHTML = `
    <label>
      Nombre
      <input class="member-name" value="${escapeHtml(member?.name ?? `Integrante ${index + 1}`)}" autocomplete="off" />
    </label>

    <label>
      Puntos de falta
      <input class="member-absences" type="number" min="0" step="0.5" value="${member?.absences ?? 0}" />
    </label>

    <label>
      Participación válida (%)
      <input class="member-valid-participation" type="number" min="0" max="100" step="1" value="${member?.validParticipation ?? 100}" />
    </label>

    <label class="checkbox-label">
      Elegible a bono manualmente
      <span class="checkbox-row">
        <input class="member-bonus-eligible" type="checkbox" ${member?.manuallyBonusEligible === false ? "" : "checked"} />
        Sí
      </span>
    </label>
  `;

  card.addEventListener("input", saveState);
  card.addEventListener("change", saveState);

  return card;
}

function updateTolerancePreview() {
  const businessDays = clampNumber(businessDaysInput.value, 1, 365);
  businessDaysInput.value = businessDays;
  const tolerated = calculateToleratedAbsences(businessDays);
  tolerancePreview.value = `${formatNumber(tolerated)} ${tolerated === 1 ? "falta" : "faltas"}`;
}

function renderMembers(members = []) {
  const count = clampNumber(memberCountInput.value, 1, 20);
  memberCountInput.value = count;
  membersList.innerHTML = "";

  for (let index = 0; index < count; index += 1) {
    membersList.appendChild(createMemberCard(members[index], index));
  }

  result.innerHTML = "";
  updateTolerancePreview();
  saveState();
}

function getMembersData() {
  return [...membersList.querySelectorAll(".member-card")].map((card, index) => {
    const name = card.querySelector(".member-name").value.trim() || `Integrante ${index + 1}`;
    const absences = clampNumber(card.querySelector(".member-absences").value, 0, 999);
    const validParticipation = clampNumber(card.querySelector(".member-valid-participation").value, 0, 100);
    const manuallyBonusEligible = card.querySelector(".member-bonus-eligible").checked;

    card.querySelector(".member-absences").value = absences;
    card.querySelector(".member-valid-participation").value = validParticipation;

    return {
      name,
      absences,
      validParticipation,
      manuallyBonusEligible,
    };
  });
}

function getCurrentState() {
  return {
    projectName: projectNameInput.value.trim() || "Proyecto sin nombre",
    memberCount: clampNumber(memberCountInput.value, 1, 20),
    businessDays: clampNumber(businessDaysInput.value, 1, 365),
    members: getMembersData(),
  };
}

function applyState(state) {
  projectNameInput.value = state?.projectName || "Proyecto interno";
  memberCountInput.value = clampNumber(state?.memberCount ?? state?.members?.length ?? 5, 1, 20);
  businessDaysInput.value = clampNumber(state?.businessDays ?? 85, 1, 365);
  updateTolerancePreview();
  renderMembers(Array.isArray(state?.members) ? state.members : []);
}

function saveState() {
  try {
    const state = {
      projectName: projectNameInput.value.trim(),
      memberCount: clampNumber(memberCountInput.value, 1, 20),
      businessDays: clampNumber(businessDaysInput.value, 1, 365),
      members: [...membersList.querySelectorAll(".member-card")].map((card, index) => ({
        name: card.querySelector(".member-name").value.trim() || `Integrante ${index + 1}`,
        absences: clampNumber(card.querySelector(".member-absences").value, 0, 999),
        validParticipation: clampNumber(card.querySelector(".member-valid-participation").value, 0, 100),
        manuallyBonusEligible: card.querySelector(".member-bonus-eligible").checked,
      })),
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // localStorage puede estar bloqueado. La calculadora sigue funcionando sin persistencia.
  }
}

function loadSavedState() {
  try {
    const rawState = localStorage.getItem(STORAGE_KEY);
    if (!rawState) return null;
    return JSON.parse(rawState);
  } catch {
    return null;
  }
}

function calculateDistribution() {
  const state = getCurrentState();
  const members = state.members;
  const memberCount = members.length;
  const businessDays = state.businessDays;
  const baseShare = 100 / memberCount;
  const toleratedAbsences = calculateToleratedAbsences(businessDays);

  const rows = members.map((member) => {
    const penalizableAbsences = Math.max(0, member.absences - toleratedAbsences);
    const policyDiscount = calculateDiscount(penalizableAbsences);
    const hasMinimumParticipation = member.validParticipation >= POLICY.minimumValidParticipation;
    const preliminaryShare = baseShare - policyDiscount;
    const postPenaltyShare = hasMinimumParticipation
      ? Math.max(preliminaryShare, POLICY.minimumShareWithValidParticipation)
      : 0;
    const appliedDiscount = Math.max(0, baseShare - postPenaltyShare);
    const wasPenalized = appliedDiscount > 0 || penalizableAbsences > 0;
    const canReceiveBonus = !wasPenalized && hasMinimumParticipation && member.manuallyBonusEligible;
    const absenceRatio = round2((member.absences / businessDays) * 100);
    const ratioStatus = getAbsenceRatioStatus(absenceRatio);

    const row = {
      ...member,
      baseShare,
      toleratedAbsences,
      penalizableAbsences,
      policyDiscount,
      preliminaryShare,
      postPenaltyShare,
      appliedDiscount,
      wasPenalized,
      canReceiveBonus,
      hasMinimumParticipation,
      absenceRatio,
      ratioStatus,
    };

    return {
      ...row,
      participationStatus: getParticipationStatus(row),
    };
  });

  const commonPool = rows.reduce((total, row) => total + row.appliedDiscount, 0);
  const bonusEligibleMembers = rows.filter((row) => row.canReceiveBonus);
  const individualBonus = bonusEligibleMembers.length > 0 ? commonPool / bonusEligibleMembers.length : 0;
  const undistributedPool = bonusEligibleMembers.length > 0 ? 0 : commonPool;

  const finalRows = rows.map((row) => {
    const bonus = row.canReceiveBonus ? individualBonus : 0;
    return {
      ...row,
      bonus,
      finalShare: row.postPenaltyShare + bonus,
    };
  });

  const finalDistributed = finalRows.reduce((total, row) => total + row.finalShare, 0);
  const accountingTotal = finalDistributed + undistributedPool;

  return {
    projectName: state.projectName,
    memberCount,
    businessDays,
    baseShare,
    toleratedAbsences,
    commonPool,
    bonusEligibleCount: bonusEligibleMembers.length,
    individualBonus,
    undistributedPool,
    finalDistributed,
    accountingTotal,
    rows: finalRows,
  };
}

function getAlerts(data) {
  const alerts = [];
  const zeroMembers = data.rows.filter((row) => row.finalShare === 0);
  const floorMembers = data.rows.filter(
    (row) => row.postPenaltyShare === POLICY.minimumShareWithValidParticipation && row.preliminaryShare < POLICY.minimumShareWithValidParticipation,
  );
  const highAbsenceMembers = data.rows.filter((row) => row.absenceRatio >= 20);

  if (zeroMembers.length > 0) {
    alerts.push({
      type: "danger",
      text: `${zeroMembers.length} integrante(s) quedan en 0% por no alcanzar la participación mínima válida del ${POLICY.minimumValidParticipation}%.`,
    });
  }

  if (floorMembers.length > 0) {
    alerts.push({
      type: "warn",
      text: `${floorMembers.length} integrante(s) conservan el piso mínimo del ${POLICY.minimumShareWithValidParticipation}% pese a tener penalización alta.`,
    });
  }

  if (highAbsenceMembers.length > 0) {
    alerts.push({
      type: "warn",
      text: `${highAbsenceMembers.length} integrante(s) superan el 20% de faltas sobre la duración del proyecto. Revisar impacto real.`,
    });
  }

  if (data.bonusEligibleCount === 0 && data.commonPool > 0) {
    alerts.push({
      type: "info",
      text: "No hay integrantes elegibles para bono. La bolsa queda pendiente/no distribuida para que el equipo defina su destino.",
    });
  }

  if (Math.abs(data.accountingTotal - 100) > 0.01) {
    alerts.push({
      type: "danger",
      text: `El cierre contable no da 100%. Resultado actual: ${formatPercent(data.accountingTotal)}. Revisar datos o regla de distribución.`,
    });
  }

  return alerts;
}

function renderResult(data) {
  const alerts = getAlerts(data);
  const markdown = buildMarkdownSummary(data, alerts);

  result.innerHTML = `
    <div class="result-head">
      <div>
        <h2>Resultado</h2>
        <p class="note">Proyecto: <strong>${escapeHtml(data.projectName)}</strong></p>
      </div>
      <div class="result-actions">
        <button id="copy-result" class="copy-button" type="button">Copiar resumen</button>
        <button id="download-result" class="copy-button" type="button">Descargar .md</button>
      </div>
    </div>

    <div class="summary-grid">
      <div class="metric">
        <span>Base individual</span>
        <strong>${formatPercent(data.baseShare)}</strong>
      </div>
      <div class="metric">
        <span>Faltas toleradas</span>
        <strong>${formatNumber(data.toleratedAbsences)}</strong>
      </div>
      <div class="metric">
        <span>Bolsa común</span>
        <strong>${formatPercent(data.commonPool)}</strong>
      </div>
      <div class="metric">
        <span>Bono individual</span>
        <strong>${formatPercent(data.individualBonus)}</strong>
      </div>
      <div class="metric">
        <span>Cierre contable</span>
        <strong>${formatPercent(data.accountingTotal)}</strong>
      </div>
    </div>

    ${
      alerts.length > 0
        ? `<div class="alerts">${alerts.map((alert) => `<div class="alert ${alert.type}">${escapeHtml(alert.text)}</div>`).join("")}</div>`
        : ""
    }

    <div class="table-wrap">
      <table>
        <thead>
          <tr>
            <th>Integrante</th>
            <th>Faltas</th>
            <th>Penalizables</th>
            <th>Ratio</th>
            <th>Estado ratio</th>
            <th>Participación válida</th>
            <th>Estado</th>
            <th>Descuento</th>
            <th>Post-penalización</th>
            <th>Bono</th>
            <th>Final</th>
          </tr>
        </thead>
        <tbody>
          ${data.rows
            .map(
              (row) => `
                <tr>
                  <td><strong>${escapeHtml(row.name)}</strong></td>
                  <td>${formatNumber(row.absences)}</td>
                  <td>${formatNumber(row.penalizableAbsences)}</td>
                  <td>${formatPercent(row.absenceRatio)}</td>
                  <td><span class="badge ${row.ratioStatus.className}">${escapeHtml(row.ratioStatus.label)}</span></td>
                  <td>${formatPercent(row.validParticipation)}</td>
                  <td><span class="badge ${row.participationStatus.className}">${escapeHtml(row.participationStatus.label)}</span></td>
                  <td>-${formatPercent(row.appliedDiscount)}</td>
                  <td>${formatPercent(row.postPenaltyShare)}</td>
                  <td>${formatPercent(row.bonus)}</td>
                  <td><strong>${formatPercent(row.finalShare)}</strong></td>
                </tr>
              `,
            )
            .join("")}
        </tbody>
      </table>
    </div>

    <p class="note">
      Total distribuido: <strong>${formatPercent(data.finalDistributed)}</strong>.
      Bolsa no distribuida: <strong>${formatPercent(data.undistributedPool)}</strong>.
      Cierre contable: <strong>${formatPercent(data.accountingTotal)}</strong>.
    </p>

    <div class="result-markdown">
      <h3>Resumen en Markdown</h3>
      <textarea id="markdown-summary" readonly>${escapeHtml(markdown)}</textarea>
    </div>
  `;

  document.getElementById("copy-result").addEventListener("click", () => copyText(markdown));
  document.getElementById("download-result").addEventListener("click", () => downloadMarkdown(markdown, data.projectName));
}

function buildMarkdownSummary(data, alerts) {
  const lines = [];
  lines.push(`# Distribución de participación - ${data.projectName}`);
  lines.push("");
  lines.push(`- Días hábiles del proyecto: ${formatNumber(data.businessDays)}`);
  lines.push(`- Integrantes activos: ${data.memberCount}`);
  lines.push(`- Base individual: ${formatPercent(data.baseShare)}`);
  lines.push(`- Tolerancia de faltas: ${formatNumber(data.toleratedAbsences)}`);
  lines.push(`- Bolsa común: ${formatPercent(data.commonPool)}`);
  lines.push(`- Integrantes con bono: ${data.bonusEligibleCount}`);
  lines.push(`- Bono individual: ${formatPercent(data.individualBonus)}`);
  lines.push(`- Bolsa no distribuida: ${formatPercent(data.undistributedPool)}`);
  lines.push(`- Cierre contable: ${formatPercent(data.accountingTotal)}`);
  lines.push("");

  if (alerts.length > 0) {
    lines.push("## Alertas");
    alerts.forEach((alert) => lines.push(`- ${alert.text}`));
    lines.push("");
  }

  lines.push("## Resultado por integrante");
  lines.push("");
  lines.push("| Integrante | Faltas | Penalizables | Participación válida | Descuento | Bono | Final | Estado |");
  lines.push("|---|---:|---:|---:|---:|---:|---:|---|");

  data.rows.forEach((row) => {
    lines.push(
      `| ${row.name} | ${formatNumber(row.absences)} | ${formatNumber(row.penalizableAbsences)} | ${formatPercent(row.validParticipation)} | -${formatPercent(row.appliedDiscount)} | ${formatPercent(row.bonus)} | ${formatPercent(row.finalShare)} | ${row.participationStatus.label} |`,
    );
  });

  lines.push("");
  lines.push("## Regla aplicada");
  lines.push("");
  lines.push("- Tolerancia: 5% de los días hábiles del proyecto, redondeado hacia abajo.");
  lines.push("- Faltas penalizables 1 a 3: -1 punto porcentual cada una.");
  lines.push("- Faltas penalizables 4 a 6: -2 puntos porcentuales cada una.");
  lines.push("- Faltas penalizables 7 en adelante: -3 puntos porcentuales cada una.");
  lines.push("- Piso mínimo: 5% solo si la persona cumple al menos 30% de participación válida.");
  lines.push("- Si no hay integrantes elegibles para bono, la bolsa queda pendiente/no distribuida.");

  return lines.join("\n");
}

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    showToast("Resumen copiado");
  } catch {
    const textarea = document.getElementById("markdown-summary");
    textarea.select();
    document.execCommand("copy");
    showToast("Resumen copiado");
  }
}

function downloadMarkdown(markdown, projectName) {
  const safeName = projectName
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "") || "distribucion-participacion";
  const blob = new Blob([markdown], { type: "text/markdown;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${safeName}-participacion.md`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
  showToast("Archivo .md generado");
}

function showToast(message) {
  const previousToast = document.querySelector(".toast");
  previousToast?.remove();

  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = message;
  document.body.appendChild(toast);

  setTimeout(() => toast.remove(), 2200);
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

projectNameInput.addEventListener("input", saveState);
memberCountInput.addEventListener("change", () => renderMembers(getMembersData()));
businessDaysInput.addEventListener("input", () => {
  updateTolerancePreview();
  saveState();
});
resetMembersButton.addEventListener("click", () => renderMembers());
loadExampleButton.addEventListener("click", () => {
  applyState(EXAMPLE_STATE);
  showToast("Ejemplo cargado");
});
clearStorageButton.addEventListener("click", () => {
  localStorage.removeItem(STORAGE_KEY);
  applyState({ projectName: "Proyecto interno", memberCount: 5, businessDays: 85, members: [] });
  result.innerHTML = "";
  showToast("Datos limpiados");
});
calculateButton.addEventListener("click", () => {
  const data = calculateDistribution();
  saveState();
  renderResult(data);
  result.scrollIntoView({ behavior: "smooth", block: "start" });
});

const savedState = loadSavedState();
applyState(savedState || { projectName: "Proyecto interno", memberCount: 5, businessDays: 85, members: [] });
