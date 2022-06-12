import axios from "axios";

const baseUrl = "https://bayut.p.rapidapi.com";

const fetchApi = async (url) => {
  const resp = await axios.get(`${baseUrl}${url}`, {
    headers: {
      "X-RapidAPI-Key": process.env.NEXT_PUBLIC_RAPID_API_KEY,
      "X-RapidAPI-Host": "bayut.p.rapidapi.com",
    },
  });
  return resp.data;
};

export { baseUrl, fetchApi };
