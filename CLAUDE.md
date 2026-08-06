# CLAUDE.md — academia-piloto-ia (Capitán Vélez EchandIA)

> El estado funcional detallado y la bitácora del loop de excelencia están en `REPORTE.md`.
> Este archivo solo tiene los hechos que hacen falta en toda sesión.

---

## Qué es y en qué estado está

App educativa gamificada tipo Duolingo para enseñarle inteligencia artificial a **Daniel**
(adolescente), como complemento de las clases presenciales del plan de 8 sesiones que está en
`../01-plan-maestro.md`. Nombre en pantalla: **Capitán Vélez EchandIA**; nombre de la PWA:
*Tripulación Vélez EchandIA*. Es un encargo familiar, no un trabajo cobrado a un cliente.

**Estado: EN PRODUCCIÓN** → **https://tripulacion-echandia.vercel.app**
Repo: `github.com/prietoandres222-maker/academia-piloto-ia`.

Único paso pendiente, y no es de código: entrar a **Modo Comandante** y escribir la *Carta del
papá* y el *Mensaje de la familia*. La propia app lo recuerda en el panel.

## Stack real: no hay stack

**Un solo archivo `index.html`** (≈637 KB, ~1850 líneas) en JavaScript, CSS y SVG a mano.
**Sin framework, sin `package.json`, sin dependencias, sin paso de compilación.** Se edita el
HTML y eso es todo. El arte (Capi, el guacamayo) es SVG escrito dentro del mismo archivo.

Esto es deliberado: el archivo se puede abrir, servir o copiar sin instalar nada. **No partirlo
en módulos ni meterle un bundler** sin una razón muy fuerte — se perdería la única ventaja que
tiene.

Archivos que lo acompañan:

| Archivo | Qué es |
|---|---|
| `index.html` | **la aplicación entera** |
| `validar.cjs` | validador de las preguntas (ver trampas) |
| `server.cjs` | servidor estático local, puerto 4599. Está en `.gitignore`: es herramienta, no producto |
| `manifest.webmanifest`, `icon.png`, `apple-touch-icon.png` | PWA instalable en iPhone y Android |
| `vercel.json` | fuerza `Cache-Control: max-age=0, must-revalidate` para que los cambios se vean ya |
| `RESPALDOS/` | copias puntuales (HTML previo a renumerar, volcado de la nube) |
| `RESPALDO-SUPABASE/` | respaldo de la nube anterior + `RESTAURAR.md` (ver trampas) |

## Cómo se levanta en local y cómo se publica

```bash
node server.cjs      # http://localhost:4599
node validar.cjs     # OBLIGATORIO antes de publicar
```

Publicación: Vercel, como sitio estático, desde el repo. No hay build.

**Variables de entorno:** la app no lee ninguna en tiempo de ejecución (es HTML plano).
`.env.local` existe solo para herramientas locales y contiene los nombres `SYNC_URL`,
`NETLIFY_SYNC_SITE_ID`, `NETLIFY_SYNC_REPO` y `APP_TUTOR_PIN`. Está en `.gitignore`.

## Dónde se guardan los datos

**El navegador manda; la nube es una copia.** El progreso vive en `localStorage` y el juego
está hecho para seguir funcionando aunque la nube no conteste.

La nube es una función de **Netlify Blobs** (`SYNC_URL`, definida como constante dentro de
`index.html`), con dos clases de fila:

- `cve_roster` → la lista de pilotos de la familia (compartida).
- `cve_<id>` → el progreso de cada piloto. El `id` sale del nombre (`dani`, `andres`…), y ese
  mismo id es el "código de piloto" que permite recuperar el avance en otro equipo.

La carrera de sincronización se resuelve por `progressScore` (lecciones × 10000 + xp):
**gana el que tenga más progreso**, nunca el más reciente. Al cerrar la pestaña se hace un
`flush` con `keepalive`.

## Contenido y reglas del juego (esto es el producto, no adorno)

