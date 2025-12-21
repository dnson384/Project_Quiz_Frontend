import { User } from "@/domain/entities/User";
import axios from "axios";

const base_url = "/api/admin";

export async function getAllUsers(): Promise<User[]> {
  const response = await axios.get(`${base_url}/all-users`);
  return response.data;
}

export async function grantAdmin(id: string) {
  const response = await axios.put(
    `${base_url}/grant-admin`,
    {},
    {
      params: {
        id: id,
      },
    }
  );
  return response.data;
}
