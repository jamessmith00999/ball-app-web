import clsx from "clsx";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";

type AppType = "trading" | "sports";

interface AppSwitcherProps {
  disabled?: boolean;
  defaultApp?: AppType;
}

const AppSwitcher = ({ disabled, defaultApp = "sports" }: AppSwitcherProps) => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const currentLanguage = i18n.language as "en" | "zht";
  const selectedApp = useMemo<AppType>(() => {
    if (location.pathname.includes("/trading")) {
      return "trading";
    }
    if (location.pathname.includes("/sports") || location.pathname === "/") {
      return "sports";
    }
    return defaultApp;
  }, [defaultApp, location.pathname]);

  const onPressAppSwitcherItem = (app: AppType) => {
    if (selectedApp === app) {
      return;
    }
    if (app === "trading") {
      navigate("/trading");
    } else {
      navigate("/sports");
    }
  };

  return (
    <div
      className={clsx(
        "h-[32px] bg-background-tertiary rounded-full p-[2px]",
        "flex justify-center items-center gap-1",
        disabled && "pointer-events-none"
      )}
    >
      <AppSwitcherItem
        title={t("appSwitcher.trading")}
        isSelected={selectedApp === "trading"}
        onPress={() => onPressAppSwitcherItem("trading")}
        language={currentLanguage}
      />
      <AppSwitcherItem
        title={t("appSwitcher.sports")}
        isSelected={selectedApp === "sports"}
        onPress={() => onPressAppSwitcherItem("sports")}
        language={currentLanguage}
      />
    </div>
  );
};

interface AppSwitcherItemProps {
  title: string;
  isSelected: boolean;
  onPress: () => void;
  language: "en" | "zht";
}

const AppSwitcherItem = ({
  title,
  isSelected,
  onPress,
  language,
}: AppSwitcherItemProps) => {
  return (
    <button
      type="button"
      onClick={onPress}
      className={clsx(
        "flex justify-center items-center",
        "h-full rounded-full transition-colors",
        language === "en" ? "px-2" : "px-5",
        isSelected && "bg-app-background"
      )}
    >
      <span
        className={clsx(
          "text-sm font-semibold",
          isSelected ? "text-text-secondary" : "text-text-tertiary"
        )}
      >
        {title}
      </span>
    </button>
  );
};

export default AppSwitcher;
