import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import EarlyMatchCard from "./EarlyMatchCard";

// Demo match data
const DEMO_MATCHES = [
  {
    match_id: "1",
    tournament: {
      name: "Premier League",
    },
    match_time: Math.floor(Date.now() / 1000) + 3600, // 1 hour from now
    home: {
      name: "Manchester United",
      logo: null,
    },
    away: {
      name: "Liverpool",
      logo: null,
    },
    open_odd_num: 12,
    odds: [
      {
        odd_id: "1",
        market_id: "1",
        outcomes: [
          { id: "1", display_name: "1", value: "2.10" },
          { id: "2", display_name: "X", value: "3.40" },
          { id: "3", display_name: "2", value: "3.20" },
        ],
      },
    ],
  },
  {
    match_id: "2",
    tournament: {
      name: "La Liga",
    },
    match_time: Math.floor(Date.now() / 1000) + 7200, // 2 hours from now
    home: {
      name: "Real Madrid",
      logo: null,
    },
    away: {
      name: "Barcelona",
      logo: null,
    },
    open_odd_num: 15,
    odds: [
      {
        odd_id: "2",
        market_id: "1",
        outcomes: [
          { id: "1", display_name: "1", value: "2.50" },
          { id: "2", display_name: "X", value: "3.20" },
          { id: "3", display_name: "2", value: "2.80" },
        ],
      },
    ],
  },
  {
    match_id: "3",
    tournament: {
      name: "Serie A",
    },
    match_time: Math.floor(Date.now() / 1000) + 10800, // 3 hours from now
    home: {
      name: "AC Milan",
      logo: null,
    },
    away: {
      name: "Inter Milan",
      logo: null,
    },
    open_odd_num: 10,
    odds: [
      {
        odd_id: "3",
        market_id: "1",
        outcomes: [
          { id: "1", display_name: "1", value: "2.30" },
          { id: "2", display_name: "X", value: "3.10" },
          { id: "3", display_name: "2", value: "3.00" },
        ],
      },
    ],
  },
];

const EarlyCards = () => {
  const { t } = useTranslation();

  const isEmpty = DEMO_MATCHES.length === 0;

  return (
    <div className="mt-4">
      <div className="flex justify-between items-center px-3 mb-3">
        <h2 className="text-white text-base font-semibold">
          {t("home.early")}
        </h2>
        <Link
          to="/in-play"
          className="text-primary text-sm hover:opacity-80 transition-opacity"
        >
          {t("global.more")}
        </Link>
      </div>

      {isEmpty ? (
        <div className="min-h-[240px] flex items-center justify-center">
          <span className="text-theme-gray-2 text-sm">{t("noData.noData")}</span>
        </div>
      ) : (
        <div className="overflow-x-auto pl-3 scrollbar-hide">
          <div className="flex gap-3 pr-3">
            {DEMO_MATCHES.map((match) => (
              <EarlyMatchCard key={match.match_id} match={match} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default EarlyCards;
