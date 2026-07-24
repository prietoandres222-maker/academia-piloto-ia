# REPORTE — Capitán Dani IA

App educativa gamificada (tipo Duolingo) para enseñarle IA a **Daniel** (15 años, TDAH),
temática de academia de pilotos (Cadete → Capitán IA). Se usa como **complemento de clase**:
Felipe enseña, luego juegan; también sirve como tarea de repaso.

## 🌐 URL pública (verificada)

**https://capitan-dani-ia.vercel.app**  (alias limpio)
_(la vieja `https://academia-piloto-ia-mop-modular-crm.vercel.app` también funciona; "mop-modular-crm" es el nombre del **equipo de Vercel**, no del proyecto)_

- `curl` → **200**, `<title>Capitán Dani IA</title>`.
- Navegador real (local y producción): **0 errores de consola**, 7 módulos, 42 nodos, 220 ejercicios, nube conectada (`cloudOk:true`).

**Código:** https://github.com/prietoandres222-maker/academia-piloto-ia (el repo/URL conservan el nombre viejo; la app se llama **Capitán Dani IA**).

## 🆕 Cambios de esta sesión (según lo pedido por Felipe)

1. **Nombre:** ahora es **Capitán Dani IA** (antes "Academia Piloto IA").
2. **Orden de módulos = el de tu Gamma "IA para emprendedores"**:
   1) La era de la IA · 2) Hablarle a la IA · 3) **Prompt Master (HOY)** · 4) Prompts de imagen ·
   5) Alucinaciones/verificar · 6) IA en tu negocio (y modo agente) · 7) Constructor (bonus).
3. **Módulo de Prompts reescrito con tu método exacto del Gamma** ("Construyendo Prompts Efectivos"):
   - Las 5 piezas: **Rol · Tono y estilo · Formato esperado · Contexto · Instrucción/Objetivo**.
   - Extras: **Ejemplos (few-shot)**, **Instrucciones negativas**, **Nivel de detalle**, **Iteración**.
   - Hacks: **Paso a paso y verifica**, **Dividir tareas**, **TLDR**, **EL5**, **Versión 2**, y el truco mayor **"+P" (Prompt Cowboy)**.
   - Usa tus ejemplos malo→bueno de la clase (receta de pollo, cuento del conejo) aterrizados a los intereses de Daniel.
4. **Todos los módulos accesibles** (ya no hay bloqueo por proyecto): así diriges la clase y hoy Daniel entra directo a Prompts.
5. **Celebración más fuerte:** sonido de acierto más festivo (arpegio brillante), **confeti en CADA acierto**, y **simulación de vuelo** (un avión que despega, cruza la ruta y aterriza) **al terminar un módulo**.
6. **Pantalla completa:** la app usa todo el ancho en computador y el tamaño del celular en móvil (layout responsive).
7. **Pantalla de Sesión** adaptada a tu dinámica: *Felipe explica → jugamos juntos → vuelo solo 10 min → misión en ChatGPT → reto del negocio → torre de control (validar + tarea)*.

## ☁️ Fase 2 (Supabase) — AHORA SÍ ACTIVA

- Borré el proyecto Supabase **genérico y vacío** (`prietoandres222@gmail.com's Project`, verificado sin tablas) que ocupaba el cupo gratis — **autorizado por Felipe**. El **CRM MOP no se tocó**.
- Creé un proyecto nuevo **`capitan-dani-ia`** (ref `lwpshygwlkokxfijhjvu`, us-east-1) con una tabla `progreso` (JSON del estado) y **RLS** activada.
- La app hace **upsert al guardar** y **carga el respaldo al iniciar** (gana el más reciente). **localStorage sigue siendo la fuente principal**; Supabase es espejo/respaldo para que Felipe vea el avance desde otro dispositivo.
- **Solo se expone la anon key** (pública por diseño, protegida por RLS; sin datos sensibles). Nunca la service key.
- Todo el código de nube va en `try/catch` y sin bloquear: **si falla la red o Supabase, la app funciona 100% con localStorage**.
- En el **Modo Tutor** hay indicador "☁️ Sincronizado" y botón "🔄 Sincronizar ahora".
- Round-trip probado en vivo: push **201**, lectura de vuelta correcta. Fila de prueba borrada → Daniel arranca de cero.

## 📚 Contenido (100% autorado, español colombiano juvenil)
- **7 módulos · 35 lecciones · 220 ejercicios · 7 proyectos · 22 de ética** (mín. 1 por módulo).
- 7 tipos de ejercicio (mín. 4 por lección), respuesta correcta + explicación al fallar + reintento.
- Mecánicas: XP, rangos (Cadete→Alférez→Teniente→Capitán IA), racha (America/Bogota), 10 insignias, 34 mensajes de celebración, repaso "Simulador de vuelo", copiloto **Capi** (guacamayo).
- **Modo Tutor PIN 1214:** progreso por tema, validar proyectos (da la insignia), XP bonus, reset, export/import JSON, sincronizar nube.

## ✅ Verificaciones
- Validación estática (Node): 7 módulos, 35 lecciones, 220 ejercicios, 22 de ética, 34 celebraciones; respuestas correctas OK; sintaxis JS válida (`node --check`).
- Runtime (navegador, local + producción): lección de Prompts jugada 7/7 (todos los tipos); módulo completado dispara la **simulación de vuelo**; confeti en aciertos; **Supabase push 201 + lectura OK**; racha, insignias, PIN, import/export; **0 errores de consola**.

## Notas / cómo usarlo en clase
Ver el mensaje de Felipe / sugerencias pedagógicas. Resumen: **enseña primero → jueguen juntos el módulo del día → deja que Daniel vuele solo 10 min → misión real en ChatGPT → cierra validando en Modo Tutor y deja 1-2 lecciones de tarea.** Nada quedó pendiente.
