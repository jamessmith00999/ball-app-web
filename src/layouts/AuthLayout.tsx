import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="min-h-screen bg-app-background">
      <Outlet />
    </div>
  );
};

export default AuthLayout;
