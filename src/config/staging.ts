import {
  UsdtBep20Img,
  UsdtErc20Img,
  UsdtTrc20Img,
} from "@/assets/images/sports/coin";
import { USDC_ASSET } from "@/constants/assets";
import {
  BSC_MAINNET_NETWORK_ID,
  BSC_TESTNET_NETWORK_ID,
  ETHEREUM_MAINNET_NETWORK_ID,
  TRX_NETWORK_ID,
  TRX_SHASTA_NETWORK_ID,
} from "@/constants/network";

import type { Config } from "./type";

const config: Config = {
  sportsApiBaseUrl: "https://sports-api.fomoins.com",
  betterAuthUrl: "https://auth-api.fomoins.com",
  futuresApiUrl: "https://ex-api.fomoins.com",
  wssUrl: "wss://ball-ws-paid.workinjp.workers.dev/ws",
  officialWebsiteUrl: "https://www.fomoins.com",
  betterAuth: {
    scheme: "mewp",
    storagePrefix: "mewp-auth",
  },
  depositTokens: [
    {
      name: "BNB Smart Chain(Testnet)",
      networkId: BSC_TESTNET_NETWORK_ID,
      networkName: "BEP20",
      symbol: "USDT",
      icon: UsdtBep20Img,
    },
    {
      name: "TRON(Shasta)",
      networkId: TRX_SHASTA_NETWORK_ID,
      networkName: "TRC20",
      symbol: "USDT",
      icon: UsdtTrc20Img,
    },
    {
      name: "BNB Smart Chain(BEP20)",
      networkId: BSC_MAINNET_NETWORK_ID,
      networkName: "BEP20",
      symbol: "USDT",
      icon: UsdtBep20Img,
    },
    {
      name: "Ethereum(ERC20)",
      networkId: ETHEREUM_MAINNET_NETWORK_ID,
      networkName: "ERC20",
      symbol: "USDT",
      icon: UsdtErc20Img,
    },
    {
      name: "TRON(TRC20)",
      networkId: TRX_NETWORK_ID,
      networkName: "TRC20",
      symbol: "USDT",
      icon: UsdtTrc20Img,
    },
  ],
  withdrawAsset: USDC_ASSET,
  comingSoonSportIds: [
    2, // basketball
  ],
  enableFuture: false,
};

export default config;
