import axios, { AxiosError } from "axios";

const base_url = "/api/practice-test";

export async function getRandomPracticeTest() {
  try {
    const response = await axios.get(`${base_url}/random`);
    return response.data;
  } catch (err) {
    const axiosErr = err as AxiosError<{ detail: string }>;
    console.error(axiosErr.response?.data.detail);
  }
}

export async function getPracticeTestDetail(practiceTestId: string) {
  try {
    const response = await axios.get(`${base_url}/detail`, {
      params: {
        practice_test_id: practiceTestId,
      },
    });

    return response.data
  } catch (err) {
    const axiosErr = err as AxiosError<{ detail: string }>;
    console.error(axiosErr.response?.data.detail);
  }
}
