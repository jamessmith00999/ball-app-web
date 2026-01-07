import { Bell, HelpCircle, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import AppSwitcher from "@/components/AppSwitcher";
import LanguageSelector from "@/components/LanguageSelector";
import { useSession } from "@/lib/auth-client";

const NavBar = () => {
  const navigate = useNavigate();
  const { data: session } = useSession();
  const isSignedIn = !!session?.user;

  const handleProfileClick = () => {
    if (!isSignedIn) {
      navigate("/auth/sign-in");
      return;
    }
    navigate("/personal/personal-center");
  };

  return (
    <div className="w-full flex items-center h-[44px] px-3">
      {/* left side */}
      <div className="flex-1 flex justify-start items-center">
        <button
          type="button"
          onClick={handleProfileClick}
          className="hover:opacity-80 transition-opacity"
        >
          <User className="w-6 h-6 text-white" />
        </button>
      </div>

      {/* center side */}
      <div className="flex-grow flex justify-center items-center">
        <AppSwitcher defaultApp="trading" />
      </div>

      {/* right side */}
      <div className="flex-1 flex gap-4 justify-end items-center">
        <Link
          to="/personal/question"
          className="hover:opacity-80 transition-opacity"
        >
          <HelpCircle className="w-6 h-6 text-white" />
        </Link>
        {isSignedIn ? (
          <Link
            to="/personal/notification"
            className="relative hover:opacity-80 transition-opacity"
          >
            <Bell className="w-6 h-6 text-white" />
          </Link>
        ) : (
          <LanguageSelector />
        )}
      </div>
    </div>
  );
};

export default NavBar;
