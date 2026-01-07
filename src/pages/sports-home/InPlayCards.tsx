import { useTranslation } from "react-i18next";

import InPlayCard, { type Match } from "@/components/sports/InPlayCard";

interface Pagination<T> {
  data: T[];
  total: number;
  page: number;
  page_size: number;
}

interface InPlayCardsProps {
  isLoadingMore: boolean;
  isRefreshing: boolean;
  matches: Pagination<Match> | null;
  onRefreshBookmark?: () => void;
}

const InPlayCards = ({
  isLoadingMore,
  isRefreshing,
  matches,
  onRefreshBookmark,
}: InPlayCardsProps) => {
  const { t } = useTranslation();
  const isEmpty = matches?.data?.length === 0;

  return (
    <div>
      {(!matches || isEmpty) && (
        <div className="min-h-[240px] flex-1 flex items-center justify-center">
          <span className="text-theme-gray-2 text-sm">{t("noData.noData")}</span>
        </div>
      )}

      {matches && !isEmpty && (
        <div className="flex flex-col gap-4">
          {matches.data.map((match, index) => (
            <InPlayCard
              key={match.match_id ?? index}
              match={match}
              onRefreshBookmark={onRefreshBookmark}
            />
          ))}
        </div>
      )}

      {matches &&
        !isEmpty &&
        isLoadingMore &&
        !isRefreshing &&
        matches.data.length !== matches.total && (
          <div className="py-4 flex justify-center items-center">
            <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        )}
    </div>
  );
};

export default InPlayCards;
export type { Pagination };
