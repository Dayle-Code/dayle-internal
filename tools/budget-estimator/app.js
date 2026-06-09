const STORAGE_KEY = "dayle-budget-estimator:v1";

const PRESETS = [
  {
    id: "landing",
    name: "Landing / campaña",
    description: "Página enfocada en conversión, contenido breve y deploy simple.",
    scope: { pages: 5, screens: 0, entities: 0, roles: 0, integrations: 0, automations: 0 },
    modules: ["discovery", "uxui", "copyContent", "frontendStatic", "seo", "deploy", "qa", "docs"],
  },
  {
    id: "institutional",
    name: "Sitio institucional",
    description: "Web de marca con varias secciones, contenido administrable manualmente y SEO base.",
    scope: { pages: 8, screens: 0, entities: 0, roles: 0, integrations: 1, automations: 0 },
    modules: ["discovery", "uxui", "copyContent", "frontendStatic", "forms", "seo", "analytics", "deploy", "qa", "docs"],
  },
  {
    id: "catalogWhatsapp",
    name: "Catálogo / pedidos por WhatsApp",
    description: "Menú, carrito, checkout informativo y mensaje armado para WhatsApp.",
    scope: { pages: 3, screens: 8, entities: 3, roles: 0, integrations: 1, automations: 1 },
    modules: ["discovery", "uxui", "frontendApp", "catalog", "cartCheckout", "whatsapp", "pwa", "deploy", "qa", "docs"],
  },
  {
    id: "webappMvp",
    name: "Web app / MVP",
    description: "Producto funcional con flujos, datos, autenticación y panel mínimo.",
    scope: { pages: 2, screens: 14, entities: 6, roles: 3, integrations: 2, automations: 2 },
    modules: ["discovery", "productSpec", "uxui", "frontendApp", "backendApi", "database", "auth", "admin", "files", "deploy", "qa", "docs"],
  },
  {
    id: "internalSystem",
    name: "Sistema interno",
    description: "Operación interna, paneles, permisos, reglas de negocio y datos persistentes.",
    scope: { pages: 1, screens: 22, entities: 10, roles: 4, integrations: 3, automations: 4 },
    modules: ["discovery", "productSpec", "uxui", "frontendApp", "backendApi", "database", "auth", "admin", "analytics", "externalIntegrations", "notifications", "deploy", "qa", "docs", "training"],
  },
  {
    id: "dashboard",
    name: "Dashboard / reportes",
    description: "Visualización de métricas, filtros, reportes y fuentes de datos.",
    scope: { pages: 1, screens: 12, entities: 7, roles: 2, integrations: 3, automations: 2 },
    modules: ["discovery", "productSpec", "uxui", "frontendApp", "backendApi", "database", "analytics", "externalIntegrations", "search", "deploy", "qa", "docs"],
  },
  {
    id: "automation",
    name: "Automatización / integración",
    description: "Flujos entre herramientas, APIs, bots, sincronización o tareas repetibles.",
    scope: { pages: 0, screens: 3, entities: 4, roles: 1, integrations: 4, automations: 6 },
    modules: ["discovery", "productSpec", "backendApi", "database", "externalIntegrations", "automation", "notifications", "deploy", "qa", "docs"],
  },
  {
    id: "backendApi",
    name: "Backend / API",
    description: "API, base de datos, autenticación, servicios y documentación técnica.",
    scope: { pages: 0, screens: 0, entities: 10, roles: 3, integrations: 3, automations: 2 },
    modules: ["discovery", "productSpec", "backendApi", "database", "auth", "externalIntegrations", "security", "deploy", "qa", "docs"],
  },
  {
    id: "aiData",
    name: "IA / datos / scraping",
    description: "Automatización con IA, procesamiento de datos, extracción o análisis experimental.",
    scope: { pages: 0, screens: 6, entities: 6, roles: 1, integrations: 3, automations: 5 },
    modules: ["discovery", "research", "productSpec", "backendApi", "database", "aiData", "automation", "analytics", "security", "deploy", "qa", "docs"],
  },
  {
    id: "unknown",
    name: "Proyecto desconocido / exploratorio",
    description: "Cuando todavía no saben bien qué van a construir o es territorio nuevo.",
    scope: { pages: 2, screens: 10, entities: 6, roles: 2, integrations: 2, automations: 2 },
    modules: ["discovery", "research", "productSpec", "uxui", "frontendApp", "backendApi", "database", "deploy", "qa", "docs"],
  },
];

