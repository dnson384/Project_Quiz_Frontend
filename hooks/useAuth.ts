import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { login, register } from "@/services/auth";

export default function useAuth() {
  const [fieldData, setFieldData] = useState<Record<string, string>>({});
  const [error, setError] = useState<string | null>(null);
  const [acceptTerm, setAcceptTerm] = useState(false);

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

  const handleSubmitLoginForm = async (
    event: React.MouseEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    if (!handleMissingInput("login", fieldData)) {
      try {
        await login(fieldData, setError);
        router.push("/dashboard");
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleSubmitRegisterForm = async (
    event: React.MouseEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    if (!acceptTerm) {
      setError("Vui lòng chấp nhận điều khoản...");
      return;
    }
    if (!handleMissingInput("register", fieldData)) {
      await register(fieldData, setError);
    }
  };

  const handleAcceptTermChange = () => {
    setAcceptTerm(!acceptTerm);
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
    acceptTerm,
    setFieldData,
    setError,
    handleInputChange,
    setRole,
    handleRoleChoice,
    handleCloseAuthForm,
    handleSubmitLoginForm,
    handleSubmitRegisterForm,
    handleAcceptTermChange,
  };
}
