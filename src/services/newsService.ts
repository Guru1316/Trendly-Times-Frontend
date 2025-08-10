import axios from "axios";

const API_BASE = "https://trendly-times-backend.onrender.com"; // Use your deployed backend URL

export const fetchNews = async (
  query: string,
  sortBy: string,
  language: string,
  page: number
) => {
  const today = new Date();
  const lastWeek = new Date();
  lastWeek.setDate(today.getDate() - 7);

  const res = await axios.get(`${API_BASE}/news`, {
    params: {
      q: query || "general",
      sortBy,
      language,
      page,
      pageSize: 50,
      from: lastWeek.toISOString().split("T")[0],
      to: today.toISOString().split("T")[0],
    },
  });
  return res.data;
};
