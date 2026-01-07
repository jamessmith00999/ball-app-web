export interface WithdrawAsset {
  code: string;
  value: number;
  name: string;
}

export interface Token {
  name: string;
  networkId: number;
  networkName: string;
  symbol: string;
  icon: string;
}

export interface Config {
  betterAuthUrl: string;
  futuresApiUrl: string;
  betterAuth: {
    scheme: string;
    storagePrefix: string;
  };
  depositTokens: Array<Token>;
  withdrawAsset: WithdrawAsset;
  comingSoonSportIds: Array<number>;
  enableFuture: boolean;
}
