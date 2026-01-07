// This file configuration is same as
// the deposit and withdrawal system definition in the backend.
import type { WithdrawAsset } from "@/config/type";

export const NATIVE_ASSET: WithdrawAsset = {
  code: "NATIVE",
  value: 3,
  name: "native",
};

export const USDC_ASSET: WithdrawAsset = {
  code: "USDC",
  value: 1,
  name: "usdc",
};

export const USDT_ASSET: WithdrawAsset = {
  code: "USDT",
  value: 2,
  name: "usdt",
};
