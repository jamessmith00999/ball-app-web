import { atom, useAtom } from "jotai";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { storage } from "@/lib/storage";
import { STORAGE_KEY } from "@/constants/storage-key";

export const selectedAppAtom = atom<"trading" | "sports">("sports");
export const isSwitchingAppAtom = atom(false);

export const useInitSelectedApp = () => {
  const [, setSelectedApp] = useAtom(selectedAppAtom);
  const navigate = useNavigate();

  useEffect(() => {
    const app = storage.get(STORAGE_KEY.CURRENT_APP);
    if (!app || app === "sports") {
      setSelectedApp("sports");
      navigate("/sports");
    } else {
      setSelectedApp("trading");
      navigate("/trading");
    }
  }, [navigate, setSelectedApp]);
};