const MODULES = [
  {
    id: "discovery",
    category: "Estrategia",
    name: "Discovery / relevamiento",
    description: "Entrevistas, análisis de problema, objetivos, restricciones, alcance inicial y riesgos.",
    min: 4,
    max: 14,
    scalers: { integrations: [0.5, 1.5], automations: [0.3, 1] },
    questions: ["¿Cuál es el resultado de negocio que tiene que lograr el proyecto?", "¿Quién decide el alcance final?"],
  },
  {
    id: "research",
    category: "Estrategia",
    name: "Investigación / prueba técnica",
    description: "Análisis de viabilidad para dominios nuevos, APIs desconocidas, IA, scraping o tecnologías no probadas.",
    min: 8,
    max: 40,
    scalers: { integrations: [1, 4], automations: [0.5, 3] },
    flags: ["No vender como desarrollo cerrado si todavía no está validada la viabilidad."],
    questions: ["¿Hay documentación o accesos de prueba?", "¿Qué pasa si la integración elegida no permite lo que el cliente pide?"],
  },
  {
    id: "productSpec",
    category: "Estrategia",
    name: "Especificación funcional",
    description: "Casos de uso, pantallas, reglas de negocio, criterios de aceptación y exclusiones.",
    min: 6,
    max: 28,
    scalers: { screens: [0.25, 0.9], entities: [0.4, 1.1], roles: [0.5, 1.4] },
    questions: ["¿Qué queda explícitamente fuera de la primera versión?", "¿Qué casos generan error o estados límite?"],
  },
  {
    id: "uxui",
    category: "Producto",
    name: "UX/UI y prototipo",
    description: "Arquitectura de información, wireframes, UI, responsive, estados vacíos y recorrido de usuario.",
    min: 10,
    max: 42,
    scalers: { pages: [0.5, 1.8], screens: [0.8, 2.8] },
    questions: ["¿El cliente aporta identidad visual o hay que definirla?", "¿Cuántos estados reales tendrá cada pantalla?"],
  },
  {
    id: "copyContent",
    category: "Producto",
    name: "Contenido / copy / estructura comercial",
    description: "Textos, jerarquía comercial, mensajes, microcopy, carga inicial y ajustes de claridad.",
    min: 4,
    max: 18,
    scalers: { pages: [0.4, 1.4] },
    questions: ["¿El cliente entrega textos finales o hay que redactarlos?", "¿Quién aprueba tono, claims y datos comerciales?"],
  },
  {
    id: "frontendStatic",
    category: "Frontend",
    name: "Frontend estático",
    description: "Landing o sitio liviano sin estado complejo. Maquetación responsive, accesibilidad base y performance.",
    min: 10,
    max: 38,
    scalers: { pages: [1.2, 4] },
    questions: ["¿Todas las secciones tienen diseño definido?", "¿Necesita animaciones o interacciones especiales?"],
  },
  {
    id: "frontendApp",
    category: "Frontend",
    name: "Frontend de aplicación",
    description: "SPA o web app con estado, formularios, flujos, validaciones, navegación y componentes reutilizables.",
    min: 18,
    max: 78,
    scalers: { screens: [1.5, 5], entities: [0.6, 2] },
    questions: ["¿Qué pantallas son críticas para mobile?", "¿Qué datos deben persistir localmente o en servidor?"],
  },
  {
    id: "catalog",
    category: "Frontend",
    name: "Catálogo / listado de productos",
    description: "Categorías, cards, búsqueda/filtros simples, productos, variantes y datos editables.",
    min: 8,
    max: 34,
    scalers: { entities: [0.5, 1.8] },
    questions: ["¿Quién mantiene productos y precios?", "¿La carta cambia seguido o será estática?"],
  },
  {
    id: "cartCheckout",
    category: "Frontend",
    name: "Carrito / checkout",
    description: "Estado de carrito, cantidades, totales, descuentos, validaciones, checkout y resumen final.",
    min: 14,
    max: 54,
    scalers: { screens: [0.4, 1.3], automations: [0.4, 1.4] },
    questions: ["¿Hay descuentos, recargos, combos o promociones?", "¿El pedido se confirma dentro del sistema o por canal externo?"],
  },
  {
    id: "forms",
    category: "Frontend",
    name: "Formularios y validaciones",
    description: "Formularios de contacto, consultas, carga de datos, validación, estados de error y envío.",
    min: 5,
    max: 22,
    scalers: { screens: [0.3, 1.2], integrations: [0.8, 2.5] },
    questions: ["¿A dónde llegan los formularios?", "¿Hay campos obligatorios, archivos o validaciones especiales?"],
  },
  {
    id: "backendApi",
    category: "Backend",
    name: "Backend / API",
    description: "Endpoints, servicios, reglas de negocio, validaciones servidor, documentación y manejo de errores.",
    min: 22,
    max: 100,
    scalers: { entities: [2.2, 8], integrations: [2.5, 10], automations: [1, 5] },
    questions: ["¿Qué reglas no pueden vivir solo en frontend?", "¿Qué volumen de uso esperado tendrá el sistema?"],
  },
  {
    id: "database",
    category: "Backend",
    name: "Base de datos / modelo de datos",
    description: "Modelo, relaciones, migraciones, seed inicial, consultas, índices básicos y persistencia.",
    min: 10,
    max: 46,
    scalers: { entities: [1.5, 5.5] },
    questions: ["¿Qué datos son sensibles o críticos?", "¿Hay historial, auditoría o recuperación de datos?"],
  },
  {
    id: "auth",
    category: "Backend",
    name: "Login, usuarios y roles",
    description: "Autenticación, sesiones, permisos, rutas protegidas, recuperación de acceso y perfiles.",
    min: 12,
    max: 54,
    scalers: { roles: [2, 6], screens: [0.3, 1] },
    flags: ["Autenticación y permisos aumentan riesgo de seguridad y QA."],
    questions: ["¿Quién crea usuarios?", "¿Hay roles con permisos parciales?", "¿Se necesita recuperación de contraseña?"],
  },
  {
    id: "admin",
    category: "Backend",
    name: "Panel administrativo / CRUD",
    description: "Altas, bajas, edición, listados, filtros, detalles, estados, acciones administrativas y permisos.",
    min: 18,
    max: 95,
    scalers: { entities: [2.2, 8], screens: [0.6, 2.4], roles: [0.8, 2.5] },
    questions: ["¿Qué puede editar el admin sin tocar código?", "¿Hay acciones irreversibles o con aprobación?"],
  },
  {
    id: "payments",
    category: "Integraciones",
    name: "Pagos online",
    description: "Mercado Pago, Stripe u otro proveedor: checkout, callbacks/webhooks, estados, pruebas y conciliación base.",
    min: 14,
    max: 62,
    scalers: { integrations: [1, 6], automations: [0.8, 3] },
    flags: ["Pagos online requieren pruebas reales, callbacks y manejo de errores de proveedor."],
    questions: ["¿Qué proveedor exacto se usa?", "¿El cliente ya tiene cuenta verificada?", "¿Qué pasa con pagos rechazados o pendientes?"],
  },
  {
    id: "whatsapp",
    category: "Integraciones",
    name: "WhatsApp / mensaje automático",
    description: "Generación de mensaje, formato legible, validaciones previas y enlace de envío.",
    min: 4,
    max: 18,
    scalers: { automations: [0.3, 1.1] },
    questions: ["¿El WhatsApp cierra el pedido o solo inicia conversación?", "¿Qué información no puede faltar en el mensaje?"],
  },
  {
    id: "externalIntegrations",
    category: "Integraciones",
    name: "Integraciones externas / APIs",
    description: "Conexión con servicios de terceros, CRMs, planillas, ERPs, proveedores, webhooks o herramientas internas.",
    min: 10,
    max: 58,
    scalers: { integrations: [4, 18], automations: [1, 5] },
    flags: ["No cerrar precio final sin documentación y acceso de prueba de las APIs críticas."],
    questions: ["¿Hay documentación técnica actualizada?", "¿Quién entrega credenciales?", "¿La API tiene límites, costos o ambiente sandbox?"],
  },
  {
    id: "notifications",
    category: "Integraciones",
    name: "Notificaciones",
    description: "Emails, WhatsApp, push, avisos internos, recordatorios, plantillas, errores y reintentos simples.",
    min: 8,
    max: 34,
    scalers: { integrations: [1, 4], automations: [1, 4] },
    questions: ["¿Qué eventos disparan notificaciones?", "¿Se necesita historial de envíos o reintentos?"],
  },
  {
    id: "files",
    category: "Backend",
    name: "Archivos, imágenes o media",
    description: "Carga, validación, compresión, almacenamiento, descarga, permisos y limpieza básica.",
    min: 8,
    max: 42,
    scalers: { entities: [0.8, 3] },
    questions: ["¿Qué tipos de archivo se aceptan?", "¿Dónde se almacenan y cuánto pueden pesar?"],
  },
  {
    id: "search",
    category: "Producto",
    name: "Búsqueda, filtros y listados avanzados",
    description: "Filtros combinados, orden, paginación, búsquedas, estados guardados y consultas eficientes.",
    min: 8,
    max: 40,
    scalers: { entities: [0.6, 2.4], screens: [0.3, 1] },
    questions: ["¿Qué filtros son obligatorios?", "¿Hay búsquedas por texto, fechas, estados o relaciones?"],
  },
  {
    id: "analytics",
    category: "Producto",
    name: "Métricas, dashboard y reportes",
    description: "KPIs, gráficos, filtros por fecha, exportaciones simples, estados y agregaciones.",
    min: 12,
    max: 66,
    scalers: { entities: [1, 4], screens: [0.7, 2.5] },
    questions: ["¿Qué decisiones se toman con estos datos?", "¿Los reportes se calculan en tiempo real o por períodos?"],
  },
  {
    id: "realtime",
    category: "Backend",
    name: "Tiempo real / colaboración",
    description: "Sockets, estados en vivo, presencia, sincronización entre usuarios o eventos instantáneos.",
    min: 22,
    max: 110,
    scalers: { screens: [0.5, 2], automations: [1, 5] },
    flags: ["Tiempo real suele duplicar QA y casos borde."],
    questions: ["¿Qué debe actualizarse sin recargar?", "¿Cuántos usuarios concurrentes se esperan?"],
  },
  {
    id: "pwa",
    category: "Frontend",
    name: "PWA / offline / instalación",
    description: "Manifest, service worker, caché, pantalla de carga, actualización, instalación y fallback offline.",
    min: 8,
    max: 42,
    scalers: { screens: [0.2, 1] },
    questions: ["¿Qué debe funcionar sin conexión?", "¿Cómo se avisa al usuario de actualizaciones?"],
  },
  {
    id: "automation",
    category: "Integraciones",
    name: "Automatizaciones operativas",
    description: "Tareas programadas, bots, sincronización de datos, generación de documentos o flujos internos.",
    min: 12,
    max: 72,
    scalers: { automations: [3, 12], integrations: [1.5, 6] },
    questions: ["¿Qué dispara cada automatización?", "¿Qué pasa si falla?", "¿Debe quedar log o auditoría?"],
  },
  {
    id: "aiData",
    category: "Integraciones",
    name: "IA, datos o scraping",
    description: "Prompts, clasificación, extracción, procesamiento, scraping, embeddings, limpieza o análisis de datos.",
    min: 18,
    max: 120,
    scalers: { automations: [2, 10], integrations: [2, 8], entities: [0.6, 3] },
    flags: ["IA y scraping requieren validar límites, costos, calidad de datos y condiciones de uso."],
    questions: ["¿Quién valida calidad de las respuestas?", "¿Qué datos de entrenamiento o prueba existen?", "¿Qué costo por uso se acepta?"],
  },
  {
    id: "security",
    category: "Backend",
    name: "Seguridad, auditoría y datos sensibles",
    description: "Hardening básico, permisos críticos, logs, auditoría, backups, datos personales o reglas de acceso.",
    min: 10,
    max: 70,
    scalers: { roles: [1, 4], entities: [0.7, 3] },
    flags: ["Si hay datos sensibles, no presupuestar como sitio simple."],
    questions: ["¿Qué datos son sensibles?", "¿Se necesita auditoría de acciones?", "¿Qué requisitos legales o internos aplican?"],
  },
  {
    id: "seo",
    category: "Operación",
    name: "SEO técnico base",
    description: "Metadatos, estructura semántica, sitemap, rendimiento, indexación y datos sociales básicos.",
    min: 4,
    max: 16,
    scalers: { pages: [0.2, 0.8] },
    questions: ["¿Hay keywords o zonas comerciales definidas?", "¿Se necesita blog o contenido recurrente?"],
  },
  {
    id: "analyticsSetup",
    category: "Operación",
    name: "Analytics / tracking",
    description: "Eventos, conversiones, tags, medición de formularios, clicks críticos y documentación de métricas.",
    min: 4,
    max: 18,
    scalers: { pages: [0.1, 0.6], screens: [0.1, 0.5] },
    questions: ["¿Qué conversión importa?", "¿Quién tiene acceso a las cuentas de medición?"],
  },
  {
    id: "deploy",
    category: "Operación",
    name: "Deploy, hosting y dominio",
    description: "Build, hosting estático o servidor, variables de entorno, DNS, SSL, preview y publicación.",
    min: 4,
    max: 22,
    scalers: { integrations: [0.4, 1.6] },
    questions: ["¿El dominio se cobra aparte?", "¿Quién paga hosting, proveedor y servicios externos?"],
  },
  {
    id: "qa",
    category: "Operación",
    name: "Testing y QA técnico",
    description: "Pruebas funcionales, regresión básica, mobile, navegadores, datos de prueba y checklist de entrega.",
    min: 6,
    max: 34,
    scalers: { screens: [0.25, 1.2], entities: [0.25, 1] },
    questions: ["¿Qué flujos no pueden fallar en producción?", "¿Quién valida el resultado final del lado del cliente?"],
  },
  {
    id: "docs",
    category: "Operación",
    name: "Documentación y handoff",
    description: "README, guía de uso, notas de mantenimiento, checklist de deploy y criterios para futuros cambios.",
    min: 4,
    max: 18,
    scalers: { entities: [0.2, 0.8], integrations: [0.4, 1.2] },
    questions: ["¿Quién mantendrá el proyecto después?", "¿Qué debe quedar explicado para operar sin el equipo?"],
  },
  {
    id: "training",
    category: "Operación",
    name: "Capacitación / acompañamiento",
    description: "Sesión de uso, soporte inicial, preparación de material y resolución de dudas post-entrega.",
    min: 3,
    max: 18,
    scalers: { roles: [0.4, 1.5], screens: [0.1, 0.5] },
    questions: ["¿Cuántas personas usarán el sistema?", "¿Se necesita capacitación grabada o solo una llamada?"],
  },
];

