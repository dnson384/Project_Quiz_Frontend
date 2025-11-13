import { AxiosError } from "axios";
import axios from "axios";

const base_url = "http://127.0.0.1:8000/api/auth";

export async function login(
  fieldData: Record<string, string>,
  setError: (msg: string) => void
) {
  const payload = {
    email: fieldData.email,
    plain_password: fieldData.password,
  };

  try {
    const response = await axios.post(`${base_url}/login`, payload);
    return response.data;
  } catch (err) {
    const axiosErr = err as AxiosError<{ detail: string }>;
    console.error(axiosErr.response?.data?.detail);
    setError(axiosErr.response?.data?.detail || "Đã có lỗi xảy ra");
  }
}

export async function register(
  fieldData: Record<string, string>,
  setError: (msg: string) => void
) {
  const payload = {
    email: fieldData.email,
    username: fieldData.username,
    plain_password: fieldData.password,
    confirm_password: fieldData.confirm_password,
    role: fieldData.role,
  };
  try {
    const response = await axios.post(`${base_url}/register`, payload);
    return response.data;
  } catch (err: unknown) {
    const axiosErr = err as AxiosError<{ detail: string }>;
    console.error(axiosErr.response?.data?.detail);
    setError(axiosErr.response?.data?.detail || "Đã có lỗi xảy ra");
  }
}
