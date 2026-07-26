# REPORTE — Capitán Velez EchandIA

App educativa gamificada (tipo Duolingo) para enseñarle IA a **Daniel** (15, TDAH, sueña con ser piloto),
complemento de las clases de Felipe. Un único `index.html` vanilla.

## 🌐 URL pública (verificada)
**https://capitan-dani-ia.vercel.app** · código en https://github.com/prietoandres222-maker/academia-piloto-ia

## Estado actual (rediseño con loop de excelencia)
- **Nombre:** Capitán Velez EchandIA (con el apellido Vélez del papá + "IA").
- **Multiusuario (máx 5):** pantalla "¿Quién vuela hoy?" para crear / elegir / **editar** / borrar piloto (nombre + avatar + indicativo). Progreso y nube **separados por perfil**. **Recuperación entre equipos con "código de piloto"** (se ve en Modo Comandante; trae el progreso de la nube).
- **Empieza desde CERO** (sin progreso sembrado). Daniel se gana todo jugando.
- **10 etapas de vuelo** (2 temas c/u), cada una da una insignia:
  1 Despegue (capacidades) · 2 Plan de Vuelo (prompts) · 3 Cartografía (imágenes) · 4 Radar (investigar: Deep Research + NotebookLM) · 5 Copiloto (Cowork) · 6 Controles (Chrome) · 7 Bitácora (Excel/oficina) · 8 Piloto Automático (agentes) · 9 Ingeniería (crear con IA) · 10 Comando (uso responsable). **Sin GPTs.** Etapas 1 y 2 a fondo con el contenido real de las clases; 3–10 según la presentación (Criminal 1 y 2).
- **Rangos:** Cadete → Alférez (220) → Teniente (520) → Primer Oficial (780) → Capitán IA (1000).
- **Premio real (héroe del Camino):** 1 hora en un simulador **Airbus A320 con pilotos reales — V1 Aviation Center, Medellín**, con pista + avión que avanza hacia "V1" según el progreso. El **Comandante (Felipe) escribe la carta del papá, el mensaje de la familia y los premios por rango** (aparecen para motivar; los premios del próximo rango se ven por adelantado).
- **UX Duolingo:** un ejercicio a la vez, botón COMPROBAR **fijo abajo**, sin corazones, feedback que sube desde abajo, misiones reales, práctica libre por tema.
- **Motivación TDAH:** celebraciones variables + **jackpot** (también en repaso), **racha con escudo que perdona**, arranque en frío fácil, arte propio (Capi guacamayo en SVG).
- **Nube:** Netlify Blobs por perfil; localStorage manda; carrera de sincronización resuelta (gana más progreso); flush al cerrar.
- **Modo Comandante (PIN 1214):** solo métricas + configurar premios/cartas + código de piloto + export/import/sync/reset. Nota para papás: Capi son frases pregrabadas, no una IA en vivo.

## 🔬 Loop de excelencia (bitácora)
4 jueces adversariales independientes (pedagogía, motivación TDAH, UX/técnica, familia), 2 rondas:
- **Ronda 1 (diseño):** Pedagogía 7 · Motivación 6 · UX/Técnica 5 · Familia 6. Fallas grandes: faltaba multiusuario, premio no visible en la app, contenido con imprecisiones, celebración repetitiva, racha castigadora.
- **Ronda 2 (build verificado en código):** Pedagogía **9** · Familia **9** · UX/Técnica **8** · Motivación **8**. **Todas las fallas críticas confirmadas resueltas** por los jueces. Las mejoras y regresiones de la ronda 2 (premio del próximo rango visible, rango intermedio Primer Oficial, jackpot en repaso, recuperación entre equipos, editar perfil, escapar texto de usuario) quedaron aplicadas y probadas.

## ✅ Verificación técnica (propia)
Probé en navegador (local + producción, móvil y escritorio): crear/editar/borrar/recuperar piloto; jugar la Etapa 1 completa (insignia + vuelo + premio 10%); multiperfil aislado; incorrecto→reintento→repaso; jackpot; Comandante PIN + premios; nube por perfil (POST 200) + recuperación por código; botón COMPROBAR fijo; sin corazones; **0 errores de consola**; sin scroll horizontal.

## ⭐ Único paso pendiente (de Felipe, no del código)
Antes de mostrarle el juego a Daniel: entrar a **Modo Comandante (PIN 1214)** y escribir la **Carta del papá** y el **Mensaje de la familia** (y, si quiere, los premios por rango). Eso le pone el alma al premio. El juego avisa de esto en el panel.
