import { useState } from 'react';

export default function Home() {
  const [url, setUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/api/shorten', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Error desconocido al acortar la URL');
        setLoading(false);
        return;
      }
      setShortUrl(data.shortUrl);
    } catch (err) {
      setError('Error al conectar con el servidor');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Acortador de URL</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="url"
            placeholder="Introduce tu URL"
            className="w-full p-2 border border-gray-300 rounded mb-4"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
          />
          <button 
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
            disabled={loading}
          >
            {loading ? 'Acortando...' : 'Acortar URL'}
          </button>
        </form>
        {error && <p className="text-red-500 mt-4">{error}</p>}
        {shortUrl && (
          <div className="mt-4">
            <p className="font-bold">URL Acortada:</p>
            <a href={shortUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500">
              {shortUrl}
            </a>
          </div>
        )}
      </div>
    </div>
  );
} 