"use client";
import { User } from "@/domain/entities/User";
import { useAuthContext } from "@/presentation/context/authContext";
import { getAllUsers, grantAdmin } from "@/presentation/services/admin.service";
import { useEffect, useState } from "react";

export default function useDashboardAdmin() {
  const { user } = useAuthContext();
  const [users, setUsers] = useState<User[]>();

  const grantAdminRole = async (id: string) => {
    if (confirm("Chắc chưa?")) {
      if (await grantAdmin(id)) {
        setUsers((prev) => {
          if (!prev) return;
          return prev.filter((user) => user.id !== id);
        });
      }
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
          isActived: user.isActived,
        }))
      );
    };
    fetchData();
  }, [user]);

  return { user, users, grantAdminRole };
}
