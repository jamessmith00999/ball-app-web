import { createBrowserRouter } from "react-router-dom";

import AuthLayout from "@/pages/auth/_layout";
import MainLayout from "@/layouts/MainLayout";
import ForgotPassword from "@/pages/auth/forgot-password";
import SignIn from "@/pages/auth/sign-in";
import SignUp from "@/pages/auth/sign-up";
import SportsHome from "@/pages/sports-home";
import TradingHome from "@/pages/trading-home";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <SportsHome />,
      },
      {
        path: "sports",
        element: <SportsHome />,
      },
      {
        path: "trading",
        element: <TradingHome />,
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "sign-in",
        element: <SignIn />,
      },
      {
        path: "sign-up",
        element: <SignUp />,
      },
      {
        path: "forgot-password",
        element: <ForgotPassword />,
      },
    ],
  },
]);
