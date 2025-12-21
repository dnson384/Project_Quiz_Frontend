"use client";
import HeaderAdmin from "@/presentation/components/layout/admin/HeaderAdmin";
import SideMenu from "@/presentation/components/layout/sideMenu";
import useDashboardAdmin from "@/presentation/hooks/Dashboard/useDashboardAdmin";

export default function DashboardAdmin() {
  const { user, users, handleRoleChagne } = useDashboardAdmin();
  return (
    <>
      {user?.role === "ADMIN" && (
        <>
          <HeaderAdmin />
          <div className="flex">
            <SideMenu />

            <section className="mx-auto mt-3 flex flex-col gap-8">
              {users && (
                <>
                  <h3 className="text-2xl font-bold">Tài khoản người dùng</h3>
                  <div className="w-6xl mx-auto flex flex-col gap-2">
                    {users.map((user) => {
                      return (
                        <div key={user.id} className="w-full">
                          <div className="px-6 py-4 border border-gray-300 rounded-xl">
                            {/* Email */}
                            <div className="flex items-center justify-between">
                              <h4 className="text-lg font-semibold">
                                {user.email}
                              </h4>
                              <div className="relative">
                                <select
                                  name="role"
                                  value={user.role}
                                  className="appearance-none w-30 bg-indigo-50 border border-gray-200 px-4 py-2 rounded-md cursor-pointer focus:outline-none"
                                  onChange={(e) => handleRoleChagne(e, user.id)}
                                >
                                  <option value="STUDENT">Học sinh</option>
                                  <option value="TEACHER">Giáo viên</option>
                                  <option value="ADMIN">Admin</option>
                                </select>
                                <div className="absolute top-3 right-3">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="18"
                                    height="18"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      fill="none"
                                      stroke="#374151"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth="1.5"
                                      d="m6 9l6 6l6-6"
                                    />
                                  </svg>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </>
              )}
            </section>
          </div>
        </>
      )}
    </>
  );
}
