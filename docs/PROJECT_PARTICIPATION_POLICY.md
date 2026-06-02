---
layout: default
title: Política de participación
description: Política interna de Dayle Code sobre participación por proyecto.
---

# Política de participación, faltas y distribución por proyecto

## 1. Objetivo

Esta política define cómo se distribuye el pago de un proyecto entre los integrantes del equipo cuando existen faltas, ausencias, abandonos parciales o falta de contribución verificable.

El objetivo no es castigar por problemas reales o emergencias justificadas. El objetivo es proteger al equipo frente a incumplimientos, ausencias no avisadas y baja participación.

## 2. Principio base

Cada proyecto inicia con una distribución igualitaria entre los integrantes activos.

Para un equipo de 5 personas:

```txt
Participación base individual = 100% / 5 = 20%
```

Si el equipo cambia de tamaño, la fórmula general es:

```txt
Participación base individual = 100% / cantidad de integrantes activos
```

Toda penalización descuenta puntos porcentuales de la participación individual. Lo descontado se acumula en una bolsa común.

---

## 3. Conceptos principales

### 3.1. Días hábiles del proyecto

Se considera la cantidad estimada de días hábiles desde el inicio real del proyecto hasta su fecha estimada de cierre.

```txt
D = días hábiles estimados del proyecto
```

Ejemplo:

```txt
Proyecto de 6 días hábiles  => D = 6
Proyecto de 85 días hábiles => D = 85
```

### 3.2. Puntos de falta

El sistema no mide solo ausencias. También mide falta de contribución.

```txt
Puntos de falta = faltas de asistencia + faltas de contribución
```

Esto evita que alguien pueda asistir a reuniones pero no producir entregables reales.

---

## 4. Tolerancia proporcional a la duración del proyecto

No es lo mismo faltar 3 días en un proyecto de 6 días que faltar 3 días en un proyecto de 85 días.

Por eso, la tolerancia se calcula como un porcentaje del proyecto:

```txt
Faltas toleradas = piso(D × 0,05)
```

Es decir, se tolera hasta un 5% de los días hábiles del proyecto, redondeado hacia abajo.

No se aplica mínimo automático de 1 falta. En proyectos cortos, la tolerancia puede ser 0.

### Ejemplos

| Duración del proyecto | Cálculo | Faltas toleradas |
|---:|---:|---:|
| 6 días | piso(6 × 0,05) = piso(0,3) | 0 |
| 10 días | piso(10 × 0,05) = piso(0,5) | 0 |
| 20 días | piso(20 × 0,05) = piso(1) | 1 |
| 45 días | piso(45 × 0,05) = piso(2,25) | 2 |
| 60 días | piso(60 × 0,05) = piso(3) | 3 |
| 85 días | piso(85 × 0,05) = piso(4,25) | 4 |
| 100 días | piso(100 × 0,05) = piso(5) | 5 |

---

## 5. Faltas penalizables

Solo se penalizan los puntos de falta que superen la tolerancia.

```txt
Faltas penalizables = max(0, puntos_de_falta_totales - faltas_toleradas)
```

Ejemplo en proyecto de 85 días:

```txt
D = 85
Faltas toleradas = piso(85 × 0,05) = 4
Puntos de falta totales = 3
Faltas penalizables = max(0, 3 - 4) = 0
```

Resultado: no hay penalización.

Ejemplo en proyecto de 6 días:

```txt
D = 6
Faltas toleradas = piso(6 × 0,05) = 0
Puntos de falta totales = 3
Faltas penalizables = max(0, 3 - 0) = 3
```

Resultado: las 3 faltas son penalizables.

---

## 6. Escala de descuentos

Una vez superada la tolerancia, cada falta penalizable descuenta inmediatamente. No se espera a acumular bloques de 3 faltas.

La escala es progresiva:

| Faltas penalizables acumuladas | Descuento por cada falta dentro del tramo |
|---:|---:|
| 1 a 3 | -1 punto porcentual cada una |
| 4 a 6 | -2 puntos porcentuales cada una |
| 7 en adelante | -3 puntos porcentuales cada una |

### Tabla de descuento acumulado

| Faltas penalizables | Descuento acumulado |
|---:|---:|
| 1 | -1% |
| 2 | -2% |
| 3 | -3% |
| 4 | -5% |
| 5 | -7% |
| 6 | -9% |
| 7 | -12% |
| 8 | -15% |
| 9 | -18% |
| 10 | -21% |

### Fórmula de referencia

```txt
Si F <= 3:
  descuento = F × 1

Si F > 3 y F <= 6:
  descuento = 3 + ((F - 3) × 2)

Si F > 6:
  descuento = 9 + ((F - 6) × 3)
```

Donde:

```txt
F = faltas penalizables
```

---

## 7. Piso mínimo de participación

Ningún integrante puede bajar de 5% si tuvo una participación mínima real y verificable en el proyecto.