const OPTIONS = {
  designLevel: [
    { id: "basic", label: "Básico / funcional", factor: 0.88 },
    { id: "clean", label: "Limpio y profesional", factor: 1 },
    { id: "custom", label: "Personalizado", factor: 1.16 },
    { id: "premium", label: "Premium / muy visual", factor: 1.34 },
  ],
  qualityLevel: [
    { id: "lean", label: "MVP liviano", factor: 0.92 },
    { id: "production", label: "Producción estándar", factor: 1 },
    { id: "scalable", label: "Escalable y mantenible", factor: 1.18 },
    { id: "critical", label: "Crítico / alta confiabilidad", factor: 1.42 },
  ],
  urgencyLevel: [
    { id: "normal", label: "Normal", factor: 1 },
    { id: "soon", label: "Rápido", factor: 1.14 },
    { id: "urgent", label: "Urgente", factor: 1.32 },
    { id: "fire", label: "Muy urgente / apagar incendio", factor: 1.55 },
  ],
  ambiguityLevel: [
    { id: "clear", label: "Claro y cerrado", factor: 0.95 },
    { id: "normal", label: "Medianamente claro", factor: 1 },
    { id: "open", label: "Abierto / cambiante", factor: 1.22 },
    { id: "unknown", label: "Muy incierto", factor: 1.48 },
  ],
  noveltyLevel: [
    { id: "known", label: "Ya lo hicimos antes", factor: 0.95 },
    { id: "similar", label: "Similar a algo hecho", factor: 1 },
    { id: "new", label: "Nuevo para el equipo", factor: 1.22 },
    { id: "research", label: "Investigación real", factor: 1.52 },
  ],
  clientLevel: [
    { id: "clear", label: "Cliente claro y disponible", factor: 0.96 },
    { id: "normal", label: "Cliente promedio", factor: 1 },
    { id: "slow", label: "Cliente lento para responder", factor: 1.1 },
    { id: "changing", label: "Cliente cambiante", factor: 1.26 },
    { id: "risky", label: "Riesgo comercial alto", factor: 1.42 },
  ],
  rightsLevel: [
    { id: "license", label: "Licencia de uso", factor: 1 },
    { id: "source", label: "Entrega de código fuente", factor: 1.22 },
    { id: "exclusive", label: "Producto exclusivo / cesión amplia", factor: 1.48 },
  ],
  supportLevel: [
    { id: "none", label: "Sin soporte post-entrega", hours: [0, 0] },
    { id: "basic", label: "Soporte 7 días", hours: [2, 6] },
    { id: "launch", label: "Acompañamiento de lanzamiento", hours: [6, 16] },
    { id: "month", label: "Primer mes incluido", hours: [12, 34] },
  ],
};

