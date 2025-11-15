"use client";

import { createContext, useContext, ReactNode, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import useSWR from "swr";
import axios, { AxiosError } from "axios";

interface User {
  user_id: string;
  username: string;
  email: string;
  role: string;
  avatar_url: string;
}

interface AuthContextType {
  user: User | null;
  error: AxiosError | null;
}

const fetcher = async (url: string): Promise<User> => {
  try {
    const resposne = await axios.get(url);
    return resposne.data;
  } catch (err) {
    throw err;
  }
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const PUBLIC_PATHS = ["/auth", "/search", "/"];

export default function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  const isPublicPath = PUBLIC_PATHS.some((path) => {
    if (path === "/") {
      return pathname === path;
    }
    return pathname.startsWith(path);
  });

  const swrKey = isPublicPath ? null : "/api/user/me";

  const { data: user, error } = useSWR<User, AxiosError>(swrKey, fetcher, {
    revalidateOnFocus: false, // tránh gọi API liên tục khi đổi tab)
    shouldRetryOnError: false, // nếu lỗi 401, không thử lại
    revalidateIfStale: false,
  });

  useEffect(() => {
    if (error?.response?.status === 401) {
      router.push("/auth");
    }
  }, [error, router]);

  return (
    <AuthContext.Provider
      value={{
        user: user || null,
        error: error || null,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
