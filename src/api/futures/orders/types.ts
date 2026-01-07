import type { ApiResponse, Pagination } from "@/api/base-api-type";
import type { Pair, Position } from "@/api/futures/positions/types";

export interface CreateOrderRequest {
  quote_currency: string;
  base_currency: string;
  size: string;
  balance: string;
  operation: "open" | "close";
  type: "market" | "limit";
  time_in_force: "GTC";
  limit_price: string;
  margin_mode: "isolated";
  leverage: number;
  position_effect: "long" | "short";
  take_profit_price?: string;
  stop_loss_price?: string;
}

export interface Order {
  id: number;
  uid: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  order_id: string;
  position_uid: number | null;
  position: Position;
  position_effect: "long" | "short";
  currency_pair: string;
  base_currency: string;
  pair_uid: number;
  pair: Pair;
  quote_currency: string;
  limit_price: string;
  operation: "open" | "close";
  size: string;
  time_in_force: "GTC";
  type: "limit" | "market";
  user_id: string;
  status_id: number;
  status: string;
  time_accepted: string;
  time_modified: string;
  message: string;
  remaining_size: string;
  balance: string;
  stop_order_activated: boolean;
  stop_loss_price: string;
  take_profit_price: string;
  margin_mode: "isolated";
  initial_margin_amount: string;
  maintanance_margin_amount: string;
  margin_amount: string;
  leverage: number;
  is_from_liquidation: boolean;
  close_exit_fee: string;
}

export type CreateOrderResponse = ApiResponse<Order>;

export interface CancelOrderRequest {
  order_uid: string;
  currency_pair: string;
}

export interface GetOrdersParams {
  page: number;
  page_size: number;
  currency_pair?: string;
  start_date_timestamp?: number;
  end_date_timestamp?: number;
  status?: Array<"accepted" | "partially_filled" | "filled">;
  type?: string;
}

export type GetOrdersResponse = ApiResponse<Pagination<Order>>;