const COMPLEXITY_OPTIONS = [
  { id: "low", label: "Baja", factor: 0.75 },
  { id: "medium", label: "Media", factor: 1 },
  { id: "high", label: "Alta", factor: 1.38 },
  { id: "critical", label: "Crítica", factor: 1.85 },
];

const EXAMPLE_STATE = {
  projectName: "Sistema interno de pedidos y operaciones",
  projectType: "internalSystem",
  scope: { pages: 2, screens: 24, entities: 12, roles: 4, integrations: 4, automations: 5 },
  factors: {
    designLevel: "custom",
    qualityLevel: "scalable",
    urgencyLevel: "soon",
    ambiguityLevel: "open",
    noveltyLevel: "similar",
    clientLevel: "normal",
    rightsLevel: "license",
    supportLevel: "launch",
    revisionRounds: 3,
  },
  commercial: {
    hourlyRate: 12000,
    minimumFee: 90000,
    pmPercent: 12,
    qaPercent: 14,
    bufferPercent: 18,
    marginPercent: 38,
    externalCosts: 60000,
    roundingStep: 10000,
  },
  modules: {
    discovery: { enabled: true, complexity: "medium" },
    productSpec: { enabled: true, complexity: "high" },
    uxui: { enabled: true, complexity: "high" },
    frontendApp: { enabled: true, complexity: "high" },
    backendApi: { enabled: true, complexity: "high" },
    database: { enabled: true, complexity: "high" },
    auth: { enabled: true, complexity: "medium" },
    admin: { enabled: true, complexity: "high" },
    analytics: { enabled: true, complexity: "medium" },
    externalIntegrations: { enabled: true, complexity: "high" },
    notifications: { enabled: true, complexity: "medium" },
    security: { enabled: true, complexity: "medium" },
    deploy: { enabled: true, complexity: "medium" },
    qa: { enabled: true, complexity: "high" },
    docs: { enabled: true, complexity: "medium" },
    training: { enabled: true, complexity: "medium" },
  },
};

const elements = {
  projectName: document.getElementById("project-name"),
  projectType: document.getElementById("project-type"),
  hourlyRate: document.getElementById("hourly-rate"),
  minimumFee: document.getElementById("minimum-fee"),
  pagesCount: document.getElementById("pages-count"),
  screensCount: document.getElementById("screens-count"),
  entitiesCount: document.getElementById("entities-count"),
  rolesCount: document.getElementById("roles-count"),
  integrationsCount: document.getElementById("integrations-count"),
  automationsCount: document.getElementById("automations-count"),
  pagesCountOutput: document.getElementById("pages-count-output"),
  screensCountOutput: document.getElementById("screens-count-output"),
  entitiesCountOutput: document.getElementById("entities-count-output"),
  rolesCountOutput: document.getElementById("roles-count-output"),
  integrationsCountOutput: document.getElementById("integrations-count-output"),
  automationsCountOutput: document.getElementById("automations-count-output"),
  designLevel: document.getElementById("design-level"),
  qualityLevel: document.getElementById("quality-level"),
  urgencyLevel: document.getElementById("urgency-level"),
  ambiguityLevel: document.getElementById("ambiguity-level"),
  noveltyLevel: document.getElementById("novelty-level"),
  clientLevel: document.getElementById("client-level"),
  rightsLevel: document.getElementById("rights-level"),
  supportLevel: document.getElementById("support-level"),
  revisionRounds: document.getElementById("revision-rounds"),
  pmPercent: document.getElementById("pm-percent"),
  qaPercent: document.getElementById("qa-percent"),
  bufferPercent: document.getElementById("buffer-percent"),
  marginPercent: document.getElementById("margin-percent"),
  externalCosts: document.getElementById("external-costs"),
  roundingStep: document.getElementById("rounding-step"),
  modulesList: document.getElementById("modules-list"),
  result: document.getElementById("result"),
  loadExample: document.getElementById("load-example"),
  resetTool: document.getElementById("reset-tool"),
  toggleAllModules: document.getElementById("toggle-all-modules"),
  copySummary: document.getElementById("copy-summary"),
  downloadJson: document.getElementById("download-json"),
};

let activeFilter = "all";
let lastSummaryText = "";
let modulesCache = createDefaultModules();

function clampNumber(value, min, max) {
  const number = Number(value);
  if (Number.isNaN(number)) return min;
  return Math.min(Math.max(number, min), max);
}

function round1(value) {
  return Math.round((value + Number.EPSILON) * 10) / 10;
}

function roundMoney(value, step) {
  const safeStep = Math.max(1, Number(step) || 1);
  return Math.round(value / safeStep) * safeStep;
}

function formatMoney(value) {
  const number = Number(value) || 0;
  return `$${new Intl.NumberFormat("es-AR", { maximumFractionDigits: 0 }).format(number)}`;
}

