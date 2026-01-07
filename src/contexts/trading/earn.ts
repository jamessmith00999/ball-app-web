import { atom, useAtom, useAtomValue } from "jotai";
import { useEffect } from "react";
import useSWR from "swr";

import { getEarnList, getMyFundList, getTrialFund } from "@/api/futures/earn";
import type { EarnItem, MyFundListData } from "@/api/futures/earn/types";
import { PAGE } from "@/constants/sports/page";
import { useSession } from "@/lib/auth-client";

export const earnListAtom = atom<EarnItem[] | null>(null);
export const earnListWithDisabledAtom = atom<EarnItem[] | null>(null);
export const trialFundAtom = atom<EarnItem[] | null>(null);
export const trialFundWithDisabledAtom = atom<EarnItem[] | null>(null);
export const refreshEarnListAtom = atom<number>(0);

// key is userId
export const myFundListAtom = atom<Record<string, MyFundListData> | null>(null);
export const myFundPageAtom = atom<number>(PAGE);
export const refreshMyFundListAtom = atom<number>(0);

export const useMyFundList = () => {
  const { data: session } = useSession();
  const userId = session?.user.id || null;
  const myFundListMap = useAtomValue(myFundListAtom);
  const myFundList = userId ? myFundListMap?.[userId] : null;
  return myFundList;
};

function useInitEarn() {
  const { data: session } = useSession();
  const isSignedIn = !!session?.user;
  const sessionId = session?.session.token;
  const [, setEarnList] = useAtom(earnListAtom);
  const [, setEarnListWithDisabled] = useAtom(earnListWithDisabledAtom);
  const [, setTrialFund] = useAtom(trialFundAtom);
  const [, setTrialFundWithDisabled] = useAtom(trialFundWithDisabledAtom);
  const [refreshEarnList] = useAtom(refreshEarnListAtom);
  const [, setMyFundList] = useAtom(myFundListAtom);
  const [refreshMyFundList] = useAtom(refreshMyFundListAtom);

  const myFundPage = useAtomValue(myFundPageAtom);
  const userId = session?.user.id || null;

  const { data: earnListData, mutate: mutateEarnList } = useSWR(
    ["getEarnList"],
    async () => {
      console.log("fetching earn list...");
      const res = await getEarnList({ enabled: true });
      return res.data;
    }
  );

  const { data: earnListWithDisabledData, mutate: mutateEarnListWithDisabled } =
    useSWR(["getEarnListWithDisabled"], async () => {
      console.log("fetching earn list with disabled...");
      const res = await getEarnList({});
      return res.data;
    });

  const { data: trialFundData, mutate: mutateTrialFund } = useSWR(
    ["getTrialFund"],
    async () => {
      console.log("fetching trial fund...");
      const res = await getTrialFund({ enabled: true });
      return res.data;
    }
  );

  const {
    data: trialFundWithDisabledData,
    mutate: mutateTrialFundWithDisabled,
  } = useSWR(["getTrialFundWithDisabled"], async () => {
    console.log("fetching trial fund with disabled...");
    const res = await getTrialFund({});
    return res.data;
  });

  const { data: myFundListData, mutate: mutateMyFundList } = useSWR(
    isSignedIn && sessionId ? ["getMyFundList", sessionId, myFundPage] : null,
    async () => {
      console.log("fetching my fund list...");
      const res = await getMyFundList();
      return res.data;
    }
  );

  useEffect(() => {
    if (earnListData) {
      // Sort by created_at descending (newest first)
      const sortedList = [...earnListData].sort(
        (a, b) => b.created_at - a.created_at
      );
      setEarnList(sortedList);
    }
  }, [earnListData, setEarnList]);

  useEffect(() => {
    if (earnListWithDisabledData) {
      setEarnListWithDisabled(earnListWithDisabledData);
    }
  }, [earnListWithDisabledData, setEarnListWithDisabled]);

  useEffect(() => {
    if (trialFundData) {
      setTrialFund(trialFundData);
    }
  }, [trialFundData, setTrialFund]);

  useEffect(() => {
    if (trialFundWithDisabledData) {
      setTrialFundWithDisabled(trialFundWithDisabledData);
    }
  }, [trialFundWithDisabledData, setTrialFundWithDisabled]);

  useEffect(() => {
    if (!refreshEarnList) return;
    void mutateEarnList();
    void mutateEarnListWithDisabled();
    void mutateTrialFund();
    void mutateTrialFundWithDisabled();
  }, [
    mutateEarnList,
    refreshEarnList,
    mutateEarnListWithDisabled,
    mutateTrialFund,
    mutateTrialFundWithDisabled,
  ]);

  useEffect(() => {
    if (myFundListData && userId) {
      setMyFundList((prev) => ({ ...prev, [userId]: myFundListData }));
    }
  }, [myFundListData, setMyFundList, userId]);

  useEffect(() => {
    if (!refreshMyFundList || !sessionId || !isSignedIn) return;
    void mutateMyFundList();
  }, [mutateMyFundList, refreshMyFundList, sessionId, isSignedIn]);
}

export default useInitEarn;
