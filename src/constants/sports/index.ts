import type { TFunction } from "i18next";

import type { InPlayMatchesType } from "@/api/sports/inplay";

import { HOUR_IN_MS } from "./time";

export interface TabProps {
  key: string;
  value: string;
}

export const MATCH_MARKET_TYPE_MAPPING: Record<string, string> = {
  "1X2": "1X2",
  Handicap: "HDP",
  "Under/Over": "O/U",
  Corners: "CORNERS",
};

export const MARKET_ID_UI_MAPPING: Record<number, string | undefined> = {
  4: "Handicap",
  499: "Handicap",
  8: "Correct Score",
  621: "Correct Score",
  2624: "Correct Score",
  2625: "Correct Score",
  2626: "Correct Score",
};

export const DEFAULT_CURRENCY = "USDT";
export const DEFAULT_CURRENCY_ID = 2;
export const DEBUGGER = false;

export const SAMPLE_VIDEO_URL =
  "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";

export const generateSoonTabs: (t: TFunction) => Array<
  TabProps & {
    fromTime: number;
    toTime: number;
  }
> = (t: TFunction) => {
  const now = Date.now();
  return [
    // {
    //   key: "1 Hour",
    //   value: t("inPlay.oneHour"),
    //   fromTime: now,
    //   toTime: now + 1 * HOUR_IN_MS,
    // },
    // {
    //   key: "3 Hours",
    //   value: t("inPlay.nHours", { count: 3 }),
    //   fromTime: now + 1 * HOUR_IN_MS,
    //   toTime: now + 3 * HOUR_IN_MS,
    // },
    // {
    //   key: "6 Hours",
    //   value: t("inPlay.nHours", { count: 6 }),
    //   fromTime: now + 3 * HOUR_IN_MS,
    //   toTime: now + 6 * HOUR_IN_MS,
    // },
    {
      key: "12 Hours",
      value: t("inPlay.nHours", { count: 12 }),
      fromTime: now,
      toTime: now + 12 * HOUR_IN_MS,
    },
    {
      key: "24 Hours",
      value: t("inPlay.nHours", { count: 24 }),
      fromTime: now + 12 * HOUR_IN_MS,
      toTime: now + 24 * HOUR_IN_MS,
    },
  ];
};

export const MAX_BET_SLIP_LIMIT = 10;
export const MAX_VERIFICATION_CODE_LENGTH = 6;

export const ORDER_BOOK_DATA_ROW = {
  Price: 0,
  Size: 0,
};

export const SHOW_MORE_EARN_NEW_HISTORY_COUNT = 3;

export const IN_PLAY_CATEGORY: InPlayMatchesType[] = [
  "1x2",
  "hdp",
  "o/u",
  "other",
];
