# DECISIONES — Capitán Vélez EchandIA

> Lo que Andrés ya decidió, y lo que se asumió solo bajo las 4 puertas.
> **Antes de preguntarle algo, buscarlo aquí.** Si ya está, se aplica y se sigue.

---

## 16/09/2026 · Se cambia el temario: fuera Excel y agentes, entra video

- **¿Qué etapas se quitan?** → **7 (Bitácora / Claude en Excel)** y **8 (Piloto Automático /
  agentes)**, con sus lecciones, misiones y planes de clase. *Lo pidió Andrés.*
- **¿Sobre qué se rehace lo que falta?** → **Todo sobre el negocio de Daniel.** Él aprende IA
  a través de su propio negocio, no con ejemplos inventados. Las menciones al viejo negocio de
  lociones que quedaban en las etapas pendientes ya salieron.
- **¿Qué entra en su lugar?** → una etapa nueva de **video con IA (Higgsfield)**, llamada
  **Show Aéreo**, en la posición 7: de una foto a un video · gancho, formato vertical y
  duración · videos honestos. Más dos misiones sobre productos reales del negocio.
- **¿Qué se rehace exactamente?** → **solo lo que a Daniel le falta.** Según la nube
  (consultada hoy), tiene superadas las etapas **1 a 6** (470 XP, 22 lecciones, última vez el
  28/08/2026). O sea que lo pendiente era 7, 8, 9 y 10; quitadas la 7 y la 8, se rehace la
  9 (Ingeniería) y la 10 (Comando) y entra la de video. Las etapas 1–6 **no se tocan**.
- **Asumido solo (puerta 4, reversible y autoverificado):** **los ids internos no se
  renumeran.** `e9` y `e10` siguen llamándose así aunque en pantalla digan 8 y 9. *Por qué:*
  el progreso guardado está indexado por id (`done`, `moduleDone`, `fails`); renumerar le
  habría borrado insignias a Daniel, a Olguita y a Andrés.
- **Asumido solo (puerta 4):** **rangos recalibrados** porque el juego quedó más corto:
  Primer Oficial **780 → 700** y Capitán IA **1000 → 900**. *Por qué:* una pasada limpia da
  ahora 866 XP; con el umbral viejo de 1000 el simulador del A320 se volvía casi inalcanzable.
  Con 900 se mantiene la misma proporción de antes (~96%), o sea el mismo esfuerzo. Alférez
  (220) y Teniente (520) **no se movieron**, para no regalarle un rango a nadie.

## 17/09/2026 · El negocio es Milla Azul, y las etapas 8 y 9 se rehacen a fondo

- **¿Cómo se llama el negocio?** → **Milla Azul**.
- **¿Qué vende y a quién?** → **insumos de pesca para gente que está empezando**: señuelos,
  chaquetas impermeables, morrales y **dos productos más que Andrés no recordaba** (quedaron
  como `[los otros dos productos]` dentro de los prompts, para que se vea el hueco).
- **¿Cuál es la propuesta de valor?** → que él **da asesoría**: le dice al principiante qué
  necesita de verdad y qué no. Eso es lo que lo diferencia, y así quedó escrito en las misiones.
- **¿Página web?** → **todavía no tiene**; debía salir el **viernes 18/09/2026**. Las misiones
  que la usan (revisar la página, el botón de WhatsApp, el cotizador) ya la dan por existente.
- **¿De qué ciudad?** → **sin confirmar**. Quedó como `[tu ciudad]` / `[tu región]`: lo llena
  Daniel, que se lo sabe.
- **¿Con qué cuenta de Higgsfield?** → con la **del papá de Daniel**. El servicio exige 18 años
  (Términos de Uso, secc. 2.1, verificado el 16/09/2026) y Daniel tiene 15. Ya está dicho así
  dentro del juego: él maneja, el papá pone la sesión.
- **¿Las etapas 8 y 9?** → **rehechas a fondo, sin cambiarles el tema.** La 8 sigue siendo
  crear con IA y la 9 sigue siendo uso responsable y repaso; lo que cambió es que ahora todos
  los ejercicios pasan por Milla Azul. A la 8 se le agregó una tercera lección, **"Probar como
  cliente"**, porque el bucle real de crear algo es construir, probarlo en el celular y
  arreglarlo. Pasada limpia: **880 XP** contra los 900 de Capitán IA.
