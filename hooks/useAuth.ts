import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function useAuth() {
  const [fieldData, setFieldData] = useState<Record<string, string>>({});
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const router = useRouter();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFieldData((prev) => ({ ...prev, [name]: value }));
  };

  const setRole = (roleInput: string) => {
    setFieldData((prev) => ({ ...prev, role: roleInput.toUpperCase() }));
  };

  const handleRoleChoice = (event: React.MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement;
    setRole(target.id);
  };

  const handleMissingInput = (
    action: string,
    dataInput: Record<string, string>
  ) => {
    if (action === "register") {
      // Check email, username, password
      for (const key of ["email", "username", "password"]) {
        if (!dataInput[key]) {
          const errMessage: Record<string, string> = {
            email: "Vui lòng nhập email",
            username: "Vui lòng nhập tên người dùng",
            password: "Vui lòng nhập mật khẩu",
          };
          setError(errMessage[key]);
          return true;
        }
      }

      // Check confirm password
      if (
        !dataInput["confirm_password"] ||
        dataInput["password"] != dataInput["confirm_password"]
      ) {
        setError("Mật khẩu xác nhận không khớp");
        return true;
      }

      // Check role
      if (!dataInput["role"]) {
        setError("Vui lòng chọn vai trò người dùng");
        return true;
      }
    } else if (action === "login") {
      for (const key of ["email", "password"]) {
        if (!dataInput[key]) {
          const errMessage: Record<string, string> = {
            email: "Vui lòng nhập email",
            password: "Vui lòng nhập mật khẩu",
          };
          setError(errMessage[key]);
          return true;
        } else if (key === "password") {
          if (dataInput[key].length < 8 || dataInput[key].length > 64) {
            setError("Độ dài mật khẩu không hợp lệ");
            return true;
          }
        }
      }
    }
    return false;
  };

  const handleCloseAuthForm = () => {
    router.push("/");
  };

  // Check error
  useEffect(() => {
    const timeout = setTimeout(() => {
      setError(null);
    }, 3000);
    return () => clearTimeout(timeout);
  }, [error]);

  return {
    fieldData,
    error,
    setFieldData,
    setError,
    handleInputChange,
    setRole,
    handleRoleChoice,
    handleMissingInput,
    handleCloseAuthForm,
  };
}