```txt
Piso mínimo con participación válida = 5%
```

Ejemplo:

```txt
Participación base: 20%
Descuento calculado: -18%
Resultado matemático: 2%
Resultado final con piso mínimo: 5%
```

Este piso no es automático. Solo aplica si la persona cumplió con el mínimo de participación definido en la sección siguiente.

---

## 8. Participación mínima para conservar el piso del 5%

Para conservar derecho al piso mínimo del 5%, la persona debe cumplir al menos con un 30% de participación válida en el proyecto.

```txt
Participación mínima válida = 30% del proyecto
```

La participación válida puede medirse combinando:

- asistencia a reuniones importantes;
- entregas útiles;
- tareas cerradas;
- revisiones de código o diseño;
- análisis funcional documentado;
- soporte verificable a otros integrantes;
- disponibilidad real durante etapas críticas.

Si una persona no alcanza ese mínimo, puede perder el derecho al piso mínimo.

En ese caso:

```txt
Participación final = 0%
```

Esta regla aplica especialmente cuando una persona:

- abandona el proyecto sin acuerdo previo;
- no realiza entregas útiles verificables;
- aparece de forma mínima pero no contribuye;
- acumula ausencias graves en un proyecto corto;
- bloquea al equipo y no responde;
- incumple tareas críticas sin aviso ni justificación.

---

## 9. Regla de proporcionalidad para proyectos cortos

En proyectos cortos, una misma cantidad de faltas tiene mayor impacto real.

Por eso, además del cálculo de descuentos, se debe revisar el porcentaje que representan las faltas sobre la duración total del proyecto.

```txt
Ratio de faltas = puntos_de_falta_totales / días_hábiles_del_proyecto
```

Criterios sugeridos:

| Ratio de faltas sobre el proyecto | Consecuencia |
|---:|---|
| Menos de 20% | Se aplica la escala normal |
| 20% a 39% | Revisión obligatoria de impacto |
| 40% a 49% | Puede perder derecho al piso mínimo del 5% |
| 50% o más | Puede aplicarse participación final de 0% |

Ejemplo:

```txt
Proyecto de 6 días
Puntos de falta = 3
Ratio de faltas = 3 / 6 = 50%
```

Aunque el descuento matemático inicial sea de -3 puntos porcentuales, el caso entra en revisión grave porque la persona faltó o incumplió durante la mitad del proyecto.

---

## 10. Tabla orientativa de puntos de falta

### 10.1. Asistencia y disponibilidad

| Acción | Puntos de falta |
|---|---:|
| Llegar tarde sin aviso a una reunión importante | 0,5 |
| Faltar a una reunión pactada sin aviso | 1 |
| No responder durante un día hábil entero teniendo tareas activas | 1 |
| Desaparecer más de 48 horas sin aviso | 2 |
| Abandonar una etapa crítica sin aviso | 3 |

### 10.2. Contribución y entregas

| Acción | Puntos de falta |
|---|---:|
| No entregar una tarea en fecha sin avisar antes | 1 |
| Entregar algo claramente incompleto sin avisar bloqueo | 1 |
| Bloquear a otro integrante por no responder o no entregar | 1 |
| No realizar avances durante una semana teniendo tareas activas | 2 |
| Abandonar una tarea crítica | 2 o 3 |
| Generar retraso crítico por negligencia | 2 o 3 |

### 10.3. Impacto crítico

Una falta puede valer doble o triple si genera daño real al proyecto.

| Situación | Valor sugerido |
|---|---:|
| Falta común | 1 punto |
| Falta que bloquea a otro integrante | 2 puntos |
| Falta en entrega crítica al cliente | 3 puntos |
| Abandono sin aviso | Revisión directa a 0% |

---

## 11. Casos que no deben contar como falta

No se consideran faltas penalizables cuando exista justificación razonable y aviso adecuado.

Ejemplos:

- enfermedad avisada;
- emergencia real;
- ausencia informada con anticipación;
- bloqueo técnico documentado;
- dependencia de otra persona;
- cambio de alcance solicitado por el cliente;
- tarea mal estimada por el equipo;
- demora causada por falta de información externa;
- pausa acordada por el grupo.

El sistema penaliza la falta de responsabilidad, no los problemas reales.

---

## 12. Bolsa común

Todo porcentaje descontado se acumula en una bolsa común.

```txt
Bolsa común = suma de todos los porcentajes descontados
```

La bolsa común se reparte como bono entre los integrantes que no hayan recibido ninguna penalización confirmada en el proyecto.

```txt
Bono individual = bolsa común / cantidad de integrantes sin penalización
```

### Regla de elegibilidad para recibir bono

Puede recibir bono quien:

- no tuvo descuentos confirmados;
- cumplió su participación mínima;
- no abandonó tareas;
- no tuvo faltas críticas;
- mantuvo contribución verificable durante el proyecto.

