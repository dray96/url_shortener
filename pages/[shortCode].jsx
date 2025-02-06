import { createClient } from '@supabase/supabase-js';

export async function getServerSideProps(context) {
  const { shortCode } = context.params;
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_KEY;

  // Validar que las variables de entorno estén definidas
  if (!supabaseUrl || !supabaseKey) {
    console.error('Las variables de entorno de Supabase no están definidas');
    return { notFound: true };
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  // Buscar la URL original en la base de datos
  const { data, error } = await supabase
    .from('urls')
    .select('original_url')
    .eq('short_code', shortCode)
    .single();

  if (error) {
    console.error('Error al obtener la URL:', error);
  }

  if (error || !data) {
    return {
      notFound: true,
    };
  }

  return {
    redirect: {
      destination: data.original_url,
      permanent: false,
    },
  };
}

export default function RedirectPage() {
  return <div>Redirigiendo...</div>;
} 