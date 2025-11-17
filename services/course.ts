import axios, { AxiosError } from "axios";

const base_url = "/api/course";

export async function getRandomCourse() {
  try {
    const response = await axios.get(base_url);
    return response.data;
  } catch (err) {
    const axiosErr = err as AxiosError<{ detail: string }>;
    console.error(axiosErr.response?.data.detail);
  }
}