function formatHours(value) {
  return `${new Intl.NumberFormat("es-AR", { maximumFractionDigits: 1 }).format(round1(value))} h`;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function getOption(group, id) {
  return OPTIONS[group].find((item) => item.id === id) || OPTIONS[group][0];
}

function getComplexity(id) {
  return COMPLEXITY_OPTIONS.find((item) => item.id === id) || COMPLEXITY_OPTIONS[1];
}

function createDefaultModules(enabledIds = []) {
  return MODULES.reduce((state, module) => {
    state[module.id] = {
      enabled: enabledIds.includes(module.id),
      complexity: "medium",
    };
    return state;
  }, {});
}

function getDefaultState() {
  const preset = PRESETS.find((item) => item.id === "catalogWhatsapp") || PRESETS[0];
  return {
    projectName: "Nuevo proyecto",
    projectType: preset.id,
    scope: { ...preset.scope },
    factors: {
      designLevel: "clean",
      qualityLevel: "production",
      urgencyLevel: "normal",
      ambiguityLevel: "normal",
      noveltyLevel: "similar",
      clientLevel: "normal",
      rightsLevel: "license",
      supportLevel: "basic",
      revisionRounds: 2,
    },
    commercial: {
      hourlyRate: 12000,
      minimumFee: 90000,
      pmPercent: 10,
      qaPercent: 12,
      bufferPercent: 15,
      marginPercent: 35,
      externalCosts: 0,
      roundingStep: 5000,
    },
    modules: createDefaultModules(preset.modules),
  };
}

function populateSelect(select, options, currentValue) {
  select.innerHTML = options
    .map((option) => `<option value="${escapeHtml(option.id)}">${escapeHtml(option.label || option.name)}</option>`)
    .join("");
  select.value = currentValue || options[0]?.id;
}

function populateStaticControls() {
  elements.projectType.innerHTML = PRESETS.map(
    (preset) => `<option value="${escapeHtml(preset.id)}">${escapeHtml(preset.name)}</option>`,
  ).join("");

  populateSelect(elements.designLevel, OPTIONS.designLevel, "clean");
  populateSelect(elements.qualityLevel, OPTIONS.qualityLevel, "production");
  populateSelect(elements.urgencyLevel, OPTIONS.urgencyLevel, "normal");
  populateSelect(elements.ambiguityLevel, OPTIONS.ambiguityLevel, "normal");
  populateSelect(elements.noveltyLevel, OPTIONS.noveltyLevel, "similar");
  populateSelect(elements.clientLevel, OPTIONS.clientLevel, "normal");
  populateSelect(elements.rightsLevel, OPTIONS.rightsLevel, "license");
  populateSelect(elements.supportLevel, OPTIONS.supportLevel, "basic");
}

function renderModules(modulesState) {
  const modulesToRender = MODULES.filter((module) => activeFilter === "all" || module.category === activeFilter);

  elements.modulesList.innerHTML = modulesToRender
    .map((module) => {
      const moduleState = modulesState[module.id] || { enabled: false, complexity: "medium" };
      const checked = moduleState.enabled ? "checked" : "";
      const complexityOptions = COMPLEXITY_OPTIONS.map(
        (option) => `<option value="${option.id}" ${moduleState.complexity === option.id ? "selected" : ""}>${option.label}</option>`,
      ).join("");

      return `
        <article class="module-card ${moduleState.enabled ? "enabled" : ""}" data-module-id="${module.id}" data-category="${escapeHtml(module.category)}">
          <label class="module-check">
            <input class="module-enabled" type="checkbox" ${checked} />
            <span>
              <strong>${escapeHtml(module.name)}</strong>
              <small>${escapeHtml(module.category)}</small>
            </span>
          </label>
          <p>${escapeHtml(module.description)}</p>
          <label class="module-complexity-label">
            Complejidad del módulo
            <select class="module-complexity">${complexityOptions}</select>
          </label>
        </article>
      `;
    })
    .join("");
}

function getScope() {
  return {
    pages: clampNumber(elements.pagesCount.value, 0, 40),
    screens: clampNumber(elements.screensCount.value, 0, 80),
    entities: clampNumber(elements.entitiesCount.value, 0, 40),
    roles: clampNumber(elements.rolesCount.value, 0, 12),
    integrations: clampNumber(elements.integrationsCount.value, 0, 15),
    automations: clampNumber(elements.automationsCount.value, 0, 25),
  };
}

function getModulesState() {
  const currentState = structuredCloneSafe(modulesCache);
  document.querySelectorAll(".module-card").forEach((card) => {
    const id = card.dataset.moduleId;
    currentState[id] = {
      enabled: card.querySelector(".module-enabled").checked,
      complexity: card.querySelector(".module-complexity").value,
    };
  });
  modulesCache = structuredCloneSafe(currentState);
  return currentState;
}

function structuredCloneSafe(value) {
  return JSON.parse(JSON.stringify(value));
}

function loadStateFromControls(options = {}) {
  const savedOrDefaultModules = options.baseModules || createDefaultModules();

  if (!options.skipModules) {
    document.querySelectorAll(".module-card").forEach((card) => {
      const id = card.dataset.moduleId;
      savedOrDefaultModules[id] = {
        enabled: card.querySelector(".module-enabled").checked,
        complexity: card.querySelector(".module-complexity").value,
      };
    });
  }

  return {
    projectName: elements.projectName.value.trim() || "Proyecto sin nombre",
    projectType: elements.projectType.value,
    scope: getScope(),
    factors: {
      designLevel: elements.designLevel.value,
      qualityLevel: elements.qualityLevel.value,
      urgencyLevel: elements.urgencyLevel.value,
      ambiguityLevel: elements.ambiguityLevel.value,
      noveltyLevel: elements.noveltyLevel.value,
      clientLevel: elements.clientLevel.value,
      rightsLevel: elements.rightsLevel.value,
      supportLevel: elements.supportLevel.value,
      revisionRounds: clampNumber(elements.revisionRounds.value, 0, 12),
    },
    commercial: {
      hourlyRate: clampNumber(elements.hourlyRate.value, 0, 9999999),
      minimumFee: clampNumber(elements.minimumFee.value, 0, 99999999),
      pmPercent: clampNumber(elements.pmPercent.value, 0, 80),
      qaPercent: clampNumber(elements.qaPercent.value, 0, 80),
      bufferPercent: clampNumber(elements.bufferPercent.value, 0, 120),
      marginPercent: clampNumber(elements.marginPercent.value, 0, 200),
      externalCosts: clampNumber(elements.externalCosts.value, 0, 99999999),
      roundingStep: clampNumber(elements.roundingStep.value, 1, 1000000),
    },
    modules: savedOrDefaultModules,
  };
}

function getCurrentState() {
  const modules = getModulesState();
  return loadStateFromControls({ baseModules: modules, skipModules: true });
}

function applyState(state) {
  const safeState = normalizeState(state || getDefaultState());

  elements.projectName.value = safeState.projectName;
  elements.projectType.value = safeState.projectType;
  elements.hourlyRate.value = safeState.commercial.hourlyRate;
  elements.minimumFee.value = safeState.commercial.minimumFee;
  elements.pagesCount.value = safeState.scope.pages;
  elements.screensCount.value = safeState.scope.screens;
  elements.entitiesCount.value = safeState.scope.entities;
  elements.rolesCount.value = safeState.scope.roles;
  elements.integrationsCount.value = safeState.scope.integrations;
  elements.automationsCount.value = safeState.scope.automations;
  elements.designLevel.value = safeState.factors.designLevel;
  elements.qualityLevel.value = safeState.factors.qualityLevel;
  elements.urgencyLevel.value = safeState.factors.urgencyLevel;
  elements.ambiguityLevel.value = safeState.factors.ambiguityLevel;
  elements.noveltyLevel.value = safeState.factors.noveltyLevel;
  elements.clientLevel.value = safeState.factors.clientLevel;
  elements.rightsLevel.value = safeState.factors.rightsLevel;
  elements.supportLevel.value = safeState.factors.supportLevel;
  elements.revisionRounds.value = safeState.factors.revisionRounds;
  elements.pmPercent.value = safeState.commercial.pmPercent;
  elements.qaPercent.value = safeState.commercial.qaPercent;
  elements.bufferPercent.value = safeState.commercial.bufferPercent;
  elements.marginPercent.value = safeState.commercial.marginPercent;
  elements.externalCosts.value = safeState.commercial.externalCosts;
  elements.roundingStep.value = safeState.commercial.roundingStep;

  modulesCache = structuredCloneSafe(safeState.modules);
  updateRangeOutputs();
  renderModules(safeState.modules);
  updateAll();
}

function normalizeState(state) {
  const fallback = getDefaultState();
  const preset = PRESETS.some((item) => item.id === state.projectType) ? state.projectType : fallback.projectType;
  const modules = createDefaultModules();
  Object.entries(state.modules || {}).forEach(([id, moduleState]) => {
    if (modules[id]) {
      modules[id] = {
        enabled: Boolean(moduleState.enabled),
        complexity: COMPLEXITY_OPTIONS.some((item) => item.id === moduleState.complexity) ? moduleState.complexity : "medium",
      };
    }
  });

  return {
    ...fallback,
    ...state,
    projectType: preset,
    scope: { ...fallback.scope, ...(state.scope || {}) },
    factors: { ...fallback.factors, ...(state.factors || {}) },
    commercial: { ...fallback.commercial, ...(state.commercial || {}) },
    modules,
  };
}

function saveState(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // La herramienta funciona sin persistencia si el navegador bloquea localStorage.
  }
}

