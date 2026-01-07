import { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import type { Match } from "@/components/sports/InPlayCard";

import EarlyCards from "./EarlyCards";
import HeroCarousel from "./HeroCarousel";
import InPlayCards, { type Pagination } from "./InPlayCards";
import InPlayTabs, { type InPlayMatchesType } from "./InPlayTabs";
import NavBar from "./NavBar";
import SoonSection from "./SoonSection";

// Demo data for in-play matches
const DEMO_INPLAY_MATCHES: Pagination<Match> = {
  data: [
    {
      match_id: "101",
      tournament: { name: "Premier League" },
      match_time: Math.floor(Date.now() / 1000),
      period: "1H",
      home: { name: "Chelsea", logo: null, score: 1 },
      away: { name: "Arsenal", logo: null, score: 1 },
      open_odd_num: 8,
      is_favorite: false,
      odds: [
        {
          odd_id: "1",
          market_id: "1",
          outcomes: [
            { id: "1", display_name: "1", value: "2.40" },
            { id: "2", display_name: "X", value: "3.10" },
            { id: "3", display_name: "2", value: "2.90" },
          ],
        },
      ],
    },
    {
      match_id: "102",
      tournament: { name: "La Liga" },
      match_time: Math.floor(Date.now() / 1000),
      period: "2H",
      home: { name: "Atletico Madrid", logo: null, score: 2 },
      away: { name: "Sevilla", logo: null, score: 0 },
      open_odd_num: 12,
      is_favorite: true,
      odds: [
        {
          odd_id: "2",
          market_id: "1",
          outcomes: [
            { id: "1", display_name: "1", value: "1.20" },
            { id: "2", display_name: "X", value: "5.50" },
            { id: "3", display_name: "2", value: "12.00" },
          ],
        },
      ],
    },
  ],
  total: 2,
  page: 1,
  page_size: 10,
};

// Demo data for soon matches
const DEMO_SOON_MATCHES: Pagination<Match> = {
  data: [
    {
      match_id: "201",
      tournament: { name: "Bundesliga" },
      match_time: Math.floor(Date.now() / 1000) + 7200,
      home: { name: "Bayern Munich", logo: null, score: 0 },
      away: { name: "Borussia Dortmund", logo: null, score: 0 },
      open_odd_num: 15,
      is_favorite: false,
      odds: [
        {
          odd_id: "3",
          market_id: "1",
          outcomes: [
            { id: "1", display_name: "1", value: "1.75" },
            { id: "2", display_name: "X", value: "3.80" },
            { id: "3", display_name: "2", value: "4.20" },
          ],
        },
      ],
    },
    {
      match_id: "202",
      tournament: { name: "Ligue 1" },
      match_time: Math.floor(Date.now() / 1000) + 10800,
      home: { name: "PSG", logo: null, score: 0 },
      away: { name: "Monaco", logo: null, score: 0 },
      open_odd_num: 10,
      is_favorite: false,
      odds: [
        {
          odd_id: "4",
          market_id: "1",
          outcomes: [
            { id: "1", display_name: "1", value: "1.45" },
            { id: "2", display_name: "X", value: "4.50" },
            { id: "3", display_name: "2", value: "6.00" },
          ],
        },
      ],
    },
  ],
  total: 2,
  page: 1,
  page_size: 10,
};

const SportsHome = () => {
  const { t } = useTranslation();

  const [inPlayMatchesType, setInPlayMatchesType] =
    useState<InPlayMatchesType>("1x2");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  // Demo state - in real app, these would come from API/atoms
  const [inPlayMatches] = useState<Pagination<Match> | null>(
    DEMO_INPLAY_MATCHES
  );
  const [soonMatches] = useState<Pagination<Match> | null>(DEMO_SOON_MATCHES);

  // Check if in-play is empty
  const isInPlayEmpty = useMemo(() => {
    return !inPlayMatches || inPlayMatches.data.length === 0;
  }, [inPlayMatches]);

  // Simulate refresh
  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsRefreshing(false);
  }, []);

  // Handle infinite scroll
  const handleScroll = useCallback(
    (e: React.UIEvent<HTMLDivElement>) => {
      const target = e.currentTarget;
      const isCloseToBottom =
        target.scrollHeight - target.scrollTop <= target.clientHeight + 20;

      if (isCloseToBottom && !isLoadingMore) {
        setIsLoadingMore(true);
        // Simulate loading more
        setTimeout(() => {
          setIsLoadingMore(false);
        }, 1500);
      }
    },
    [isLoadingMore]
  );

  // Refresh on mount
  useEffect(() => {
    handleRefresh();
  }, [handleRefresh]);

  const handleRefreshBookmark = () => {
    // In real app, this would refresh the bookmark data
    console.log("Refreshing bookmarks...");
  };

  return (
    <div className="min-h-screen bg-app-background">
      <div
        className="max-w-[800px] mx-auto h-screen overflow-y-auto"
        onScroll={handleScroll}
      >
        {/* Nav bar */}
        <div className="pt-4">
          <NavBar />
        </div>

        {/* Hero Carousel */}
        <HeroCarousel />

        {/* Early Cards */}
        <EarlyCards />

        {/* In Play Section - shown when there are in-play matches */}
        {!isInPlayEmpty && (
          <>
            <div className="bg-app-background px-3">
              <h2 className="text-white text-base font-semibold my-3">
                {t("home.inPlay")}
              </h2>
              <InPlayTabs
                className="pb-4"
                inplayType={inPlayMatchesType}
                onInplayTypeChange={setInPlayMatchesType}
              />
            </div>

            <div className="px-3">
              <InPlayCards
                isLoadingMore={isLoadingMore}
                isRefreshing={isRefreshing}
                matches={inPlayMatches}
                onRefreshBookmark={handleRefreshBookmark}
              />
            </div>
          </>
        )}

        {/* Soon Section - shown when there are no in-play matches */}
        {isInPlayEmpty && (
          <>
            <div className="bg-app-background px-3">
              <h2 className="text-white text-base font-semibold my-3">
                {t("inPlay.soon")}
              </h2>
              <InPlayTabs
                className="pb-4"
                inplayType={inPlayMatchesType}
                onInplayTypeChange={setInPlayMatchesType}
              />
            </div>

            <div className="px-3">
              <SoonSection
                isLoadingMore={isLoadingMore}
                isRefreshing={isRefreshing}
                soonMatches={soonMatches}
                onRefreshBookmark={handleRefreshBookmark}
              />
            </div>
          </>
        )}

        {/* Bottom padding for scroll */}
        <div className="h-[100px]" />
      </div>
    </div>
  );
};

export default SportsHome;
