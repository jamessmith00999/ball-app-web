import { useInitBanners } from "@/contexts/trading/banner";
import useInitEarn from "@/contexts/trading/earn";
import { useInitTradingUser } from "@/contexts/trading/user";
import { useSession } from "@/lib/auth-client";

import SignInSignUpHero from "@/components/SignInSignUpHero";
import EarnDashboard from "@/components/trading/EarnDashboard";
import NavBar from "@/components/trading/NavBar";
import TradingBannerCarousel from "@/components/trading/TradingBannerCarousel";

import Earn from "./earn";
import JoinCommunity from "./join-community";
import Partners from "./partners";

const TradingHome = () => {
  const { data: session } = useSession();
  const isSignedIn = !!session?.user;

  // Initialize trading contexts
  useInitBanners();
  useInitEarn();
  useInitTradingUser();

  return (
    <div className="min-h-screen bg-app-background">
      <div className="max-w-[800px] mx-auto">
        {/* Nav bar */}
        <NavBar />

        {/* Banner Carousel - only show for signed in users */}
        {isSignedIn && <TradingBannerCarousel bannerType="Home" />}

        {/* Hero section for signed out users or Dashboard for signed in */}
        {isSignedIn ? <EarnDashboard /> : <SignInSignUpHero />}

        {/* Earn Section */}
        <Earn />

        {/* Partners Section */}
        <Partners />

        {/* Join Community Section */}
        <JoinCommunity />

        {/* Bottom padding */}
        <div className="h-[100px]" />
      </div>
    </div>
  );
};

export default TradingHome;
