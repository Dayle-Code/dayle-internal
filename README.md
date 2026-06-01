# Dayle Internal

Repositorio operativo interno de **Dayle Code**.

Este espacio centraliza documentación de trabajo, criterios técnicos, flujo de colaboración, templates de GitHub y herramientas internas del equipo.

> Estado actual: este repositorio puede estar público temporalmente. Más adelante se prevé pasarlo a privado. Mientras sea público, no debe incluir credenciales, datos sensibles, acuerdos privados, información de clientes, montos internos específicos ni información personal del equipo.

## Contenido

```txt
dayle-internal/
├─ docs/                         # Documentación operativa
├─ tools/                        # Herramientas internas
├─ .github/                      # Templates de PR e issues
├─ _layouts/                     # Layouts para GitHub Pages/Jekyll
├─ assets/                       # Estilos compartidos del sitio
├─ index.html                    # Dashboard interno
└─ README.md                     # Entrada del repositorio
```

## Documentación

- [Workflow](./docs/WORKFLOW.md): forma de trabajo con ramas, commits, PRs y merges.
- [Estándares de código](./docs/CODE_STANDARDS.md): criterios mínimos de calidad técnica.
- [Política de participación](./docs/PROJECT_PARTICIPATION_POLICY.md): reglas internas de participación por proyecto.

## Herramientas

- [Índice de herramientas](./tools/)
- Calculadora de participación por proyecto: pendiente de pegar en `tools/participation-calculator/`.

## Reglas básicas del repositorio

- No subir secretos, tokens, claves, archivos `.env` ni credenciales.
- No publicar datos sensibles de clientes o integrantes.
- Mantener la documentación simple, útil y actualizada.
- Preferir cambios por rama y Pull Request.
- Usar commits en español con formato claro.

## GitHub Pages

El sitio interno está pensado para funcionar con GitHub Pages y Jekyll.

Los documentos Markdown dentro de `docs/` usan front matter para renderizarse como páginas HTML con layout común. Los links públicos deben apuntar a `.html`, por ejemplo:

```txt
/docs/WORKFLOW.html
/docs/CODE_STANDARDS.html
/docs/PROJECT_PARTICIPATION_POLICY.html
```

