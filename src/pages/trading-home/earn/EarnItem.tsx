import clsx from "clsx";
import { useAtomValue } from "jotai";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import type { EarnItem as EarnItemType } from "@/api/futures/earn/types";
import { currentLanguageAtom } from "@/contexts/language";

const EarnItem = ({ item }: { item: EarnItemType }) => {
  const { t } = useTranslation();
  const currentLanguage = useAtomValue(currentLanguageAtom);

  const minAndMaxRateRule = useMemo(() => {
    // Get all duration_days and yield_rates across all user levels
    const allDurationDays: number[] = [];
    const allYieldRates: number[] = [];
    if (item.yield_rate_rules_by_levels) {
      Object.values(item.yield_rate_rules_by_levels).forEach((levelRules) => {
        Object.entries(levelRules).forEach(([durationDays, yieldRate]) => {
          allDurationDays.push(Number(durationDays));
          allYieldRates.push(Number(yieldRate));
        });
      });
    }

    if (allDurationDays.length === 0) {
      return null;
    }

    return {
      minRateRule: {
        duration_days: Math.min(...allDurationDays),
        yield_rate: Math.min(...allYieldRates),
      },
      maxRateRule: {
        duration_days: Math.max(...allDurationDays),
        yield_rate: Math.max(...allYieldRates),
      },
    };
  }, [item.yield_rate_rules_by_levels]);

  const levelRange: string = useMemo(() => {
    if (item.minimum_user_level === item.max_user_level) {
      return item.minimum_user_level_symbol?.[currentLanguage.code] || "";
    }
    return (
      (item.minimum_user_level_symbol?.[currentLanguage.code] || "") +
      "~" +
      (item.max_user_level_symbol?.[currentLanguage.code] || "")
    );
  }, [
    item.minimum_user_level,
    item.max_user_level,
    item.minimum_user_level_symbol,
    item.max_user_level_symbol,
    currentLanguage.code,
  ]);

  return (
    <Link
      to={`/earn/${item.uid}`}
      className="h-[138px] w-full rounded-xl overflow-hidden relative block hover:opacity-90 transition-opacity"
    >
      {/* Background Image */}
      <img
        src={item.background_image_url}
        alt=""
        className="w-full h-[138px] absolute top-0 left-0 -z-10 object-cover"
      />

      {/* Badge */}
      <div
        className={clsx(
          "absolute right-0 top-0",
          "flex justify-center items-center",
          "h-[26px] px-3",
          "rounded-bl-xl rounded-tr-xl",
          item.is_trial ? "bg-tints-2" : "bg-background-tertiary"
        )}
      >
        <span
          className={clsx(
            "text-[10px] font-medium",
            item.is_trial ? "text-inverse-primary" : "text-text-secondary"
          )}
        >
          {item.is_trial ? t("earn.trialFundExclusive") : levelRange || ""}
        </span>
      </div>

      {/* Content */}
      <div className="h-full flex items-center justify-start gap-9 px-[22px]">
        <div className="flex flex-col items-center w-[114px] gap-[6px]">
          <img
            src={item.icon_url}
            alt={item.name_translate[currentLanguage.code]}
            className="w-[50px] h-[50px]"
          />
          <span className="text-sm text-center font-bold text-white max-w-[100px] line-clamp-2">
            {item.name_translate[currentLanguage.code]}
          </span>
        </div>

        <div className="flex flex-col gap-4">
          <div>
            <span className="text-sm font-bold text-trade-green-default">
              {minAndMaxRateRule?.minRateRule?.yield_rate ?? "-"}%~
              {minAndMaxRateRule?.maxRateRule?.yield_rate ?? "-"}%
            </span>
            <p className="text-xs text-text-tertiary">{t("earn.yieldRate")}</p>
          </div>
          <div className="flex gap-1 items-center">
            <span className="text-[10px] text-text-tertiary">
              {t("earn.period")}:
            </span>
            <span className="text-xs font-bold text-white">
              {minAndMaxRateRule?.minRateRule.duration_days ?? "-"}D-
              {minAndMaxRateRule?.maxRateRule.duration_days ?? "-"}D
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default EarnItem;