### Caso especial: todos fueron penalizados

Si todos los integrantes recibieron alguna penalización, la bolsa común no puede asignarse como bono por cumplimiento perfecto.

En ese caso, el equipo debe definir antes del inicio del proyecto una de estas alternativas:

1. repartir la bolsa proporcionalmente según la participación final post-penalización;
2. reservarla para gastos comunes del equipo u organización;
3. definir otra regla por acuerdo unánime.

La alternativa elegida debe quedar registrada antes de empezar el proyecto.

---

## 13. Ejemplo completo

### Proyecto de 85 días hábiles

```txt
Integrantes: 5
Participación base: 20% cada uno
Días hábiles: 85
Faltas toleradas: piso(85 × 0,05) = 4
```

| Persona | Puntos de falta | Faltas penalizables | Descuento | Participación post-penalización |
|---|---:|---:|---:|---:|
| A | 0 | 0 | 0% | 20% |
| B | 3 | 0 | 0% | 20% |
| C | 4 | 0 | 0% | 20% |
| D | 7 | 3 | -3% | 17% |
| E | 10 | 6 | -9% | 11% |

Bolsa común:

```txt
3% + 9% = 12%
```

Integrantes sin penalización: A, B y C.

```txt
Bono individual = 12% / 3 = 4%
```

Resultado final:

| Persona | Participación post-penalización | Bono | Participación final |
|---|---:|---:|---:|
| A | 20% | +4% | 24% |
| B | 20% | +4% | 24% |
| C | 20% | +4% | 24% |
| D | 17% | 0% | 17% |
| E | 11% | 0% | 11% |

Total distribuido:

```txt
24% + 24% + 24% + 17% + 11% = 100%
```

---

## 14. Procedimiento para confirmar penalizaciones

Para evitar decisiones subjetivas, toda penalización debe tener registro.

### Reglas mínimas

1. La tarea, reunión o responsabilidad debe haber estado previamente asignada.
2. La fecha límite o compromiso debe estar documentado.
3. La falta debe registrarse por escrito.
4. La persona afectada tiene derecho a responder o justificar dentro de las 48 horas.
5. La penalización se confirma por mayoría simple del equipo, excluyendo a la persona afectada.
6. Si el caso involucra a más de una persona, esas personas no votan sobre su propio caso.

### Registro recomendado

Usar herramientas del proyecto, por ejemplo:

- GitHub Issues;
- GitHub Projects;
- Pull Requests;
- tablero de tareas;
- actas breves de reunión;
- mensajes fijados en el canal del equipo.

---

## 15. Requisitos para que una tarea pueda usarse como evidencia

Una tarea solo puede usarse para evaluar cumplimiento si tiene información mínima.

Debe incluir:

- responsable;
- descripción clara;
- fecha límite;
- criterio de aceptación;
- dependencia, si existe;
- estado actual;
- evidencia de entrega o bloqueo.

Si una tarea está mal definida, no debería usarse como base para penalizar.

---

## 16. Resumen de fórmula

```txt
N = cantidad de integrantes activos
D = días hábiles estimados del proyecto
B = participación base individual
T = faltas toleradas
PF = puntos de falta totales
F = faltas penalizables
```

```txt
B = 100 / N
T = piso(D × 0,05)
F = max(0, PF - T)
```

Descuento:

```txt
Si F <= 3:
  descuento = F × 1

Si F > 3 y F <= 6:
  descuento = 3 + ((F - 3) × 2)

Si F > 6:
  descuento = 9 + ((F - 6) × 3)
```

Participación preliminar:

```txt
participación_preliminar = B - descuento
```

Piso mínimo:

```txt
Si participación válida >= 30%:
  participación_post_penalización = max(participación_preliminar, 5%)

Si participación válida < 30%:
  participación_post_penalización = 0%
```

Bolsa común:

```txt
bolsa_común = suma de descuentos aplicados
```

Bono:

```txt
bono_individual = bolsa_común / cantidad de integrantes sin penalización
```

Participación final:

```txt
participación_final = participación_post_penalización + bono_individual_si_corresponde
```

---

## 17. Aprobación previa

Esta política debe ser aceptada por todos los integrantes antes de iniciar un proyecto.

No debe aplicarse retroactivamente salvo acuerdo explícito del equipo.

Antes de iniciar cada proyecto, el equipo debe dejar definidos:

- integrantes activos;
- participación base;
- fecha de inicio;
- fecha estimada de cierre;
- días hábiles estimados;
- tareas iniciales;
- responsables;
- método de registro;
- regla elegida para la bolsa común si todos son penalizados.

---

## 18. Nota final

Esta política debe entenderse como una regla interna de distribución variable por participación en proyectos.

No reemplaza contratos, acuerdos legales, obligaciones laborales ni documentación formal que el equipo pueda necesitar según su contexto.
