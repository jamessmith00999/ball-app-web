import { Outlet } from "react-router-dom";

import AppTabBar from "@/components/AppTabBar";

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-app-background">
      {/* Add padding bottom to account for the fixed tab bar */}
      <div className="pb-16">
        <Outlet />
      </div>
      <AppTabBar />
    </div>
  );
};

export default MainLayout;