- **Lo que Daniel NO perdió (verificado contra la nube el 17/09/2026):** 470 XP, rango Alférez,
  **6 de 9 insignias** (etapas 1 a 6) y 21 lecciones. Lo único que se reinició fueron los **27
  repasos pendientes**, que guardaban posiciones de etapas que ya no existen y habrían sacado
  preguntas equivocadas. Su lección suelta de la vieja Bitácora (`e7l1`) quedó como clave
  huérfana: no le quita XP.

## 17/09/2026 · La carta del papá tenía que viajar

- **Asumido solo (puerta 4, reversible y probado):** la configuración del Comandante (carta del
  papá, mensaje de la familia, premios por rango) ahora **se guarda en la nube**, en la fila
  `cve_cfg`. *Por qué:* vivía solo en el navegador donde se escribiera, así que Andrés podía
  escribir la carta en su PC y Daniel **nunca la iba a ver** en el suyo. Eso rompía justo la
  parte que le da alma al premio.
- **Asumido solo:** `claseFijada` pasa de `"e3"` (la clase del 28/07) a vacío, para que el
  plan de clase se abra en la etapa que sigue según el avance en vez de quedarse en la 3.
- ⚠️ **Lo que Andrés debe saber antes de escribir la carta:** ese endpoint de nube **no tiene
  contraseña** y el repositorio es público, así que quien conozca la dirección puede leer lo
  que se escriba ahí. Para una carta de papá a hijo está bien; **no** se escriban ahí datos
  sensibles. Si Andrés prefiere que la carta NO salga del equipo, se quita el `cloudPut` de
  `saveConfig()` y vuelve a ser local.

## Pendiente de Andrés (17/09/2026)

- **Escribir la Carta del papá y el Mensaje de la familia** en Modo Comandante (PIN 1214).
  Sigue siendo lo único que falta para que el premio pegue de verdad; ahora sí se ve en
  cualquier equipo.
- **Los otros dos productos de Milla Azul** y **la ciudad** de Daniel.
- **Avisar cuando la página web esté publicada** (iba para el 18/09/2026), para poner la
  dirección literal en las misiones que la revisan.

## 05/08/2026 · Torre de Misiones

- **¿Dónde viven las misiones?** → Dentro de la propia app (`tripulacion-echandia.vercel.app`),
  no como tareas sueltas por fuera. *Por qué:* el juego es lo que Daniel abre; una tarea en un
  papel o un chat se pierde.
- **¿Qué herramientas puede usar Daniel?** → **Cowork** (Claude de escritorio) y **Claude en
  Chrome**. **NO** Claude en Excel. *Por qué:* determina qué misiones son reales y cuáles serían
  de adorno. Las de la etapa 7 (Bitácora / hojas de cálculo) se hacen **con Cowork**, no con el
  Claude de Excel.
- **¿Tamaño de las misiones?** → **Una corta y una larga por etapa.** La corta (~20 min) para
  cuando esté sin ganas; la larga (~45 min) como reto que da más XP. *Por qué:* que él escoja
  funciona mejor con TDAH que imponerle una sola.
- **¿Sobre qué van?** → **Todas sobre el negocio de pesca**, encadenadas entre sí. *Por qué:* al
  terminar el juego el negocio queda armado de verdad, no queda solo un puntaje.
- **¿Qué debe empujar el negocio ahora?** → Contenido para redes · precios y catálogo ·
  conseguir los primeros clientes. Las misiones se repartieron sobre esas tres cosas.
- **Asumido solo (puerta 4, reversible y autoverificado):** las misiones se pagan **una sola
  vez** y **cada etapa superada libera las suyas** (no se liberan todas de una). *Por qué:* sin
  el candado de pago único, reabrir una misión regalaba XP y rompía la calibración de rangos;
  y soltarlas todas de golpe le quitaría el efecto de recompensa a superar una etapa.
- **Asumido solo:** los umbrales de rango **no se tocaron**. Con las misiones nuevas, una pasada
  limpia da 954 XP contra los 1000 de Capitán IA, así que el premio sigue costando.

## Pendiente de Felipe (no bloquea nada)

- **Nombre del negocio de pesca, la URL de su página web y el Instagram.** Las misiones están
  escritas para que funcionen sin esos datos (dicen "tu negocio", "tu página"), pero con ellos
  se vuelven literales y se sienten mucho más suyas. Es un ajuste de minutos.
- **Carta del papá y mensaje de la familia** en Modo Comandante (viene pendiente de antes).
