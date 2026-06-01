---
layout: default
title: Workflow
description: Flujo de trabajo interno de Dayle Code para ramas, commits, Pull Requests y merges.
---

# Workflow

Este documento define la forma de trabajo base para los repositorios de **Dayle Code**.

Aplica a todos los proyectos salvo que un repositorio tenga una excepción documentada en su propio `README.md` o en una guía específica.

## Principios

- `main` representa la versión estable u oficial del proyecto.
- Las ramas de trabajo son temporales.
- Todo cambio normal debe entrar por Pull Request.
- Los commits deben ser claros, simples y en español.
- Se prefiere avanzar con cambios chicos y revisables.
- La documentación debe actualizarse cuando el cambio modifique comportamiento, flujo o reglas.

## Rama principal

La rama principal es:

```txt
main
```

No se trabaja directo sobre `main`, salvo casos mínimos:

- hotfix urgente y acotado;
- corrección menor de documentación;
- cambio sin riesgo autorizado por el equipo.

Incluso en esos casos, la recomendación es dejar registro claro en el commit.

## Ramas de trabajo

Formato recomendado:

```txt
type/nombre-corto
```

Tipos habituales:

```txt
feature/nombre-corto
fix/nombre-corto
docs/nombre-corto
refactor/nombre-corto
style/nombre-corto
chore/nombre-corto
pages/nombre-corto
```

Ejemplos:

```txt
feature/calculadora-participacion
fix/rutas-github-pages
docs/actualizar-workflow
refactor/separar-logica-ui
style/ajustar-dashboard
chore/limpiar-estructura
pages/agregar-indice-tools
```

## Commits

Usamos commits en español con este formato:

```txt
type(scope): descripción en español
```

El `scope` ayuda a ubicar el área afectada. Puede omitirse si el cambio es muy general, pero conviene usarlo.

Ejemplos:

```txt
feat(calculadora): agregar exportación en markdown
fix(pages): corregir rutas relativas
docs(workflow): aclarar estrategia de ramas
refactor(ui): simplificar dashboard interno
style(docs): ajustar espaciado de cards
chore(repo): ordenar archivos iniciales
```

Tipos recomendados:

| Tipo | Uso |
|---|---|
| `feat` | Nueva funcionalidad |
| `fix` | Corrección de error |
| `docs` | Documentación |
| `refactor` | Reestructura sin cambiar comportamiento |
| `style` | Cambios visuales o formato |
| `chore` | Mantenimiento, configuración o limpieza |
| `test` | Pruebas o casos de validación |
| `perf` | Mejoras de rendimiento |

## Pull Requests

Todo PR debería explicar:

- qué cambia;
- por qué cambia;
- cómo se puede revisar o probar;
- si hay riesgos, dudas o pendientes.

El template de PR es orientativo, no burocrático. No todas las secciones aplican siempre, pero el PR debe quedar entendible para otra persona.

## Aprobaciones

Regla base:

- cambios funcionales, técnicos o con riesgo: requieren revisión de otra persona;
- cambios mínimos de documentación o hotfix menor: pueden mergearse con validación propia y nota clara en el PR;
- si hay duda, se pide revisión.

La revisión no debe ser decorativa. Quien revisa debe mirar que el cambio tenga sentido, que no rompa flujo existente y que sea mantenible.

## Estrategia de merge

Se usa preferentemente:

```txt
Squash merge
```

Motivos:

- mantiene `main` más limpio;
- agrupa commits intermedios;
- deja un historial más legible;
- funciona bien para equipos chicos.

El mensaje final del squash debe respetar el criterio de commits:

```txt
type(scope): descripción en español
```

## Checklist manual antes de mergear

Antes de mergear, revisar según corresponda:

- la app o página sigue cargando;
- los links internos funcionan;
- no se subieron secretos ni datos sensibles;
- el cambio se entiende desde el PR;
- la documentación se actualizó si corresponde;
- en cambios visuales, se revisó al menos una resolución de escritorio y una móvil;
- en cambios lógicos, se probaron casos normales y casos borde básicos.

## Hotfixes

Un hotfix es un cambio urgente para corregir algo roto o riesgoso.

Debe ser:

- pequeño;
- directo;
- fácil de revertir;
- documentado en el commit o PR.

Después de resolver la urgencia, si el hotfix deja deuda técnica, se debe crear un issue o tarea posterior.

## Excepciones

Un proyecto puede tener reglas propias si lo necesita. Esa excepción debe quedar escrita en el repositorio correspondiente.

Ejemplo:

```txt
Este proyecto usa rebase merge por integración con CI.
```

Sin excepción documentada, aplica este workflow.
