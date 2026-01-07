import clsx from "clsx";
import { Bell, ChevronDown, HelpCircle } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import AppSwitcher from "@/components/AppSwitcher";
import LanguageSelector from "@/components/LanguageSelector";
import { STORAGE_KEY } from "@/constants/storage-key";
import { useSession } from "@/lib/auth-client";
import { storage } from "@/lib/storage";

type Area = {
  name: string;
};

const DEFAULT_AREAS = ["Europe", "HongKong", "Indonesia", "Malaysia"];

const NavBar = () => {
  const { data: session } = useSession();
  const isSignedIn = !!session?.user;

  return (
    <div className="w-full flex items-center h-[44px] px-3">
      {/* left side */}
      <div className="flex-1 flex justify-start items-center">
        <AreaSection />
      </div>

      {/* center side */}
      <div className="flex-grow flex justify-center items-center">
        <AppSwitcher defaultApp="sports" />
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

const AreaSection = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedArea, setSelectedArea] = useState<Area | null>(null);

  const areas = useMemo(() => {
    const areaMap = t("area", { returnObjects: true }) as
      | Record<string, string>
      | string;
    if (!areaMap || typeof areaMap === "string") {
      return DEFAULT_AREAS.map((name) => ({ name }));
    }
    return Object.keys(areaMap).map((name) => ({ name }));
  }, [t]);

  useEffect(() => {
    const storedArea = storage.getJSON<Area>(STORAGE_KEY.CURRENT_AREA);
    if (storedArea?.name) {
      setSelectedArea(storedArea);
      return;
    }
    if (areas.length > 0) {
      setSelectedArea(areas[0]);
    }
  }, [areas]);

  if (!selectedArea) return null;

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 text-white text-sm hover:opacity-80 transition-opacity"
      >
        <span>{t(`area.${selectedArea.name}`)}</span>
        <ChevronDown className="w-4 h-4" />
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className="absolute top-[32px] left-0 w-[140px] bg-[#1A1A20] rounded-lg border border-[#2A2A35] z-50 shadow-lg overflow-hidden">
            {areas.map((area) => (
              <button
                key={area.name}
                type="button"
                onClick={() => {
                  setSelectedArea(area);
                  storage.setJSON(STORAGE_KEY.CURRENT_AREA, area);
                  setIsOpen(false);
                }}
                className={clsx(
                  "w-full py-2 px-3 text-left text-sm hover:bg-[#2A2A35] transition-colors",
                  selectedArea.name === area.name
                    ? "text-primary"
                    : "text-white"
                )}
              >
                {t(`area.${area.name}`)}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default NavBar;
