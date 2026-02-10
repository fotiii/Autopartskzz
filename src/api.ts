const env = (import.meta as any).env || {};

const API_BASE = env.VITE_API_URL || (env.PROD ? '/api' : 'http://localhost:4000/api');

function buildUrl(path: string): string {
  const normalizedBase = API_BASE.endsWith('/') ? API_BASE.slice(0, -1) : API_BASE;
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${normalizedBase}${normalizedPath}`;
}

async function parseResponse<T>(response: Response, fallbackMessage: string): Promise<T> {
  const payload = await response.json();

  if (!response.ok) {
    throw new Error((payload as any)?.message || fallbackMessage);
  }

  return payload as T;
}

export async function apiGet<T>(path: string): Promise<T> {
  const response = await fetch(buildUrl(path));
  return parseResponse<T>(response, `GET ${path} failed with ${response.status}`);
}

export async function apiPost<T>(path: string, body: any): Promise<T> {
  const response = await fetch(buildUrl(path), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  return parseResponse<T>(response, `POST ${path} failed with ${response.status}`);
}
