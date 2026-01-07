import type { ApiResponse, BaseModal, Translation } from "@/api/base-api-type";

export interface ExchangePair extends BaseModal {
  symbol: string;
  name: string;
  name_translate: Translation;
  base_asset: string;
  quote_asset: string;
  currency_pair: string;
  contract_size: string;
  tick_size: string;
  icon: string;
  enabled: boolean;
  min_leverage: number;
  max_leverage: number;
  common_leverages: number[];
  total_supply: string;
  sort_order: number;
  price_day_open: string;
  price_day_high: string;
  price_day_low: string;
  trading_volume_day: string;
  trading_volume_usd_day: string;
  price_change_day: string;
  market_cap: string;
  price: string;
}

export type ExchangePairResponse = ApiResponse<ExchangePair[]>;

export interface BasicKline {
  end_time: string;
  end_time_ts: number;
  close: number;
  high: number;
  low: number;
  open: number;
  volume: number;
  symbol: string;
  price_change_day: number;
  trading_volume_usd_day: number;
}

export interface KLine extends BasicKline {
  id: number;
  uid: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export type KLineResponse = ApiResponse<KLine[]>;

export interface Language {
  code: string;
  name: string;
  nativeName: string;
}

export interface OrderTypes {
  limit: number;
  market: number;
  stop_limit: number;
  stop_market: number;
  trailing_stop_limit: number;
  trailing_stop_market: number;
}

export interface OrderSides {
  close: number;
  open: number;
}

export interface TimeInForce {
  FOK: number;
  GOOD_FOR_DAY: number;
  GTC: number;
  IOC: number;
}

export interface SystemConfig extends BaseModal {
  exit_fee_rate: string;
  maintenance_margin_rate: string;
  liquidation_fee_rate: string;
  post_need_review: boolean;
  minimum_deposit_amount: string;
  max_withdraw_amount: string;
  minimum_withdraw_amount: string;
  ball_withdraw_fee_rate: string;
  auto_approve_withdraw_threshold: string;
  minimum_reserved_balance: string;
  trial_credit_amount: string;
}

export interface ConstantData {
  exitFeeRate: string;
  maintenanceMarginRate: string;
  liquidationFeeRate: string;
  institutionPledgeAmount: string;
  systemConfig: SystemConfig;
  orderTypes: OrderTypes;
  orderSides: OrderSides;
  timeInForce: TimeInForce;
  orderStatuses: string[];
  positionStatuses: string[];
  positionEffects: string[];
  marginModes: string[];
  liquidationSellStatuses: string[];
  transferTypes: string[];
  transferStatuses: string[];
  transactionTypes: string[];
  defaultLanguage: string;
  language: Language[];
}

export type ConstantResponse = ApiResponse<ConstantData>;
