const API_BASE =
  (import.meta as any).env?.VITE_API_URL ||
  ((import.meta as any).env?.PROD ? '/api' : 'http://localhost:4000/api');

export async function apiGet<T>(path: string): Promise<T> {
  const response = await fetch(`${API_BASE}${path}`);
  if (!response.ok) {
    throw new Error(`GET ${path} failed with ${response.status}`);
  }
  return response.json();
}

export async function apiPost<T>(path: string, body: any): Promise<T> {
  const response = await fetch(`${API_BASE}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const payload = await response.json();
  if (!response.ok) {
    throw new Error(payload?.message || `POST ${path} failed with ${response.status}`);
  }
  return payload;
}
