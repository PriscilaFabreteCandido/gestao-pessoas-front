

import { Outlet } from "react-router-dom";
import { Header } from "../components/ui/header/Header";

export const RootLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1 bg-white overflow-auto transition-all px-4 md:px-15">
        <Outlet />
      </div>
    </div>
  );
};
