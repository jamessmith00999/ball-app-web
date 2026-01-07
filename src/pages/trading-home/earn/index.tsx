import { useAtom, useAtomValue } from "jotai";
import { useTranslation } from "react-i18next";

import { earnListAtom, trialFundAtom } from "@/contexts/trading/earn";
import { tradingUserAtom } from "@/contexts/trading/user";

import EarnItem from "./EarnItem";

const Earn = () => {
  const { t } = useTranslation();
  const [earnList] = useAtom(earnListAtom);
  const [trialFund] = useAtom(trialFundAtom);
  const tradingUser = useAtomValue(tradingUserAtom);

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold text-white">
        {t("home.dashboard.earn")}
      </h2>

      <div className="flex flex-col gap-4 mt-4">
        {!tradingUser?.trial_credit_used &&
          trialFund?.map((item) => <EarnItem key={item.uid} item={item} />)}
        {earnList?.map((item) => <EarnItem key={item.uid} item={item} />)}
      </div>
    </div>
  );
};

export default Earn;
