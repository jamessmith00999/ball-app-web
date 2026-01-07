import { atom } from "jotai";

export interface AlertState {
  isVisible: boolean;
  message: string;
  type: "success" | "error" | "warning" | "info";
}

export const alertAtom = atom<AlertState>({
  isVisible: false,
  message: "",
  type: "info",
});

export interface TradeConfirmState {
  isVisible: boolean;
  title: string;
  description: string;
  descriptionPosition?: "left" | "center" | "right";
  cancelButton?: {
    text: string;
    onClick: () => void;
  };
  confirmButton?: {
    text: string;
    onClick: () => void;
  };
}

export const tradeConfirmAtom = atom<TradeConfirmState>({
  isVisible: false,
  title: "",
  description: "",
  descriptionPosition: "left",
});

export interface TradeAlertState {
  isVisible: boolean;
  title: string;
  description: string;
  descriptionPosition?: "left" | "center" | "right";
  button?: {
    text: string;
    onClick: () => void;
  };
}

export const tradeAlertAtom = atom<TradeAlertState>({
  isVisible: false,
  title: "",
  description: "",
  descriptionPosition: "left",
});