- **10 etapas de vuelo, 2 temas cada una**, definidas en la constante `CURRICULUM` dentro de
  `index.html`: 1 Despegue · 2 Plan de Vuelo · 3 Cartografía · 4 Radar · 5 Copiloto ·
  6 Controles · 7 Bitácora · 8 Piloto Automático · 9 Ingeniería · 10 Comando.
  Cada etapa da una insignia. **Sin GPTs**, a propósito.
- **Rangos y umbrales exactos:** Cadete → Alférez (220) → Teniente (520) → Primer Oficial (780)
  → Capitán IA (1000). No cambiarlos sin recalcular el contenido: están calibrados con el número
  de ejercicios.
- **Máximo 5 pilotos.** Cada uno con nombre, avatar e indicativo, y progreso aislado.
- **Se empieza desde cero.** No sembrar progreso: el punto es que se lo gane jugando.
- **Modo Comandante** (protegido por PIN, definido dentro de `index.html`): métricas, premios por
  rango, cartas, código de piloto, exportar / importar / sincronizar / reiniciar.
- **Premio real del recorrido:** una hora en un simulador Airbus A320 con pilotos reales en
  V1 Aviation Center, Medellín. La pista y el avión de la pantalla avanzan hacia "V1" según el
  progreso, y los premios del siguiente rango se ven por adelantado.

## Convenciones de diseño

Interfaz al estilo Duolingo: **un ejercicio a la vez**, botón COMPROBAR **fijo abajo**,
**sin corazones ni vidas**, retroalimentación que sube desde abajo. Celebraciones variadas más
un *jackpot* ocasional (también en repaso), y racha **con escudo que perdona** un día.
Todo esto está pensado para sostener la atención y no castigar: el porqué de cada decisión está
en `REPORTE.md` y viene del loop de jueces adversariales. **Antes de "simplificar" cualquiera de
estas piezas, leer ahí por qué está.**

Color de fondo y tema: `#070d20`. Español de Colombia. Sin scroll horizontal en ninguna pantalla.

## Trampas conocidas (ya costaron, no repetir)

- **Correr `node validar.cjs` antes de publicar, siempre.** Existe por un error real: una
  pregunta tenía marcada como correcta la opción "Un emoji". El validador revisa las 131
  preguntas y falla si algo está mal. Si se agregan preguntas, se agregan **con el validador
  pasando**.
- **Escapar el texto que escribe el usuario** (nombres de piloto, indicativos): fue una regresión
  detectada en la ronda 2 del loop. Cualquier campo nuevo debe escapar igual.
- **La nube puede no responder y eso está bien.** Ninguna funcionalidad nueva debe quedar
  bloqueada esperando a `SYNC_URL`. Si falla, el indicador pasa a "Guardado en este equipo" y
  el juego sigue.
- **El proyecto de Supabase `capitan-dani-ia` está PAUSADO, no borrado.** Era la nube anterior.
  Se pausó porque el plan gratis solo permite 2 proyectos activos y los ocupan `crm-mop` y
  `las-prendas`. Reactivarlo requiere pausar otro. El respaldo y el instructivo están en
  `RESPALDO-SUPABASE/RESTAURAR.md`. **La nube vigente es Netlify Blobs, no Supabase.**
- **`vercel.json` desactiva la caché a propósito.** Sin eso, un cambio en `index.html` puede
  tardar en verse y parece que la publicación no funcionó.

## Qué NO tocar

- **La estructura de un solo archivo.** Es la decisión que hace que esto se pueda mantener sin
  entorno de desarrollo.
- **Los umbrales de rango y el número de etapas**: están calibrados con la cantidad de
  ejercicios y con los premios que ya se le prometieron a Daniel.
- **Las claves de fila de la nube** (`cve_roster`, `cve_<id>`): cambiarlas deja huérfano el
  progreso ya guardado.
- **`RESPALDO-SUPABASE/` y `RESPALDOS/`**: son la red de seguridad, no archivos viejos que
  estorban.
