"use client";
import { User } from "@/domain/entities/User";
import { useAuthContext } from "@/presentation/context/authContext";
import { getAllUsers } from "@/presentation/services/admin.service";
import { useEffect, useState } from "react";

export default function useDashboardAdmin() {
  const { user } = useAuthContext();
  const [users, setUsers] = useState<User[]>();

  const handleRoleChagne = (
    event: React.ChangeEvent<HTMLSelectElement>,
    id: string
  ) => {
    if (confirm("Chắc chưa?")) {
      const role = event.target.value;
      setUsers((prev) => {
        const newUsers = [...prev];
        const curUserIndex = newUsers.findIndex((user) => user.id === id);

        if (curUserIndex < 0) return prev;

        newUsers[curUserIndex] = {
          ...newUsers[curUserIndex],
          role: role,
        };
        return newUsers;
      });
      console.log(id, role);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllUsers();
      if (!data) return;

      setUsers(
        data.map((user) => ({
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          avatarUrl: user.avatarUrl,
          loginMethod: user.loginMethod,
        }))
      );
    };
    fetchData();
  }, [user]);

  return { user, users, handleRoleChagne };
}
