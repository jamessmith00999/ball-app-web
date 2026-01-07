import type { ApiResponse, Pagination, Translation } from "@/api/base-api-type";

export interface Pair {
  id: number;
  uid: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
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
  max_leverage: number;
  supported_leverages: number[] | null;
  sort_order: number;
  price_day_high: string;
  price_day_low: string;
  trading_volume_day: string;
  trading_volume_usd_day: string;
}

export interface Position {
  id: number;
  uid: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  base_currency: string;
  quote_currency: string;
  currency_pair: string;
  pair_uid: string;
  pair: Pair;
  position_effect: "long" | "short";
  user_id: string;
  status: string;
  size: string;
  leverage: string;
  latest_leverage: string;
  liquidation_price: string;
  entry_price: string;
  stop_loss_price: string;
  take_profit_price: string;
  unrealized_pnl: string;
  margin_used: string;
  maintenance_margin_amount: string;
  exit_size: string;
  exit_price: string;
  realized_pnl: string;
  exit_fee: string;
  liquidated: boolean;
  liquidated_at: string;
  liquidated_fee: string;
  liquidation_sell_status: string;
  liquidation_sell_order_id: string;
  liquidation_sell_price: string;
  liquidation_sell_completed_at: string;
  liquidation_sell_amount: string;
  liquidation_sell_realized_pnl: string;
  liquidation_sell_retries: number;
  triggered_stop_loss: boolean;
  triggered_take_profit: boolean;
  triggered_order_id: string;
}

export interface GetPositionsParams {
  currency_pair?: string;
  start_date?: string;
  end_date?: string;
  status?: "open" | "closed";
}

export type GetPositionsResponse = ApiResponse<Pagination<Position>>;

export interface UpdatePositionRequest {
  type: "leverage_change" | "margin_change";
  position_uid: string;
  quote_currency?: string;
  base_currency?: string;
  position_effect?: "long" | "short";
  // if is positive, it is increase, if is negative, it is decrease
  margin_change?: string;
  new_leverage?: number;
  new_take_profit_price?: string;
  new_stop_loss_price?: string;
}

export type UpdatePositionResponse = ApiResponse<Position>;

export type GetPositionLeverageResponse = ApiResponse<Array<number>>;

export interface UpdatePositionTpslRequest {
  type: "take_profit_stop_loss_change";
  position_uid: string;
  new_take_profit_price: string;
  new_stop_loss_price: string;
}

export type UpdatePositionTpslResponse = ApiResponse<Position>;
