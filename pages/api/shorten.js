import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  const { url } = req.body;
  if (!url) {
    return res.status(400).json({ error: 'La URL es requerida' });
  }

  // Genera un código corto de 6 caracteres
  const shortCode = Math.random().toString(36).substring(2, 8);

  // Inserta la URL original y el código corto en la tabla 'urls'
  const { data, error } = await supabase.from('urls').insert([{ original_url: url, short_code: shortCode }]);

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  // Obtiene el dominio de la aplicación desde las variables de entorno o usa localhost
  const appUrl = process.env.NEXT_PUBLIC_APP_URL;

  return res.status(200).json({ shortUrl: `${appUrl}/${shortCode}` });
} 