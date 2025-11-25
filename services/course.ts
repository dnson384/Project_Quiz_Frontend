import axios, { AxiosError } from "axios";

const base_url = "/api/course";

export async function getRandomCourse() {
  try {
    const response = await axios.get(`${base_url}/random`);
    return response.data;
  } catch (err) {
    const axiosErr = err as AxiosError<{ detail: string }>;
    console.error(axiosErr.response?.data.detail);
  }
}

export async function getCourseDetail(courseId: string) {
  try {
    const response = await axios.get(`${base_url}/detail`, {
      params: {
        course_id: courseId,
      },
    });
    return response.data;
  } catch (err) {
    const axiosErr = err as AxiosError<{ detail: string }>;
    console.error(axiosErr.response?.data.detail);
  }
}

export async function getCourseLearnQuestions(courseId: string) {
  try {
    const response = await axios.get(`${base_url}/learn`, {
      params: {
        course_id: courseId,
      },
    });
    return response.data;
  } catch (err) {
    const axiosErr = err as AxiosError<{ detail: string }>;
    console.error(axiosErr.response?.data.detail);
  }
}
