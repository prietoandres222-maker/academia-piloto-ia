# Respaldo de la base de datos de Capitán EchandIA (Supabase)

**Fecha del respaldo:** 25/07/2026
**Motivo:** el plan gratis de Supabase solo permite **2 proyectos activos**. Para poder crear
la base de datos de AURUM (la joyería de Adriana) se **pausó** el proyecto `capitan-dani-ia`.

> **Importante:** el proyecto **NO se borró, se pausó**. Pausar es reversible: se puede
> reactivar con un clic y vuelve con todos sus datos. Este respaldo es el cinturón de
> seguridad por si algún día Supabase lo elimina por inactividad prolongada.

## ¿Se dañó la app de Daniel?

No. https://capitan-dani-ia.vercel.app sigue funcionando. El avance de Daniel se guarda
principalmente en el navegador (localStorage) y la nube era solo una copia de respaldo:
el código está hecho para seguir andando si la nube no responde.

Lo único que se pierde mientras esté pausado: si Daniel entra desde **otro** computador o
celular, no verá el avance del primero. En el mismo equipo, todo sigue igual.

---

## Cómo REACTIVAR el proyecto (opción fácil, con clics)

1. Entra a https://supabase.com/dashboard con la cuenta `prietoandres222@gmail.com`.
2. En la lista de proyectos, busca **capitan-dani-ia** (aparecerá como *Paused*).
3. Ábrelo y presiona el botón **"Restore project"** (o *Restore*).
4. Espera unos 3 a 5 minutos. Debería quedar en verde **Active**.
5. Listo: la app vuelve a sincronizar sola. No hay que cambiar nada en el código.

> Ojo: si al reactivarlo el plan gratis ya tiene 2 proyectos activos, Supabase no lo deja.
> En ese caso hay que pausar otro proyecto primero.

## Cómo REACTIVAR pidiéndoselo a Claude Code

Copia y pega esto en Claude Code, dentro de la carpeta `D:\OneDrive\Familia Echandía`:

```
Reactiva el proyecto de Supabase `capitan-dani-ia` (ref lwpshygwlkokxfijhjvu) usando la
Management API con el token del archivo C:\Users\ANDRES\.claude\credenciales-servicios.md.
Si el plan gratis está lleno, avísame antes de pausar cualquier otro proyecto.
Cuando quede activo, verifica que la tabla `progreso` tenga la fila de Daniel.
```

---

## Cómo RECREAR la base desde cero (plan B, si el proyecto desapareciera)

1. Crear un proyecto nuevo de Supabase.
2. Correr este SQL en el editor SQL:

```sql
create table if not exists public.progreso (
  id         text primary key,
  data       jsonb not null,
  updated_at timestamptz default now()
);

alter table public.progreso enable row level security;

create policy p_sel on public.progreso for select using (true);
create policy p_ins on public.progreso for insert with check (true);
create policy p_upd on public.progreso for update using (true) with check (true);
```

3. Volver a cargar la fila de Daniel con el contenido de `progreso-datos.json`
   (campos `id`, `data`, `updated_at`).
4. Cambiar en `index.html` la URL del proyecto y la **anon key** por las del proyecto nuevo,
   y volver a desplegar en Vercel.

## Archivos de este respaldo

- `progreso-datos.json` — todas las filas de la tabla `progreso` (el avance de Daniel).
- `politicas-rls.json` — las reglas de seguridad (RLS) que tenía la tabla.
- `RESTAURAR.md` — este documento.
