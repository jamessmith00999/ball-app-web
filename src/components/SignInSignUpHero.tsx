import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import { SignInSignUpHeroImg } from "@/assets/images";

const SignInSignUpHero = () => {
  const { t } = useTranslation();

  return (
    <div className="px-4 py-6">
      <div
        className="relative rounded-xl overflow-hidden p-6"
        style={{
          background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)",
        }}
      >
        {/* Background image */}
        {SignInSignUpHeroImg && (
          <img
            src={SignInSignUpHeroImg}
            alt=""
            className="absolute right-0 top-0 h-full w-auto opacity-30"
          />
        )}

        <div className="relative z-10">
          <h2 className="text-white text-xl font-bold mb-2">
            {t("home.signInSignUpHero.title")}
          </h2>
          <p className="text-theme-gray-2 text-sm mb-6">
            {t("home.signInSignUpHero.description")}
          </p>

          <div className="flex gap-3">
            <Link
              to="/auth/sign-in"
              className="flex-1 h-10 flex items-center justify-center bg-primary text-app-background font-semibold rounded-full hover:opacity-90 transition-opacity"
            >
              {t("auth.signIn")}
            </Link>
            <Link
              to="/auth/sign-up"
              className="flex-1 h-10 flex items-center justify-center bg-background-tertiary text-white font-semibold rounded-full hover:opacity-90 transition-opacity"
            >
              {t("auth.signUp")}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInSignUpHero;
