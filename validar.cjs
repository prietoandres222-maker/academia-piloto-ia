/* =====================================================================
   VALIDADOR DEL JUEGO — "Tripulación Vélez EchandIA"
   Revisa TODAS las preguntas antes de publicar. Si algo está mal, falla.
   Uso:  node validar.cjs
   Nace por un bug real: la pregunta del "rol" tenía marcada como correcta
   la opción "Un emoji". Esto existe para que eso no se repita nunca.
   ===================================================================== */
const fs = require('fs');

const html = fs.readFileSync(__dirname + '/index.html', 'utf8');

/* --- 1) Sacar el objeto CURRICULUM del HTML sin ejecutar toda la app --- */
function extraerCurriculum() {
  const ini = html.indexOf('const CURRICULUM=');
  if (ini < 0) throw new Error('No encontré CURRICULUM en index.html');
  const abre = html.indexOf('{', ini);
  let i = abre, prof = 0, enTxt = null, esc = false;
  for (; i < html.length; i++) {
    const c = html[i];
    if (enTxt) {
      if (esc) { esc = false; continue; }
      if (c === '\\') { esc = true; continue; }
      if (c === enTxt) enTxt = null;
      continue;
    }
    if (c === '"' || c === "'" || c === '`') { enTxt = c; continue; }
    if (c === '{') prof++;
    else if (c === '}') { prof--; if (prof === 0) { i++; break; } }
  }
  const cuerpo = html.slice(abre, i);
  return new Function('return ' + cuerpo)();
}

const CUR = extraerCurriculum();

const TIPOS = ['mc', 'tf', 'fill', 'order', 'match', 'improve', 'mission', 'detect'];
const errores = [], avisos = [];
let nEx = 0, nLec = 0;

const donde = (lv, le, k) =>
  `Etapa ${lv.etapa} (${lv.id}) · lección "${le.t}" (${le.id}) · ejercicio #${k + 1}`;

/* --- 2) Revisar --- */
for (const lv of CUR.levels) {
  if (!lv.id || !lv.name) errores.push(`Etapa sin id o nombre: ${JSON.stringify(lv.id)}`);
  if (!lv.insignia || !lv.insignia.id) errores.push(`Etapa ${lv.id} sin insignia`);
  if (!Array.isArray(lv.lessons) || !lv.lessons.length) { errores.push(`Etapa ${lv.id} sin lecciones`); continue; }

  const idsLec = new Set();
  for (const le of lv.lessons) {
    nLec++;
    if (!le.id) errores.push(`Etapa ${lv.id}: lección sin id`);
    if (idsLec.has(le.id)) errores.push(`Etapa ${lv.id}: id de lección repetido "${le.id}"`);
    idsLec.add(le.id);
    if (!Array.isArray(le.ex) || !le.ex.length) { errores.push(`Lección ${le.id} sin ejercicios`); continue; }

    le.ex.forEach((e, k) => {
      nEx++;
      const D = donde(lv, le, k);

      if (!TIPOS.includes(e.type)) { errores.push(`${D}: tipo desconocido "${e.type}"`); return; }
      if (e.type !== 'mission' && !e.q) errores.push(`${D}: sin enunciado (q)`);
      if (e.type !== 'mission' && e.type !== 'improve' && !e.ex)
        avisos.push(`${D}: sin explicación (ex)`);

      /* --- opciones con índice de respuesta --- */
      if (e.type === 'mc' || e.type === 'fill' || e.type === 'improve' || e.type === 'detect') {
        if (!Array.isArray(e.opts) || e.opts.length < 2) {
          errores.push(`${D}: necesita al menos 2 opciones`); return;
        }
        if (typeof e.a !== 'number' || !Number.isInteger(e.a)) {
          errores.push(`${D}: la respuesta (a) debe ser un número entero, es ${JSON.stringify(e.a)}`); return;
        }
        if (e.a < 0 || e.a >= e.opts.length) {
          errores.push(`${D}: 🔴 respuesta fuera de rango (a=${e.a}, hay ${e.opts.length} opciones)`); return;
        }
        const textos = e.opts.map(o => String(o).trim().toLowerCase());
        if (new Set(textos).size !== textos.length)
          errores.push(`${D}: hay opciones repetidas`);
        e.opts.forEach((o, i) => { if (!String(o).trim()) errores.push(`${D}: opción #${i + 1} vacía`); });

        /* Heurística anti-"respuesta obvia": la correcta no debería ser
           muchísimo más larga que todas las demás, ni muchísimo más corta. */
        const largos = e.opts.map(o => String(o).length);
        const lC = largos[e.a];
        const otros = largos.filter((_, i) => i !== e.a);
        const maxOtros = Math.max(...otros), minOtros = Math.min(...otros);
        if (e.type === 'mc' || e.type === 'detect') {
          if (lC > maxOtros * 2.2 && lC - maxOtros > 25)
            avisos.push(`${D}: la correcta es mucho más larga que las demás (se adivina sola)`);
          if (lC * 2.2 < minOtros && minOtros - lC > 25)
            avisos.push(`${D}: 🔴 la correcta es mucho MÁS CORTA que las otras — revisa si el índice está bien`);
          const cortas = e.opts.filter((o, i) => i !== e.a && String(o).trim().length <= 12);
          if (cortas.length >= 2)
            avisos.push(`${D}: distractores demasiado cortos/obvios (${cortas.map(c => '"' + c + '"').join(', ')})`);
        }

        /* La explicación no debería citar textualmente una opción incorrecta
           como si fuera la buena. */
        if (e.ex) {
          const exl = String(e.ex).toLowerCase();
          e.opts.forEach((o, i) => {
            if (i === e.a) return;
            const ot = String(o).trim().toLowerCase();
            if (ot.length >= 14 && exl.includes(ot))
              avisos.push(`${D}: la explicación menciona textualmente la opción incorrecta "${o}"`);
          });
        }
      }

      /* --- verdadero / falso --- */
      if (e.type === 'tf') {
        if (typeof e.a !== 'boolean')
          errores.push(`${D}: en verdadero/falso la respuesta debe ser true o false, es ${JSON.stringify(e.a)}`);
        if (e.ex) {
          const x = String(e.ex).toLowerCase();
          const diceV = /\b(verdadero|correcto|cierto|s[ií])\b/.test(x.slice(0, 40));
          const diceF = /\b(falso|mentira|incorrecto)\b/.test(x.slice(0, 40));
          if (e.a === true && diceF && !diceV)
            errores.push(`${D}: 🔴 respuesta es VERDADERO pero la explicación empieza diciendo "falso"`);
          if (e.a === false && diceV && !diceF)
            errores.push(`${D}: 🔴 respuesta es FALSO pero la explicación empieza diciendo "verdadero"`);
        }
      }

      /* --- ordenar --- */
      if (e.type === 'order') {
        if (!Array.isArray(e.items) || e.items.length < 2)
          errores.push(`${D}: "order" necesita al menos 2 piezas`);
      }

      /* --- emparejar --- */
      if (e.type === 'match') {
        if (!Array.isArray(e.pairs) || e.pairs.length < 2) { errores.push(`${D}: "match" necesita al menos 2 parejas`); return; }
        e.pairs.forEach((p, i) => {
          if (!p || !p.l || !p.r) errores.push(`${D}: pareja #${i + 1} incompleta`);
        });
        const der = e.pairs.map(p => String(p.r).trim().toLowerCase());
        if (new Set(der).size !== der.length)
          errores.push(`${D}: 🔴 dos parejas tienen la MISMA respuesta (no se puede resolver)`);
      }

      /* --- misión --- */
      if (e.type === 'mission') {
        if (!e.title) errores.push(`${D}: misión sin título`);
        if (!Array.isArray(e.steps) || !e.steps.length) errores.push(`${D}: misión sin pasos`);
        if (!e.botin) avisos.push(`${D}: misión sin "botín" (qué se lleva)`);
        const ultimo = String((e.steps || [])[(e.steps || []).length - 1] || '').toLowerCase();
        if (/cu[eé]ntale a (andr[eé]s|felipe|tu pap)/.test(ultimo))
          errores.push(`${D}: 🔴 el último paso es "contarle a Andrés" — debe terminar generando algo útil`);
      }
    });
  }
}

