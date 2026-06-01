---
layout: default
title: Estándares de código
description: Criterios técnicos generales de Dayle Code para calidad, mantenibilidad y elección de tecnología.
---

# Estándares de código

Este documento define criterios generales de calidad técnica para proyectos de **Dayle Code**.

No está pensado para encerrar al equipo en una sola tecnología o arquitectura. Sirve como base común para escribir código claro, mantenible y razonable para cada proyecto.

## Principios generales

- Priorizar claridad antes que ingenio.
- Escribir código que otra persona pueda entender y modificar.
- Evitar complejidad prematura.
- Separar responsabilidades cuando el proyecto lo justifique.
- Elegir tecnología por necesidad real, no por moda.
- No subir secretos, claves, tokens ni datos sensibles.
- Validar manualmente los cambios antes de pedir merge.

## Elección de tecnología

Dayle Code puede trabajar con distintos enfoques según el problema.

Tecnologías frecuentes o preferidas según contexto:

- Docker;
- Django;
- PostgreSQL;
- pgAdmin 4;
- Bootstrap;
- Tailwind CSS;
- React;
- Astro + Tailwind para sitios livianos;
- JavaScript/TypeScript cuando el proyecto lo justifique.

La elección del stack debe considerar:

- necesidades del cliente o proyecto;
- mantenibilidad;
- complejidad real;
- curva de aprendizaje;
- tiempo disponible;
- costo de operación;
- experiencia del equipo;
- beneficio concreto frente a alternativas más simples.

Aprender una tecnología nueva es válido si la mejora justifica la fricción de aprendizaje.

## Arquitectura

No existe una única arquitectura obligatoria.

El criterio base es:

- proyectos simples: arquitectura simple;
- proyectos con dominio fuerte: separar reglas de negocio;
- proyectos con datos críticos: cuidar modelo, integridad y migraciones;
- proyectos frontend: separar datos, lógica y UI cuando ayude a mantener;
- proyectos backend: separar responsabilidades, validaciones y acceso a datos.

Evitar dos extremos:

- mezclar todo en un solo archivo cuando ya se volvió difícil de mantener;
- sobrediseñar un MVP con capas que no aportan valor inmediato.

## Legibilidad

El código debe favorecer lectura y mantenimiento.

Recomendaciones:

- usar nombres descriptivos;
- evitar abreviaturas innecesarias;
- dividir funciones grandes cuando pierden claridad;
- evitar duplicar lógica crítica;
- comentar decisiones no obvias, no cada línea;
- mantener archivos con responsabilidad clara;
- eliminar código muerto cuando se detecte.

## Datos, configuración y reglas de negocio

Cuando sea posible:

- separar datos estáticos de la lógica;
- separar configuración de negocio de presentación visual;
- evitar valores mágicos dispersos;
- agrupar constantes reutilizadas;
- documentar reglas que afecten precio, permisos, estados o cálculos importantes.

Ejemplo de mala señal:

```txt
El mismo descuento aparece escrito en 4 lugares distintos.
```

Mejor:

```txt
El descuento vive en una constante o configuración única.
```

## Seguridad básica

Reglas mínimas:

- no commitear `.env`;
- no subir tokens, claves, contraseñas ni credenciales;
- no exponer datos privados de clientes o integrantes;
- no registrar información sensible en logs públicos;
- revisar dependencias antes de agregarlas;
- usar variables de entorno cuando corresponda;
- cambiar credenciales inmediatamente si se filtraron.

Si se detecta una filtración, no alcanza con borrar el commit. La credencial debe rotarse.

## Performance

La performance se evalúa según el proyecto.

No todos los proyectos necesitan la misma optimización. Una landing, una SPA, un panel administrativo y una API con base de datos tienen cuellos de botella distintos.

Criterios generales:

- evitar dependencias innecesarias;
- no cargar recursos pesados sin motivo;
- optimizar imágenes cuando afecten la experiencia;
- evitar consultas o procesos repetidos sin necesidad;
- medir antes de sobrerreaccionar;
- priorizar los cuellos reales del proyecto.

## Frontend

Cuando el proyecto tenga frontend:

- usar HTML semántico cuando sea posible;
- cuidar navegación y estados vacíos;
- validar formularios de forma clara;
- evitar interacciones confusas;
- asegurar que la UI funcione en las resoluciones relevantes;
- revisar accesibilidad básica: contraste, labels, foco y navegación por teclado cuando aplique.

Mobile-first puede ser prioridad cuando el producto se use principalmente desde celular. No es una regla universal para todos los proyectos.

## Backend y datos

Cuando el proyecto tenga backend o base de datos:

- diseñar modelos con nombres claros;
- evitar duplicidad de datos sin motivo;
- cuidar integridad y relaciones;
- validar entradas del usuario;
- manejar errores de forma consistente;
- no confiar en validaciones solo del frontend;
- documentar migraciones o cambios de esquema importantes.

En proyectos database-first, el modelo de datos debe estar bien pensado antes de construir lógica encima.

## Dependencias

Antes de sumar una dependencia, preguntarse:

- ¿resuelve un problema real?
- ¿es mantenida?
- ¿agrega demasiado peso?
- ¿el equipo la entiende?
- ¿se puede resolver de forma simple sin sumar riesgo?

Una dependencia útil está bien. Una dependencia innecesaria se convierte en deuda.

## Pruebas y validación

Por ahora no se exigen tests automáticos en todos los proyectos.

Sí se exige validación manual clara:

- probar el flujo afectado;
- probar al menos un caso normal;
- probar casos borde básicos;
- revisar errores visibles en consola o logs;
- documentar en el PR cómo se validó.

Si un proyecto crece o tiene lógica crítica, se debe evaluar agregar tests automáticos.

## Definición mínima de listo

Un cambio está listo cuando:

- cumple su objetivo;
- no rompe flujos conocidos;
- puede ser entendido por otra persona;
- fue probado manualmente;
- no introduce datos sensibles;
- tiene documentación actualizada si corresponde;
- deja el proyecto en un estado ejecutable o revisable.
