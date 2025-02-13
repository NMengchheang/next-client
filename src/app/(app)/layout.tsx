import Headbar from "@/components/dashboard_admin/Headbar";
import Sidebar from "@/components/dashboard_admin/Sidebar";
import type { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Dashboard layout for the app",
};

export default function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
        <div>
          <Headbar />
          <Sidebar />
          {children}
        </div>
        <Script src="https://cdn.jsdelivr.net/npm/flowbite@3.0.0/dist/flowbite.min.js" />
    </>
  );
}