function loadSavedState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function clearSavedState() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // No-op.
  }
}

function updateRangeOutputs() {
  const scope = getScope();
  elements.pagesCountOutput.value = scope.pages;
  elements.screensCountOutput.value = scope.screens;
  elements.entitiesCountOutput.value = scope.entities;
  elements.rolesCountOutput.value = scope.roles;
  elements.integrationsCountOutput.value = scope.integrations;
  elements.automationsCountOutput.value = scope.automations;
}

function calculateModuleHours(module, moduleState, scope) {
  const complexity = getComplexity(moduleState.complexity);
  let min = module.min;
  let max = module.max;

  Object.entries(module.scalers || {}).forEach(([key, values]) => {
    const count = Number(scope[key]) || 0;
    min += count * values[0];
    max += count * values[1];
  });

  return {
    min: min * complexity.factor,
    max: max * complexity.factor,
    complexity,
  };
}

function calculateGlobalFactor(state) {
  const factorKeys = ["designLevel", "qualityLevel", "urgencyLevel", "ambiguityLevel", "noveltyLevel", "clientLevel"];
  const base = factorKeys.reduce((total, key) => total * getOption(key, state.factors[key]).factor, 1);
  const revisionOverflow = Math.max(0, state.factors.revisionRounds - 2) * 0.035;
  return base + revisionOverflow;
}

function calculateRiskScore(state, selectedModules, globalFactor) {
  let score = 18;
  const factorPenalty = Math.max(0, globalFactor - 1) * 42;
  score += factorPenalty;

  if (state.scope.screens > 20) score += 8;
  if (state.scope.entities > 10) score += 8;
  if (state.scope.integrations > 3) score += 10;
  if (state.scope.automations > 5) score += 8;
  if (["urgent", "fire"].includes(state.factors.urgencyLevel)) score += 10;
  if (["open", "unknown"].includes(state.factors.ambiguityLevel)) score += 12;
  if (["new", "research"].includes(state.factors.noveltyLevel)) score += 12;
  if (["changing", "risky"].includes(state.factors.clientLevel)) score += 10;

  const riskyModules = ["payments", "auth", "security", "realtime", "aiData", "externalIntegrations", "research"];
  const enabledRiskyModules = selectedModules.filter((item) => riskyModules.includes(item.module.id));
  score += enabledRiskyModules.length * 5;

  const criticalModules = selectedModules.filter((item) => item.moduleState.complexity === "critical").length;
  score += criticalModules * 6;

  return clampNumber(Math.round(score), 0, 100);
}

function getRiskLabel(score) {
  if (score < 30) return { label: "Bajo", className: "success" };
  if (score < 55) return { label: "Medio", className: "info" };
  if (score < 78) return { label: "Alto", className: "warn" };
  return { label: "Crítico", className: "danger" };
}

function calculateEstimate(state) {
  const selectedModules = MODULES.map((module) => ({
    module,
    moduleState: state.modules[module.id] || { enabled: false, complexity: "medium" },
  })).filter((item) => item.moduleState.enabled);

  const moduleRows = selectedModules.map((item) => {
    const hours = calculateModuleHours(item.module, item.moduleState, state.scope);
    return { ...item, ...hours };
  });

  const directMin = moduleRows.reduce((total, row) => total + row.min, 0);
  const directMax = moduleRows.reduce((total, row) => total + row.max, 0);
  const support = getOption("supportLevel", state.factors.supportLevel);
  const globalFactor = calculateGlobalFactor(state);
  const minGlobalFactor = 1 + (globalFactor - 1) * 0.62;
  const factoredMin = directMin * minGlobalFactor + support.hours[0];
  const factoredMax = directMax * globalFactor + support.hours[1];
  const overheadRate = (state.commercial.pmPercent + state.commercial.qaPercent + state.commercial.bufferPercent) / 100;
  const hoursMin = factoredMin * (1 + overheadRate);
  const hoursMax = factoredMax * (1 + overheadRate);
  const hoursRecommended = hoursMin + (hoursMax - hoursMin) * 0.58;
  const rights = getOption("rightsLevel", state.factors.rightsLevel);
  const grossFactor = (1 + state.commercial.marginPercent / 100) * rights.factor;
  const rounding = state.commercial.roundingStep;

  const internalCostMin = hoursMin * state.commercial.hourlyRate;
  const internalCostMax = hoursMax * state.commercial.hourlyRate;
  const internalCostRecommended = hoursRecommended * state.commercial.hourlyRate;

  const projectPriceMin = Math.max(state.commercial.minimumFee, internalCostMin * grossFactor);
  const projectPriceMax = Math.max(state.commercial.minimumFee, internalCostMax * grossFactor);
  const projectPriceRecommended = Math.max(state.commercial.minimumFee, internalCostRecommended * grossFactor);

  const priceMin = roundMoney(projectPriceMin, rounding);
  const priceMax = Math.max(priceMin, roundMoney(projectPriceMax, rounding));
  const priceRecommended = clampNumber(roundMoney(projectPriceRecommended, rounding), priceMin, priceMax);
  const clientTotalRecommended = priceRecommended + state.commercial.externalCosts;

  const riskScore = calculateRiskScore(state, selectedModules, globalFactor);
  const risk = getRiskLabel(riskScore);

  return {
    selectedModules,
    moduleRows,
    directMin,
    directMax,
    globalFactor,
    minGlobalFactor,
    overheadRate,
    hoursMin,
    hoursMax,
    hoursRecommended,
    internalCostMin,
    internalCostMax,
    internalCostRecommended,
    priceMin,
    priceMax,
    priceRecommended,
    clientTotalRecommended,
    riskScore,
    risk,
    rights,
    support,
  };
}

