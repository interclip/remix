/**
 * Creates a clip from a given URL.
 * @returns The code of the created clip.
 */
export const createClip = async (url: string): Promise<string> => {
  const endpoint = "https://server.interclip.app/api/set";
  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
    },
    body: new URLSearchParams({
      url: url,
    }).toString(),
  });
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  const data = await response.json();

  return data.result;
};

/**
 * Queries the server for a clip.
 * @param code The code of the clip to get.
 * @returns The URL of the clip, or null if the clip was not found.
 */
export const getClip = async (code: string): Promise<string | null> => {
  const endpoint = new URL("https://server.interclip.app/api/get");
  endpoint.searchParams.set("code", code.toLowerCase());

  const response = await fetch(endpoint, {
    method: "GET",
  });
  if (!response.ok) {
    switch (response.status) {
      case 404:
        return null;
      case 403:
        throw new Error("Invalid code");
      default:
        throw new Error(response.statusText);
    }
  }
  const data = await response.json();

  return data.result;
};