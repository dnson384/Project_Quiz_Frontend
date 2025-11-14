"use client";
import Header from "@/components/header";
import SideMenu from "@/components/side_menu";
import { useAuth } from "@/context/authContext";

export default function Dashboard() {
  return (
    <>
      <Header />
      <SideMenu />
    </>
  );
}
