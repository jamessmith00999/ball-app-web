import clsx from "clsx";
import { Bookmark, ChevronRight, Trophy } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useSession } from "@/lib/auth-client";

interface Match {
  match_id: string;
  tournament: {
    name: string;
    name_translate?: Record<string, string>;
  };
  match_time: number;
  period?: string;
  home: {
    name: string;
    name_translate?: Record<string, string>;
    logo: string | null;
    score?: number;
  };
  away: {
    name: string;
    name_translate?: Record<string, string>;
    logo: string | null;
    score?: number;
  };
  open_odd_num: number;
  is_favorite?: boolean;
  odds?: {
    odd_id: string;
    market_id: string;
    outcomes: {
      id: string;
      display_name: string;
      display_name_translate?: Record<string, string>;
      value: string;
    }[];
  }[];
}

interface OddsButtonProps {
  handicap: string;
  odds: string;
  selected?: boolean;
  onClick?: (e: React.MouseEvent) => void;
}

const OddsButton = ({
  handicap,
  odds,
  selected = false,
  onClick,
}: OddsButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx(
        "flex-1 flex justify-between items-center rounded-[5px] h-[32px] px-2",
        "transition-colors duration-200",
        selected
          ? "bg-primary"
          : "bg-theme-gray-light hover:bg-theme-gray-2/30"
      )}
    >
      <span
        className={clsx("text-xs font-bold", selected ? "text-black" : "text-white")}
      >
        {handicap}
      </span>
      <span
        className={clsx("text-xs font-bold", selected ? "text-black" : "text-white")}
      >
        {odds}
      </span>
    </button>
  );
};

interface InPlayCardProps {
  match: Match;
  onRefreshBookmark?: () => void;
}

const InPlayCard = ({ match, onRefreshBookmark }: InPlayCardProps) => {
  const navigate = useNavigate();
  const { data: session } = useSession();
  const isSignedIn = !!session?.user;

  const [isBookmarked, setIsBookmarked] = useState(match.is_favorite ?? false);

  const firstOutcome = match.odds?.[0]?.outcomes[0];
  const secondOutcome = match.odds?.[0]?.outcomes[1];
  const thirdOutcome = match.odds?.[0]?.outcomes[2];

  if (!match.odds) {
    return null;
  }

  const getMatchScore = () => {
    const homeScore = match.home.score ?? 0;
    const awayScore = match.away.score ?? 0;
    return `${homeScore} - ${awayScore}`;
  };

  const handleBookmarkClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isSignedIn) {
      navigate("/auth/sign-in");
      return;
    }

    setIsBookmarked((prev) => !prev);
    onRefreshBookmark?.();
  };

  const homeName = match.home.name_translate?.en ?? match.home.name;
  const awayName = match.away.name_translate?.en ?? match.away.name;
  const tournamentName =
    match.tournament.name_translate?.en ?? match.tournament.name;

  return (
    <Link
      to={`/match-detail/${match.match_id}`}
      className="block"
    >
      <div className="bg-theme-gray rounded-xl p-3 flex flex-col gap-5 hover:bg-theme-gray/80 transition-colors">
        {/* Header */}
        <div className="flex justify-between items-center gap-[10px]">
          <div className="flex-1 flex items-center gap-2">
            {/* Combined team icons */}
            <div className="relative w-8 h-5">
              {match.home.logo ? (
                <img
                  src={match.home.logo}
                  alt=""
                  className="w-5 h-5 absolute left-0 top-0 rounded-full object-contain bg-theme-gray-light"
                />
              ) : (
                <div className="w-5 h-5 absolute left-0 top-0 rounded-full bg-theme-gray-light flex items-center justify-center">
                  <Trophy className="w-3 h-3 text-theme-gray-2" />
                </div>
              )}
              {match.away.logo ? (
                <img
                  src={match.away.logo}
                  alt=""
                  className="w-5 h-5 absolute left-3 top-0 rounded-full object-contain bg-theme-gray-light"
                />
              ) : (
                <div className="w-5 h-5 absolute left-3 top-0 rounded-full bg-theme-gray-light flex items-center justify-center">
                  <Trophy className="w-3 h-3 text-theme-gray-2" />
                </div>
              )}
            </div>

            <span className="flex-1 text-white text-xs font-semibold truncate">
              {tournamentName}
            </span>
          </div>

          <div className="flex items-center gap-[6px]">
            {/* Match time label - simplified */}
            <span className="text-[#F55571] text-xs font-semibold">LIVE</span>
            <div className="bg-theme-yellow/20 rounded-[2px] px-[3px] h-[16px] flex justify-center items-center gap-[2px]">
              <span className="text-[10px] text-theme-yellow font-medium">
                {match.open_odd_num}
              </span>
              <ChevronRight className="w-2 h-2 text-theme-yellow" />
            </div>
          </div>
        </div>

        {/* Match Info */}
        <div className="flex gap-2 items-center">
          {/* Left part - Bookmark + Home team */}
          <div className="flex justify-between items-center gap-1 flex-1">
            <button
              type="button"
              onClick={handleBookmarkClick}
              className="flex items-center hover:opacity-80 transition-opacity"
            >
              <Bookmark
                className={clsx(
                  "w-[22px] h-[22px]",
                  isBookmarked
                    ? "text-primary fill-primary"
                    : "text-theme-gray-2"
                )}
              />
            </button>

            {/* Home info */}
            <div className="flex justify-end items-center flex-1 gap-2">
              <span className="text-white text-right text-sm font-semibold flex-1 truncate">
                {homeName}
              </span>
              {match.home.logo ? (
                <img
                  src={match.home.logo}
                  alt=""
                  className="w-5 h-5 object-contain"
                />
              ) : (
                <Trophy className="w-5 h-5 text-theme-gray-2" />
              )}
            </div>
          </div>

          {/* Middle part - Score */}
          <div
            className={clsx(
              "h-[28px] px-2 flex justify-center items-center",
              "bg-[#555B69] rounded-[6px] flex-grow-0"
            )}
          >
            <span className="text-white text-base font-semibold">
              {getMatchScore()}
            </span>
          </div>

          {/* Right part - Away team */}
          <div className="flex justify-start items-center gap-2 flex-1">
            {match.away.logo ? (
              <img
                src={match.away.logo}
                alt=""
                className="w-5 h-5 object-contain"
              />
            ) : (
              <Trophy className="w-5 h-5 text-theme-gray-2" />
            )}
            <span className="text-white text-sm font-semibold flex-1 truncate">
              {awayName}
            </span>
          </div>
        </div>

        {/* Odds */}
        <div className="flex gap-[18px]">
          {firstOutcome && (
            <OddsButton
              handicap={
                firstOutcome.display_name_translate?.en ??
                firstOutcome.display_name
              }
              odds={firstOutcome.value}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                if (!isSignedIn) {
                  navigate("/auth/sign-in");
                }
              }}
            />
          )}
          {secondOutcome && (
            <OddsButton
              handicap={
                secondOutcome.display_name_translate?.en ??
                secondOutcome.display_name
              }
              odds={secondOutcome.value}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                if (!isSignedIn) {
                  navigate("/auth/sign-in");
                }
              }}
            />
          )}
          {thirdOutcome && thirdOutcome.display_name.length <= 2 && (
            <OddsButton
              handicap={
                thirdOutcome.display_name_translate?.en ??
                thirdOutcome.display_name
              }
              odds={thirdOutcome.value}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                if (!isSignedIn) {
                  navigate("/auth/sign-in");
                }
              }}
            />
          )}
        </div>
      </div>
    </Link>
  );
};

export default InPlayCard;
export type { Match };
