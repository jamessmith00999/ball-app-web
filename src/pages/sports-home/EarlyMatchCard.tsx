import clsx from "clsx";
import dayjs from "dayjs";
import { ChevronRight, Trophy } from "lucide-react";
import { Link } from "react-router-dom";

interface Match {
  match_id: string;
  tournament: {
    name: string;
  };
  match_time: number;
  home: {
    name: string;
    logo: string | null;
  };
  away: {
    name: string;
    logo: string | null;
  };
  open_odd_num: number;
  odds: {
    odd_id: string;
    market_id: string;
    outcomes: {
      id: string;
      display_name: string;
      value: string;
    }[];
  }[];
}

interface OddsButtonProps {
  handicap: string;
  odds: string;
  selected?: boolean;
  onClick?: () => void;
}

const OddsButton = ({ handicap, odds, selected = false, onClick }: OddsButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx(
        "flex-1 flex justify-between items-center rounded-[5px] h-[26px] px-[6px]",
        "transition-colors duration-200",
        selected ? "bg-primary" : "bg-theme-gray-light hover:bg-theme-gray-2/30"
      )}
    >
      <span
        className={clsx(
          "text-xs font-bold",
          selected ? "text-black" : "text-white"
        )}
      >
        {handicap}
      </span>
      <span
        className={clsx(
          "text-xs font-bold",
          selected ? "text-black" : "text-white"
        )}
      >
        {odds}
      </span>
    </button>
  );
};

interface EarlyMatchCardProps {
  match: Match;
}

const EarlyMatchCard = ({ match }: EarlyMatchCardProps) => {
  const firstOutcome = match.odds?.[0]?.outcomes[0];
  const secondOutcome = match.odds?.[0]?.outcomes[1];
  const thirdOutcome = match.odds?.[0]?.outcomes[2];

  if (!match.odds) {
    return null;
  }

  return (
    <Link
      to={`/match-detail/${match.match_id}`}
      className="block"
    >
      <div className="bg-theme-gray rounded-xl p-3 w-[250px] hover:bg-theme-gray/80 transition-colors">
        {/* Header */}
        <div className="flex flex-col gap-1">
          <div className="flex justify-between items-center">
            <span
              className="text-white text-xs font-semibold max-w-[150px] truncate"
            >
              {match.tournament.name}
            </span>
            <div
              className={clsx(
                "bg-theme-yellow/20 rounded px-[3px] h-[16px]",
                "flex justify-center items-center gap-[2px]"
              )}
            >
              <span className="text-[10px] text-theme-yellow font-medium">
                {match.open_odd_num}
              </span>
              <ChevronRight className="w-2 h-2 text-theme-yellow" />
            </div>
          </div>
          <span className="text-theme-gray-2 text-[10px]">
            {dayjs(match.match_time * 1000).format("DD MMM YYYY")} |{" "}
            {dayjs(match.match_time * 1000).format("HH:mm")}
          </span>
        </div>

        {/* Teams */}
        <div className="flex justify-around items-center my-3">
          <div className="flex flex-col items-center flex-1">
            {match.home.logo ? (
              <img
                src={match.home.logo}
                alt={match.home.name}
                className="w-8 h-8 object-contain"
              />
            ) : (
              <Trophy className="w-8 h-8 text-theme-gray-2" />
            )}
            <span
              className="text-white mt-2 text-[10px] font-semibold text-center truncate max-w-[70px]"
            >
              {match.home.name}
            </span>
          </div>

          <span className="text-white text-base font-semibold">VS</span>

          <div className="flex flex-col items-center flex-1">
            {match.away.logo ? (
              <img
                src={match.away.logo}
                alt={match.away.name}
                className="w-8 h-8 object-contain"
              />
            ) : (
              <Trophy className="w-8 h-8 text-theme-gray-2" />
            )}
            <span
              className="text-white mt-2 text-[10px] font-semibold text-center truncate max-w-[70px]"
            >
              {match.away.name}
            </span>
          </div>
        </div>

        {/* Odds */}
        <div className="flex justify-between gap-[14px]">
          {firstOutcome && (
            <OddsButton
              handicap={firstOutcome.display_name}
              odds={firstOutcome.value}
            />
          )}
          {secondOutcome && (
            <OddsButton
              handicap={secondOutcome.display_name}
              odds={secondOutcome.value}
            />
          )}
          {thirdOutcome && (
            <OddsButton
              handicap={thirdOutcome.display_name}
              odds={thirdOutcome.value}
            />
          )}
        </div>
      </div>
    </Link>
  );
};

export default EarlyMatchCard;
