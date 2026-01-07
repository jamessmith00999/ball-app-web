import { Storage } from "@/lib/storage";

export const STORAGE_KEY = {
  LANG: "lang",
  CURRENT_APP: "CURRENT_APP",
  SIGN_IN_EMAIL: "SIGN_IN_EMAIL",
  SIGN_IN_PHONE: "SIGN_IN_PHONE",
  SIGN_IN_COUNTRY_DIAL_CODE: "SIGN_IN_COUNTRY_DIAL_CODE",
  // sports
  CURRENT_AREA: "CURRENT_AREA",
  CURRENT_TIMEZONE: "CURRENT_TIMEZONE",
  SELECTED_API_URL: "SELECTED_API_URL",
  COLLAPSE_PREFIX: "COLLAPSE_PREFIX",
  BET_SLIP: "BET_SLIP",

  // trading
  IS_MY_ASSETS_EYE_OPEN: "IS_MY_ASSETS_EYE_OPEN",
  FUTURE_LEVERAGE: "FUTURE_LEVERAGE",
  RECENT_EMOJI_LIST: "RECENT_EMOJI_LIST",

  // app update
  JUST_UPDATED: "JUST_UPDATED",
};

export type FutureLeverageStorage = Array<{
  currency_pair: string;
  leverage: number[];
}>;

export async function getFutureLeverageFromStorage(currencyPair: string) {
  const storageData = await Storage.getItem(STORAGE_KEY.FUTURE_LEVERAGE);
  if (!storageData) return null;
  const futureLeverage = JSON.parse(storageData) as FutureLeverageStorage;
  const find = futureLeverage.find(
    (item) => item.currency_pair === currencyPair
  );
  if (!find) return null;
  return find;
}

export async function setFutureLeverageToStorage(
  currencyPair: string,
  leverage: number[]
) {
  const storageData = await Storage.getItem(STORAGE_KEY.FUTURE_LEVERAGE);
  if (!storageData) {
    const newFutureLeverage: FutureLeverageStorage = [];
    newFutureLeverage.push({ currency_pair: currencyPair, leverage });
    await Storage.setItem(
      STORAGE_KEY.FUTURE_LEVERAGE,
      JSON.stringify(newFutureLeverage)
    );
  } else {
    const futureLeverage = JSON.parse(storageData) as FutureLeverageStorage;
    // remove if exist future leverage
    const removedIfExistFutureLeverage = futureLeverage.filter(
      (item) => item.currency_pair !== currencyPair
    );
    removedIfExistFutureLeverage.push({
      currency_pair: currencyPair,
      leverage,
    });
    await Storage.setItem(
      STORAGE_KEY.FUTURE_LEVERAGE,
      JSON.stringify(removedIfExistFutureLeverage)
    );
  }
}
