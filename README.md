# Acortador de URL

Este proyecto es una aplicación web para acortar URLs utilizando Next.js, Tailwind CSS, Node.js (a través de API routes) y Supabase para la persistencia de datos.

## Características

- **Frontend:** Next.js y Tailwind CSS
- **Backend:** Rutas API de Next.js
- **Base de Datos:** Supabase (PostgreSQL)
- **Despliegue:** Vercel

## Requisitos

- Node.js (versión 14 o superior recomendada)
- Una cuenta en Supabase
- Una cuenta en Vercel

## Instalación

1. Clona el repositorio:
   ```bash
   git clone https://tu-repositorio.git
   cd url-shortener
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Crea un archivo `.env.local` en la raíz del proyecto basado en el archivo `.env.example` y configura las variables:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://tu-supabase-url
   SUPABASE_KEY=tu-supabase-key
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

4. Corre el servidor de desarrollo:
   ```bash
   npm run dev
   ```
   La aplicación estará disponible en [http://localhost:3000](http://localhost:3000).

## Configuración de Supabase

1. En tu panel de Supabase, crea una tabla llamada `urls` con las siguientes columnas:
   - `original_url` (tipo: text)
   - `short_code` (tipo: text)

2. Si utilizas Row-Level Security (RLS), asegúrate de configurar las políticas necesarias para permitir inserciones. Por ejemplo, para permitir inserciones públicas, puedes ejecutar:
   ```sql
   CREATE POLICY "Allow public inserts on urls" ON urls
   FOR INSERT
   WITH CHECK (true);
   ```
   O deshabilitar RLS en desarrollo:
   ```sql
   ALTER TABLE urls DISABLE ROW LEVEL SECURITY;
   ```

## Despliegue en Vercel

Para desplegar este proyecto en Vercel, sigue estos pasos:

1. [Crea una cuenta en Vercel](https://vercel.com/) (o inicia sesión si ya tienes una).

2. Conecta tu repositorio:
   - Dentro del panel de Vercel, haz clic en "New Project".
   - Selecciona el repositorio que contiene este proyecto.

3. Configura el proyecto en Vercel:
   - Durante el proceso de importación, Vercel detectará que se trata de un proyecto Next.js.
   - Añade las variables de entorno en el dashboard de Vercel, usando los mismos valores que en tu archivo `.env.local`:
     - `NEXT_PUBLIC_SUPABASE_URL`
     - `SUPABASE_KEY`
     - `NEXT_PUBLIC_APP_URL` (generalmente, la URL que Vercel asignará al proyecto, por ejemplo, `https://tu-proyecto.vercel.app`)

4. Una vez configurado, haz clic en "Deploy". Vercel construirá y desplegará la aplicación automáticamente.

5. Si realizas cambios en el repositorio, Vercel desplegará nuevas versiones automáticamente.

## Uso

1. Ingresa a la aplicación y verás un formulario para introducir una URL.
2. Al enviar el formulario, se creará una versión acortada de la URL utilizando la API de Next.js y se almacenará en Supabase.
3. Podrás acceder a la URL acortada y se redirigirá a la URL original.

## Contribuciones

Las contribuciones son bienvenidas. Si tienes alguna mejora o corrección, abre un pull request o un issue.

## Licencia

Este proyecto está licenciado bajo la MIT License. 