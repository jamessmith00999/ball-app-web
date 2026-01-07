import clsx from "clsx";
import { useAtom } from "jotai";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";

import { selectedAppAtom } from "@/contexts/app-switcher";
import { useSession } from "@/lib/auth-client";

import AppTabItem from "./AppTabItem";

// Sports tab icons
import BetSlipImg from "@/assets/images/sports/tab/bet-slip.svg";
import HistoryActiveImg from "@/assets/images/sports/tab/history-active.svg";
import HistoryImg from "@/assets/images/sports/tab/history.svg";
import InPlayActiveImg from "@/assets/images/sports/tab/in-play-active.svg";
import InPlayImg from "@/assets/images/sports/tab/in-play.svg";
import MeActiveImg from "@/assets/images/sports/tab/me-active.svg";
import MeImg from "@/assets/images/sports/tab/me.svg";
import SportsHomeActiveImg from "@/assets/images/sports/tab/sports-home-active.svg";
import SportsHomeImg from "@/assets/images/sports/tab/sports-home.svg";
import TradeHomeActiveImg from "@/assets/images/sports/tab/trade-home-active.svg";
import TradeHomeImg from "@/assets/images/sports/tab/trade-home.svg";
import EarnActiveImg from "@/assets/images/sports/tab/earn-active.svg";
import EarnImg from "@/assets/images/sports/tab/earn.svg";
import RewardActiveImg from "@/assets/images/sports/tab/reward-active.svg";
import RewardImg from "@/assets/images/sports/tab/reward.svg";

// Trading tab icons
import AssetsActiveImg from "@/assets/images/trading/tabs/assets-active.svg";
import AssetsImg from "@/assets/images/trading/tabs/assets.svg";

const AppTabBar = () => {
  const [selectedApp] = useAtom(selectedAppAtom);
  const location = useLocation();

  const showSportsTabBar = useMemo(() => {
    return (
      ["/", "/sports", "/in-play", "/history", "/me", "/me/my-favorites"].includes(
        location.pathname
      ) ||
      location.pathname.startsWith("/match-detail/") ||
      location.pathname.startsWith("/in-play/early-detail/") ||
      location.pathname.startsWith("/in-play/outrights/")
    );
  }, [location.pathname]);

  const showTradingTabBar = useMemo(() => {
    return [
      "/trading",
      "/reward",
      "/task",
      "/earn",
      "/future",
      "/forum",
      "/my-assets",
      "/market",
    ].includes(location.pathname);
  }, [location.pathname]);

  const memorizedAppTabBar = useMemo(() => {
    if (selectedApp === "sports") {
      return <AppSportsTabBar />;
    }
    return <AppTradingTabBar />;
  }, [selectedApp]);

  if (!showSportsTabBar && !showTradingTabBar) {
    return null;
  }

  return (
    <div
      className={clsx(
        "fixed left-0 bottom-0 right-0 z-50",
        "bg-app-background"
      )}
      style={{
        paddingBottom: "env(safe-area-inset-bottom)",
      }}
    >
      {/* Gradient line */}
      <div
        className="h-[1px] w-full mb-[10px]"
        style={{
          background:
            "linear-gradient(90deg, rgba(63, 63, 63, 0) 0%, rgba(62, 62, 62, 0.22) 10.24%, rgba(62, 62, 62, 0.7) 23.01%, #3E3E3E 51.81%, rgba(62, 62, 62, 0.7) 76.02%, rgba(62, 62, 62, 0.22) 92.19%, rgba(63, 63, 63, 0) 100%)",
        }}
      />
      {memorizedAppTabBar}
    </div>
  );
};

const AppSportsTabBar = () => {
  const location = useLocation();
  const { t } = useTranslation();
  const { data: session } = useSession();
  const isSignedIn = !!session?.user;
  const navigate = useNavigate();

  const onPressSignInWhenNotSignedIn = !isSignedIn
    ? () => {
        navigate("/auth/sign-in");
      }
    : undefined;

  return (
    <div className="flex flex-row items-center h-12">
      <AppTabItem
        icon={SportsHomeImg}
        activeIcon={SportsHomeActiveImg}
        label={t("appTab.home")}
        href="/"
        isActive={location.pathname === "/" || location.pathname === "/sports"}
      />
      <AppTabItem
        icon={InPlayImg}
        activeIcon={InPlayActiveImg}
        label={t("appTab.inPlay")}
        href="/in-play"
        isActive={location.pathname === "/in-play"}
      />
      <AppTabItem
        icon={BetSlipImg}
        activeIcon={BetSlipImg}
        label={t("appTab.betSlip")}
        isActive={false}
        onPress={() => {
          if (!isSignedIn) {
            navigate("/auth/sign-in");
            return;
          }
          // TODO: Open bet slip modal
        }}
        large
        disabledHref={!isSignedIn}
      />
      <AppTabItem
        icon={HistoryImg}
        activeIcon={HistoryActiveImg}
        label={t("appTab.history")}
        href="/history"
        isActive={location.pathname === "/history"}
        onPress={onPressSignInWhenNotSignedIn}
        disabledHref={!isSignedIn}
      />
      <AppTabItem
        icon={MeImg}
        activeIcon={MeActiveImg}
        label={t("appTab.me")}
        href="/me"
        isActive={location.pathname === "/me"}
        onPress={onPressSignInWhenNotSignedIn}
        disabledHref={!isSignedIn}
      />
    </div>
  );
};

const AppTradingTabBar = () => {
  const location = useLocation();
  const { t } = useTranslation();
  const { data: session } = useSession();
  const isSignedIn = !!session?.user;
  const navigate = useNavigate();

  const onPressSignInWhenNotSignedIn = !isSignedIn
    ? () => {
        navigate("/auth/sign-in");
      }
    : undefined;

  return (
    <div className="flex flex-row items-center h-12">
      <AppTabItem
        icon={TradeHomeImg}
        activeIcon={TradeHomeActiveImg}
        label={t("appTab.home")}
        href="/trading"
        isActive={location.pathname === "/trading"}
        activeColor={"#FFD400"}
      />
      <AppTabItem
        icon={EarnImg}
        activeIcon={EarnActiveImg}
        label={t("appTab.earn")}
        href="/earn"
        isActive={location.pathname === "/earn"}
        activeColor={"#FFD400"}
      />
      <AppTabItem
        icon={RewardImg}
        activeIcon={RewardActiveImg}
        label={t("appTab.reward")}
        href="/reward"
        isActive={location.pathname === "/reward"}
        activeColor={"#FFD400"}
      />
      <AppTabItem
        icon={AssetsImg}
        activeIcon={AssetsActiveImg}
        label={t("appTab.assets")}
        href="/my-assets"
        isActive={location.pathname === "/my-assets"}
        onPress={onPressSignInWhenNotSignedIn}
        disabledHref={!isSignedIn}
        activeColor={"#FFD400"}
      />
    </div>
  );
};

export default AppTabBar;
