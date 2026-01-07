import { atom, useAtom } from "jotai";
import { useEffect } from "react";
import useSWR from "swr";

import { getBanners } from "@/api/futures/campaigns";
import type { BannerItem } from "@/api/futures/campaigns/types";

export const tradingBannersAtom = atom<BannerItem[]>([]);
export const refreshBannersAtom = atom<number>(0);

export function useInitBanners() {
  const [, setBanners] = useAtom(tradingBannersAtom);
  const [refreshBanners] = useAtom(refreshBannersAtom);

  const { data: bannersData, mutate: mutateBanners } = useSWR(
    ["getTradingBanners"],
    async () => {
      console.log("fetching trading banners...");
      const res = await getBanners();
      return res.data;
    }
  );

  useEffect(() => {
    if (bannersData) {
      setBanners(bannersData.filter((item) => item.is_active));
    }
  }, [bannersData, setBanners]);

  useEffect(() => {
    if (!refreshBanners) return;
    void mutateBanners();
  }, [mutateBanners, refreshBanners]);
}
