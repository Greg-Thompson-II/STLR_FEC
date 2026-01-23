export const API_KEY = import.meta.env.VITE_GIPHY_API_KEY;
export const BASE_URL = "https://api.giphy.com/v1/gifs/";

export const fetchTrendingGifs = async (
  setGifs: (gifs: any[]) => void,
  setErrorAlert: (message: string) => void,
) => {
  try {
    const response = await fetch(
      `${BASE_URL}trending?api_key=${API_KEY}&limit=10&bundle=low_bandwidth`,
    );
    const gifs = await parseAPIResponse(response, setErrorAlert);
    setGifs(gifs.data);
  } catch (error) {
    console.error("Error fetching GIFs:", error);
  }
};

export const fetchSearchedGifs = async (
  newSearchTerm: string,
  setGifs: (gifs: any[]) => void,
  setErrorMessage: (message: string) => void,
) => {
  try {
    const response = await fetch(
      `${BASE_URL}search?api_key=${API_KEY}&q=${encodeURIComponent(
        newSearchTerm,
      )}&limit=30&bundle=low_bandwidth`,
    );
    const gifs = await parseAPIResponse(response, setErrorMessage);
    setGifs(gifs.data);
  } catch (error) {
    console.error("Error fetching searched GIFs:", error);
  }
};

export const parseAPIResponse = async (
  response: Response,
  setErrorMessage: (message: string) => void,
) => {
  if (response.status === 429) {
    setErrorMessage("You've made too many requests. Please try again later.");
    throw new Error("You've made too many requests. Please try again later.");
  }

  if (!response.ok) {
    setErrorMessage(
      `Request failed with status ${response.status}. Please contact support.`,
    );
    throw new Error(
      `Request failed with status ${response.status}. Please contact support.`,
    );
  }

  return response.json();
};
