import { atom, useAtom, useAtomValue } from "jotai";
import { useEffect } from "react";
import useSWR from "swr";

import { getUserInfo } from "@/api/futures/user";
import type { UserInfo } from "@/api/futures/user/types";
import { useSession } from "@/lib/auth-client";

export const tradingUserAtom = atom<UserInfo | null>(null);
export const refreshTradingUserSignalAtom = atom(0);

export const useInitTradingUser = () => {
  const [, setUser] = useAtom(tradingUserAtom);
  const { data: session } = useSession();
  const sessionId = session?.session.token ?? null;
  const refreshSignal = useAtomValue(refreshTradingUserSignalAtom);
  const { data: userData, mutate: mutateTradingUser } = useSWR(
    ["getTradingUserInfo", sessionId ?? "guest"],
    async () => {
      if (!sessionId) return null;
      console.log("fetching trading user info...");
      const res = await getUserInfo();
      return res.data;
    }
  );
  useEffect(() => {
    if (userData) {
      setUser(userData.user);
    }
  }, [setUser, userData]);

  useEffect(() => {
    if (!refreshSignal || !sessionId) return;
    void mutateTradingUser();
  }, [mutateTradingUser, refreshSignal, sessionId]);
};
