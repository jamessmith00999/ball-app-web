import type {
  ApiResponse,
  BaseModal,
  Pagination,
  Translation,
} from "@/api/base-api-type";
import type { Match } from "@/api/sports/matches/types";

/**
 * Core order interface
 */
export interface Order extends BaseModal {
  user_uid: string;
  amount: number;
  currency: string;
  status_id: number;
  status_code: string;
  match_id: number;
  odd_id: number;
  market_id: number;
  outcome_id: number;
  hash: string;
  profit: number;
  area_id: number;
  commission: number;
  match: Match;
}

/**
 * Order request interface for creating orders
 */
export interface OrderRequest {
  order_type_id: number; // 1: common, 2: outright
  amount: number;
  currency: string;
  match_id: number; // if order_type_id is 1, match_id is required. 0 means no match
  odd_id: number;
  market_id: number;
  outcome_id: number;
  outcome_value: number;
}

/**
 * Create orders request interface
 */
export interface CreateOrdersRequest {
  order_list: OrderRequest[];
}

/**
 * Create orders response type
 */
export type CreateOrdersResponse = ApiResponse<Order[]>;

/**
 * Detailed order information with match snapshots and translations
 */
export interface OrderDetail extends Order {
  order_type_id: number;
  outcome_value: number;
  match: Match; // the snapshot match when user place the order
  final_match: Match; // realtime match, sync with db(real status with realtime scores)
  max_win: number;
  canceled_at: number;
  canceled_by_rule_uid: number;
  match_status_name: Translation;
  home_team_name: Translation;
  away_team_name: Translation;
  tournament_name: Translation;
  market_name: Translation;
  displayed_odd: Translation;
  bet_item_name: Translation;
  place_order_time: number;
  match_start_time: number;
  betting_period_name: Translation;
  betting_time_displayed: Translation;
  betting_score: number[];
  final_score: number[];
  match_result: number[];
  area_type_name: Translation;
}

/**
 * Parameters for getting orders
 */
export interface GetOrdersParams {
  status_id: number;
  page: number;
  page_size: number;
}

/**
 * Get orders response type
 */
export type GetOrdersResponse = ApiResponse<Pagination<OrderDetail>>;

/**
 * Parameters for getting orders by refer code
 */
export interface GetOrdersByReferCodeParams {
  page: number;
  page_size: number;
  refer_code: string;
}

/**
 * Get orders by refer code response type
 */
export type GetOrdersByReferCodeResponse = ApiResponse<Pagination<OrderDetail>>;

/**
 * Parameters for getting orders by clerk ID
 */
export interface GetOrdersByClerkIdParams {
  page: number;
  page_size: number;
  user_uid: string;
}

/**
 * User information interface
 */
export interface UserInfo {
  clerk_id: string;
  image_url: string;
  name: string;
}

/**
 * Orders by clerk ID data interface
 */
export interface OrdersByClerkIdData {
  orders: Pagination<OrderDetail>;
  user: UserInfo;
}

/**
 * Get orders by clerk ID response type
 */
export type GetOrdersByClerkIdResponse = ApiResponse<OrdersByClerkIdData>;
