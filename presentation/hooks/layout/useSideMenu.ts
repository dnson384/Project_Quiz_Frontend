import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

export default function useSideMenu() {
  const pathname = usePathname();
  const router = useRouter();
  const [selectedPage, setSelectedPage] = useState<string>(
    pathname.toString().split("/")[1] === "ADMIN"
      ? pathname.toString().split("/")[2]
      : pathname.toString().split("/")[1]
  );

  useEffect(() => {
    setSelectedPage(pathname.toString().split("/")[1]);
  }, [pathname]);

  const handleMenuItem = (event: React.MouseEvent<HTMLDivElement>) => {
    const target = event.currentTarget as HTMLDivElement;
    if (selectedPage !== "admin") {
      router.push(`/${target.id}`);
    }
  };

  return {
    selectedPage,
    handleMenuItem,
  };
}
