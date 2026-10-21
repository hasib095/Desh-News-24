const NEWS_API_URL = "https://news-api-v2.vercel.app";

export async function fetchNewsApi<T>(path: string): Promise<T | null> {
  const response = await fetch(`${NEWS_API_URL}${path}`);

  if (!response.ok) {
    console.warn(`News API request failed (${response.status}): ${path}`);
    return null;
  }

  try {
    return (await response.json()) as T;
  } catch (error) {
    if (error instanceof SyntaxError) {
      console.warn(`News API returned invalid JSON: ${path}`, error);
      return null;
    }

    throw error;
  }
}
