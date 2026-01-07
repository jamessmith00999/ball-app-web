import { useTranslation } from "react-i18next";

import InPlayCard, { type Match } from "@/components/sports/InPlayCard";
import type { Pagination } from "./InPlayCards";

interface SoonSectionProps {
  isLoadingMore?: boolean;
  isRefreshing?: boolean;
  soonMatches: Pagination<Match> | null;
  onRefreshBookmark?: () => void;
}

const SoonSection = ({
  isLoadingMore = false,
  isRefreshing = false,
  soonMatches,
  onRefreshBookmark,
}: SoonSectionProps) => {
  const { t } = useTranslation();
  const isEmpty = soonMatches?.data.length === 0;

  return (
    <div>
      {isEmpty && (
        <div className="min-h-[240px] flex items-center justify-center">
          <span className="text-theme-gray-2 text-sm">{t("noData.noData")}</span>
        </div>
      )}

      {!isEmpty && soonMatches && (
        <div className="flex flex-col gap-4">
          {soonMatches.data.map((match, index) => (
            <InPlayCard
              key={match.match_id ?? index}
              match={match}
              onRefreshBookmark={onRefreshBookmark}
            />
          ))}
        </div>
      )}

      {!isEmpty &&
        isLoadingMore &&
        !isRefreshing &&
        soonMatches?.data.length !== soonMatches?.total && (
          <div className="py-4 flex justify-center items-center">
            <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        )}

      {/* Bottom padding */}
      <div className="h-[50px] w-full" />
    </div>
  );
};

export default SoonSection;
