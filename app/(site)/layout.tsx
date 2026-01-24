import "./globals.css";
import { Quicksand } from "next/font/google";
import AuthProvider from "@/presentation/context/authContext";
import { MenuProvider } from "@/presentation/context/menuContext";

const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"], // Chỉ định các trọng số bạn cần
  variable: "--font-quicksand", // Đặt tên biến CSS
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={quicksand.className}>
        <AuthProvider>
          <MenuProvider>{children}</MenuProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