function getModuleBreakdownRows(estimate) {
  return [...estimate.moduleRows]
    .sort((a, b) => b.max - a.max)
    .slice(0, 8);
}

function buildAlerts(state, estimate) {
  const alerts = [];

  if (estimate.selectedModules.length === 0) {
    alerts.push("No hay módulos activos. La estimación no tiene base real.");
  }

  if (["open", "unknown"].includes(state.factors.ambiguityLevel)) {
    alerts.push("El alcance está abierto. Conviene vender una etapa de relevamiento o discovery antes de cerrar precio final.");
  }

  if (["new", "research"].includes(state.factors.noveltyLevel)) {
    alerts.push("El equipo no domina completamente el terreno. Agregá validación técnica y no prometas fechas agresivas.");
  }

  if (state.scope.integrations >= 3 || isModuleEnabled(state, "externalIntegrations")) {
    alerts.push("Hay integraciones externas. No cerrar sin documentación, credenciales, ambiente de prueba y límites de uso.");
  }

  if (isModuleEnabled(state, "payments")) {
    alerts.push("Pagos online implican callbacks, pruebas reales y estados fallidos. No cotizar como simple formulario.");
  }

  if (isModuleEnabled(state, "auth") || isModuleEnabled(state, "security")) {
    alerts.push("Login, roles o datos sensibles exigen más QA, permisos claros y aclaración de responsabilidad post-entrega.");
  }

  if (state.factors.rightsLevel !== "license") {
    alerts.push("La entrega de código o cesión amplia debe cobrarse más y aclararse por contrato.");
  }

  if (state.commercial.externalCosts > 0) {
    alerts.push("Separar costos externos del precio de desarrollo: hosting, dominio, APIs, cuentas, plantillas o servicios pagos.");
  }

  return alerts.slice(0, 8);
}

function buildQuestions(state, estimate) {
  const questions = new Set();
  estimate.moduleRows.forEach((row) => (row.module.questions || []).forEach((question) => questions.add(question)));

  if (state.scope.pages + state.scope.screens === 0) questions.add("¿Qué interfaz real va a usar el cliente o el operador?");
  if (state.factors.supportLevel === "none") questions.add("¿Qué soporte o cambios quedan fuera después de publicar?" );
  if (state.factors.ambiguityLevel !== "clear") questions.add("¿Qué decisión falta para convertir esto en alcance cerrado?" );

  return [...questions].slice(0, 10);
}

function buildExclusions(state, estimate) {
  const exclusions = [
    "Cambios de alcance no descriptos en la estimación.",
    "Dominio, hosting, cuentas externas, APIs pagas y servicios de terceros, salvo que se los agregue como costo externo.",
    "Redacción, carga masiva de contenido o producción audiovisual no contemplada.",
    "Mantenimiento evolutivo posterior al período de soporte incluido.",
  ];

  if (state.factors.rightsLevel === "license") {
    exclusions.push("Entrega del código fuente o cesión del producto. El presupuesto contempla licencia de uso.");
  }

  if (!isModuleEnabled(state, "backendApi")) {
    exclusions.push("Backend, base de datos, login, panel administrativo e historial de datos si no están activados como módulos.");
  }

  if (!isModuleEnabled(state, "payments")) {
    exclusions.push("Pagos online reales, conciliación automática o integración con pasarela de pago.");
  }

  if (!isModuleEnabled(state, "security")) {
    exclusions.push("Auditoría de seguridad avanzada, cumplimiento legal específico o tratamiento especial de datos sensibles.");
  }

  return exclusions;
}

function isModuleEnabled(state, moduleId) {
  return Boolean(state.modules[moduleId]?.enabled);
}

function buildPromptForAi(state, estimate) {
  const enabledModules = estimate.moduleRows.map((row) => `${row.module.name} (${row.complexity.label})`).join(", ");
  return [
    "Actuá como consultor técnico-comercial senior.",
    `Necesito revisar un presupuesto para: ${state.projectName}.`,
    `Tipo base: ${PRESETS.find((preset) => preset.id === state.projectType)?.name || state.projectType}.`,
    `Módulos incluidos: ${enabledModules || "ninguno"}.`,
    `Tamaño: ${state.scope.pages} páginas, ${state.scope.screens} pantallas, ${state.scope.entities} entidades, ${state.scope.roles} roles, ${state.scope.integrations} integraciones, ${state.scope.automations} automatizaciones.`,
    `Riesgo estimado: ${estimate.risk.label} (${estimate.riskScore}/100).`,
    `Horas estimadas: ${formatHours(estimate.hoursMin)} a ${formatHours(estimate.hoursMax)}.`,
    `Rango sugerido: ${formatMoney(estimate.priceMin)} a ${formatMoney(estimate.priceMax)}. Recomendado: ${formatMoney(estimate.priceRecommended)}.`,
    "Decime si el rango es razonable, qué riesgos faltan, qué exclusiones debería aclarar y cómo lo presentaría al cliente.",
  ].join("\n");
}

function buildSummaryText(state, estimate) {
  const preset = PRESETS.find((item) => item.id === state.projectType);
  const alerts = buildAlerts(state, estimate);
  const questions = buildQuestions(state, estimate);
  const exclusions = buildExclusions(state, estimate);

  return [
    `Estimación interna — ${state.projectName}`,
    `Tipo: ${preset?.name || state.projectType}`,
    `Riesgo: ${estimate.risk.label} (${estimate.riskScore}/100)`,
    `Horas: ${formatHours(estimate.hoursMin)} a ${formatHours(estimate.hoursMax)} · Recomendado: ${formatHours(estimate.hoursRecommended)}`,
    `Rango: ${formatMoney(estimate.priceMin)} a ${formatMoney(estimate.priceMax)}`,
    `Precio recomendado: ${formatMoney(estimate.priceRecommended)}`,
    state.commercial.externalCosts > 0 ? `Total con costos externos estimados: ${formatMoney(estimate.clientTotalRecommended)}` : "",
    "",
    "Módulos incluidos:",
    ...estimate.moduleRows.map((row) => `- ${row.module.name}: ${formatHours(row.min)} a ${formatHours(row.max)} (${row.complexity.label})`),
    "",
    "Alertas:",
    ...(alerts.length ? alerts.map((item) => `- ${item}`) : ["- Sin alertas críticas detectadas."]),
    "",
    "Preguntas antes de cerrar:",
    ...questions.map((item) => `- ${item}`),
    "",
    "Exclusiones sugeridas:",
    ...exclusions.map((item) => `- ${item}`),
  ].filter(Boolean).join("\n");
}

