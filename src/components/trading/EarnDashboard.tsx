import clsx from "clsx";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";

import { useMyFundList } from "@/contexts/trading/earn";
import toLocaleString from "@/utils/toLocaleString";

const EarnDashboard = () => {
  const { t } = useTranslation();
  const myFundList = useMyFundList();

  const incomingRevenueColor = useMemo(() => {
    if (!myFundList?.incoming_revenue || myFundList?.incoming_revenue === "0") {
      return "text-trade-green-default";
    } else if (Number(myFundList?.incoming_revenue) > 0) {
      return "text-trade-green-default";
    } else {
      return "text-trade-red-default";
    }
  }, [myFundList?.incoming_revenue]);

  const formatDashboardNumber = (value?: string, withSign = true) => {
    if (!value) {
      return "-";
    } else {
      const sign = "+";
      return `${withSign ? sign : ""}$${toLocaleString(value, 4)}`;
    }
  };

  const incomingRevenue = formatDashboardNumber(
    myFundList?.incoming_revenue,
    true
  );
  const totalEarnings = formatDashboardNumber(
    myFundList?.total_earn_holding,
    false
  );

  return (
    <div className="mx-4 mt-4 rounded-xl bg-background-secondary px-4 py-2.5">
      <div className="flex items-center gap-5">
        <div className="flex-1 flex flex-col gap-1">
          <span className="text-xs text-[#D9DBE9]">
            {t("home.dashboard.currentEarnings")}
          </span>
          <span
            className={clsx(
              "text-xl leading-8 font-bold",
              incomingRevenueColor
            )}
          >
            {incomingRevenue}
          </span>
        </div>
        <div className="h-5 w-px rounded-full bg-white/40" />
        <div className="flex-1 flex flex-col gap-1">
          <span className="text-xs text-[#D9DBE9]">
            {t("home.dashboard.earnAssets")}
          </span>
          <span className="text-xl leading-8 font-bold text-white">
            {totalEarnings}
          </span>
        </div>
      </div>
    </div>
  );
};

export default EarnDashboard;
