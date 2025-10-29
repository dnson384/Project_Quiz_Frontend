import { tracingChannel } from "diagnostics_channel";
import { eventNames } from "process";
import React, { useEffect, useState } from "react";

export default function useAuth() {
  const [fieldData, setFieldData] = useState<Record<string, string>>({});
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFieldData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRoleChoice = (event: React.MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement;
    setFieldData((prev) => ({ ...prev, role: target.id.toUpperCase() }));
    if (target.id === "student") {
      const teacherElement = document.getElementById("teacher");
      if (teacherElement) {
        teacherElement.classList.add("bg-[#F6F7FB]", "text-black");
        teacherElement.classList.remove("bg-indigo-500", "text-white");
      }
      target.classList.add("bg-indigo-500", "text-white");
      target.classList.remove("bg-[#F6F7FB]", "text-black");
    } else {
      const studentElement = document.getElementById("student");
      if (studentElement) {
        studentElement.classList.add("bg-[#F6F7FB]", "text-black");
        studentElement.classList.remove("bg-indigo-500", "text-white");
      }
      target.classList.add("bg-indigo-500", "text-white");
      target.classList.remove("bg-[#F6F7FB]", "text-black");
    }
  };

  const handleMissingInput = (
    action: string,
    dataInput: Record<string, string>
  ) => {
    setError(null);
    const inputForm =
      action === "register"
        ? {
            email: null,
            username: null,
            password: null,
            confirm_password: null,
            role: null,
          }
        : {
            email: null,
            password: null,
          };

    if (action === "register") {
      // Check email, username, password
      for (const key of ["email", "username", "password"]) {
        if (!dataInput[key]) {
          const errMessage: Record<string, string> = {
            email: "Vui lòng nhập email",
            username: "Vui lòng nhập tên người dùng",
            password: "Vui lòng nhập mật khẩu",
          };
          return setError(errMessage[key]);
        }
      }

      // Check confirm password
      if (
        !dataInput["confirm_password"] ||
        dataInput["password"] != dataInput["confirm_password"]
      ) {
        return setError("Mật khẩu xác nhận không khớp");
      }

      // Check role
      if (!dataInput["role"]) {
        return setError("Vui lòng chọn vai trò người dùng");
      }
    } else if (action === "login") {
      for (const key in Object.keys(inputForm)) {
        if (!dataInput[key] && ["email", "password"].includes(key)) {
          const errMessage: Record<string, string> = {
            email: "Vui lòng nhập email",
            password: "Vui lòng nhập mật khẩu",
          };
          return setError(errMessage[key]);
        }
      }
    }
  };

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
    handleRoleChoice,
    handleMissingInput,
  };
}