/* --- 3) Rangos e insignias --- */
if (!Array.isArray(CUR.ranks) || !CUR.ranks.length) errores.push('No hay rangos definidos');
else {
  let prev = -1;
  CUR.ranks.forEach(r => {
    if (typeof r.xp !== 'number') errores.push(`Rango ${r.n} sin XP`);
    if (r.xp <= prev) errores.push(`Rango ${r.n}: los XP deben ir de menor a mayor`);
    prev = r.xp;
  });
}
const idsIns = CUR.levels.map(l => l.insignia && l.insignia.id);
if (new Set(idsIns).size !== idsIns.length) errores.push('Hay insignias con id repetido');

/* --- 4) Informe --- */
const XP_TOTAL = CUR.levels.reduce((s, lv) =>
  s + lv.lessons.reduce((a, le) => a + le.ex.reduce((b, e) => b + (e.xp || 10), 0), 0), 0);

console.log('===== VALIDACIÓN DEL JUEGO =====');
console.log(`Etapas: ${CUR.levels.length} · Lecciones: ${nLec} · Ejercicios: ${nEx}`);
console.log(`XP máximo alcanzable: ~${XP_TOTAL} (Capitán IA pide ${CUR.ranks[CUR.ranks.length - 1].xp})`);
if (XP_TOTAL < CUR.ranks[CUR.ranks.length - 1].xp)
  errores.push(`🔴 IMPOSIBLE LLEGAR A CAPITÁN: el juego da ${XP_TOTAL} XP pero el rango pide ${CUR.ranks[CUR.ranks.length - 1].xp}`);

if (avisos.length) {
  console.log(`\n--- AVISOS (${avisos.length}) — revisar a ojo ---`);
  avisos.forEach(a => console.log('  ⚠️  ' + a));
}
if (errores.length) {
  console.log(`\n--- ERRORES (${errores.length}) — HAY QUE ARREGLARLOS ---`);
  errores.forEach(e => console.log('  ❌ ' + e));
  console.log('\n❌ VALIDACIÓN FALLIDA — no publicar así.');
  process.exit(1);
}
console.log('\n✅ VALIDACIÓN OK — todas las preguntas están bien formadas.');
