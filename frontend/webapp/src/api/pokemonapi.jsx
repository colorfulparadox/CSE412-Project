const API_BASE = "http://127.0.0.1:5000";

export async function pokeapi(path) {
  const res = await fetch(`${API_BASE}${path}`);

  if (!res.ok) {
    throw new Error(`API error: ${res.status} ${res.statusText}`);
  }

  return await res.json();
}