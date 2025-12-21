import { User } from "@/domain/entities/User";
import axios from "axios";

const base_url = "/api/admin";

export async function getAllUsers(): Promise<User[]> {
  const response = await axios.get(`${base_url}/all-users`);
  return response.data;
}
