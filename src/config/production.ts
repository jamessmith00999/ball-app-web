import { UsdtBep20Img, UsdtTrc20Img } from "@/assets/images/sports/coin";
import { USDT_ASSET } from "@/constants/assets";
import { BSC_MAINNET_NETWORK_ID, TRX_NETWORK_ID } from "@/constants/network";

import type { Config } from "./type";

const config: Config = {
  sportsApiBaseUrl: "https://sports-api.bestxx.com",
  betterAuthUrl: "https://auth-api.bestxx.com",
  futuresApiUrl: "https://ex-api.bestxx.com",
  wssUrl: "wss://ball-ws-paid.bestxx.workers.dev/ws",
  officialWebsiteUrl: "https://www.bestxx.com",
  betterAuth: {
    scheme: "bestxx",
    storagePrefix: "bestxx-auth",
  },
  depositTokens: [
    {
      name: "BNB Smart Chain(BEP20)",
      networkId: BSC_MAINNET_NETWORK_ID,
      networkName: "BEP20",
      symbol: "USDT",
      icon: UsdtBep20Img,
    },
    {
      name: "TRON(TRC20)",
      networkId: TRX_NETWORK_ID,
      networkName: "TRC20",
      symbol: "USDT",
      icon: UsdtTrc20Img,
    },
  ],
  withdrawAsset: USDT_ASSET,
  comingSoonSportIds: [
    2, // basketball
  ],
  enableFuture: false,
};

export default config;
