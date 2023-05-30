const HEADLINES_BASIC_URL = import.meta.env.VITE_APP_HEADLINES_URL as string;
const NEWS_BASIC_URL = import.meta.env.VITE_APP_NEWS_URL as string;
const API_KEY = import.meta.env.VITE_APP_API_KEY as string;

export const HEADLINE_URL = `${HEADLINES_BASIC_URL}?when=14d&page_size=30`;
export const NEWS_URL = `${NEWS_BASIC_URL}?page_size=30`;

const requestOptions = {
  method: "GET",
  headers: { "Content-Type": "application.json", "x-api-key": API_KEY },
};

export const fetchData = (URL: string) => {
  const response = fetch(URL, requestOptions).then((res) => res.json());
  return response;
};