function renderResult(state, estimate) {
  const preset = PRESETS.find((item) => item.id === state.projectType);
  const alerts = buildAlerts(state, estimate);
  const questions = buildQuestions(state, estimate);
  const exclusions = buildExclusions(state, estimate);
  const breakdownRows = getModuleBreakdownRows(estimate);
  const promptForAi = buildPromptForAi(state, estimate);
  lastSummaryText = buildSummaryText(state, estimate);

  elements.result.innerHTML = `
    <div class="result-header">
      <p class="eyebrow small">Resultado vivo</p>
      <h2>${escapeHtml(state.projectName)}</h2>
      <p>${escapeHtml(preset?.description || "Estimación personalizada.")}</p>
    </div>

    <div class="main-price">
      <span>Precio recomendado</span>
      <strong>${formatMoney(estimate.priceRecommended)}</strong>
      <small>Rango sugerido: ${formatMoney(estimate.priceMin)} – ${formatMoney(estimate.priceMax)}</small>
      ${state.commercial.externalCosts > 0 ? `<em>Total con costos externos: ${formatMoney(estimate.clientTotalRecommended)}</em>` : ""}
    </div>

    <div class="kpi-grid">
      <div class="kpi">
        <span>Horas</span>
        <strong>${formatHours(estimate.hoursRecommended)}</strong>
        <small>${formatHours(estimate.hoursMin)} – ${formatHours(estimate.hoursMax)}</small>
      </div>
      <div class="kpi">
        <span>Riesgo</span>
        <strong class="status ${estimate.risk.className}">${estimate.risk.label}</strong>
        <small>${estimate.riskScore}/100</small>
      </div>
      <div class="kpi">
        <span>Módulos</span>
        <strong>${estimate.selectedModules.length}</strong>
        <small>activos</small>
      </div>
      <div class="kpi">
        <span>Factor global</span>
        <strong>x${round1(estimate.globalFactor)}</strong>
        <small>riesgo + criterio</small>
      </div>
    </div>

    <details class="result-details" open>
      <summary>Desglose principal</summary>
      <div class="breakdown-list">
        ${
          breakdownRows.length
            ? breakdownRows
                .map(
                  (row) => `
                    <div class="breakdown-row">
                      <span>${escapeHtml(row.module.name)}</span>
                      <strong>${formatHours(row.min)} – ${formatHours(row.max)}</strong>
                    </div>
                  `,
                )
                .join("")
            : `<p class="muted-text">Activá módulos para obtener una estimación.</p>`
        }
      </div>
    </details>

    <details class="result-details" open>
      <summary>Alertas</summary>
      <ul class="compact-list">
        ${
          alerts.length
            ? alerts.map((item) => `<li>${escapeHtml(item)}</li>`).join("")
            : `<li>No hay alertas críticas detectadas.</li>`
        }
      </ul>
    </details>

    <details class="result-details">
      <summary>Preguntas antes de cerrar</summary>
      <ul class="compact-list">
        ${questions.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
      </ul>
    </details>

    <details class="result-details">
      <summary>Exclusiones sugeridas</summary>
      <ul class="compact-list">
        ${exclusions.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
      </ul>
    </details>

    <details class="result-details">
      <summary>Prompt para revisar con IA</summary>
      <textarea class="prompt-box" readonly>${escapeHtml(promptForAi)}</textarea>
    </details>
  `;
}

function updateAll() {
  updateRangeOutputs();
  const state = getCurrentState();
  const estimate = calculateEstimate(state);
  saveState(state);
  renderResult(state, estimate);
  updateToggleAllButton(state);
}

function updateToggleAllButton(state) {
  const enabledCount = Object.values(state.modules).filter((module) => module.enabled).length;
  elements.toggleAllModules.textContent = enabledCount === MODULES.length ? "Desactivar todo" : "Activar todo";
}

function applyPreset(presetId) {
  const currentState = getCurrentState();
  const preset = PRESETS.find((item) => item.id === presetId);
  if (!preset) return;

  const nextState = {
    ...currentState,
    projectType: preset.id,
    scope: { ...currentState.scope, ...preset.scope },
    modules: createDefaultModules(preset.modules),
  };

  if (preset.id === "unknown") {
    nextState.factors.ambiguityLevel = "unknown";
    nextState.factors.noveltyLevel = "new";
    nextState.commercial.bufferPercent = Math.max(nextState.commercial.bufferPercent, 25);
  }

  applyState(nextState);
}

async function copySummary() {
  try {
    await navigator.clipboard.writeText(lastSummaryText);
    elements.copySummary.textContent = "Copiado";
    setTimeout(() => {
      elements.copySummary.textContent = "Copiar resumen";
    }, 1400);
  } catch {
    elements.copySummary.textContent = "No se pudo copiar";
    setTimeout(() => {
      elements.copySummary.textContent = "Copiar resumen";
    }, 1800);
  }
}

function downloadJson() {
  const state = getCurrentState();
  const estimate = calculateEstimate(state);
  const payload = {
    exportedAt: new Date().toISOString(),
    state,
    estimate: {
      hoursMin: round1(estimate.hoursMin),
      hoursMax: round1(estimate.hoursMax),
      hoursRecommended: round1(estimate.hoursRecommended),
      priceMin: estimate.priceMin,
      priceMax: estimate.priceMax,
      priceRecommended: estimate.priceRecommended,
      clientTotalRecommended: estimate.clientTotalRecommended,
      riskScore: estimate.riskScore,
      riskLabel: estimate.risk.label,
    },
    summary: lastSummaryText,
  };

  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `estimacion-${slugify(state.projectName)}.json`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function slugify(value) {
  return String(value)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "") || "proyecto";
}

function bindEvents() {
  document.addEventListener("input", (event) => {
    const target = event.target;
    if (target.matches("input, select, textarea")) updateAll();
  });

  document.addEventListener("change", (event) => {
    if (event.target.classList.contains("module-enabled")) {
      event.target.closest(".module-card")?.classList.toggle("enabled", event.target.checked);
    }
    updateAll();
  });

  elements.projectType.addEventListener("change", () => {
    applyPreset(elements.projectType.value);
  });

  elements.loadExample.addEventListener("click", () => applyState(EXAMPLE_STATE));

  elements.resetTool.addEventListener("click", () => {
    clearSavedState();
    activeFilter = "all";
    document.querySelectorAll(".chip").forEach((button) => button.classList.toggle("active", button.dataset.filter === "all"));
    applyState(getDefaultState());
  });

  elements.toggleAllModules.addEventListener("click", () => {
    const state = getCurrentState();
    const enabledCount = Object.values(state.modules).filter((module) => module.enabled).length;
    const shouldEnable = enabledCount !== MODULES.length;
    MODULES.forEach((module) => {
      state.modules[module.id] = {
        ...(state.modules[module.id] || { complexity: "medium" }),
        enabled: shouldEnable,
      };
    });
    applyState(state);
  });

  document.querySelectorAll(".chip").forEach((button) => {
    button.addEventListener("click", () => {
      activeFilter = button.dataset.filter;
      document.querySelectorAll(".chip").forEach((chip) => chip.classList.toggle("active", chip === button));
      const state = getCurrentState();
      renderModules(state.modules);
      updateAll();
    });
  });

  elements.copySummary.addEventListener("click", copySummary);
  elements.downloadJson.addEventListener("click", downloadJson);
}

function init() {
  populateStaticControls();
  bindEvents();
  applyState(loadSavedState() || getDefaultState());
}

init();
