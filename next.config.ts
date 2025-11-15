import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "8000", // nhớ thêm nếu backend chạy port khác
        pathname: "/static/**", // pattern cho tất cả ảnh static
      },
    ],
  },
};

export default nextConfig;
