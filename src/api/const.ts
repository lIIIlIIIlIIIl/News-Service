export const BASIC_URL = import.meta.env.VITE_APP_URL as string;
export const API_KEY = import.meta.env.VITE_APP_API_KEY as string;

export const requestOptions = {
  method: "GET",
  headers: { "Content-Type": "application.json", "x-api-key": API_KEY },
};
