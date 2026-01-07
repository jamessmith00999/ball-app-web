import type {
  ApiResponse,
  BaseModal,
  Pagination,
  Translation,
} from "@/api/base-api-type";
import type { UserLevel } from "@/api/futures/user/types";
import type { Match } from "@/api/sports/matches/types";

export interface EarnItem extends BaseModal {
  symbol: string;
  name_translate: Translation;
  description_translate: Translation;
  enabled: boolean;
  sort_order: number;
  is_trial?: boolean;
  minimum_user_level: string;
  minimum_user_level_data: UserLevel;
  minimum_user_level_symbol?: Translation;
  max_user_level: string;
  max_user_level_data: UserLevel;
  max_user_level_symbol: Translation;
  team_count_required_when_claim: number;
  early_redemption_management_fee: Record<number, string>;
  early_redemption_custody_fee: Record<number, string>;
  late_redemption_sales_fee: Record<number, string>;
  product_rules: {
    [key: string]: {
      min_amount: string;
      max_amount: string;
      max_times: number;
      valid_team_member: number;
    };
  };
  yield_rate_rules: {
    [key: string]: Record<string, string>;
  };
  yield_rate_rules_by_levels: {
    // user level uid -> duration_days -> yield_rate
    [key: string]: Record<string, string>;
  } | null;
  background_image_url: string;
  icon_url: string;
  allow_redeem: boolean;
  should_punish: boolean;
  max_yield_rate: string;
  min_yield_rate: string;
  ratings: Array<{
    rating_type: Translation;
    rating_value: number;
  }>;
  reject_reason?: string;
  review_status?: string;
  review_time?: number;
  reviewer_uid?: string;
  submiter_uid?: string;
  url?: string;
}

export type FundListResponse = ApiResponse<EarnItem[]>;

export type TrialFundResponse = ApiResponse<EarnItem[]>;

export type FundPurchaseStatus = "in_progress" | "ended";

export interface FundPurchaseRecord extends BaseModal {
  user_clerk_id: string;
  fund_uid: string;
  fund_symbol: string;
  amount: string;
  initial_amount: string;
  redeemed_amount: string;
  actual_redeemed_amount: string;
  total_redeem_penalty_fee: string;
  redeem_fee: string;
  custody_fee: string;
  management_fee: string;
  sales_fee: string;
  total_reward_amount: string;
  claimed: boolean;
  claimed_at: number;
  claimed_reward_amount: string;
  duration_days: number;
  matured_at: number;
  redeemed_at: number;
  yield_rate: string;
  status: FundPurchaseStatus;
  fund_product: EarnItem;
  redeemed_records: any | null;
  upline_commission: string;
  user_uid: string;
}

export interface FundSummary {
  fund_symbol: string;
  icon_url: string;
  background_url: string;
  total_revenue: string;
  amount: string;
  name: Translation;
  fund_product_uid: string;
}

export interface MyFundListData {
  purchase_records: FundPurchaseRecord[];
  summaries: FundSummary[];
  incoming_revenue: string;
  total_earn_holding: string;
}

export type MyFundListResponse = ApiResponse<MyFundListData>;

export type FundPurchaseRecordListResponse = ApiResponse<FundPurchaseRecord[]>;

export interface PurchaseListData {
  purchase_records: Array<FundPurchaseRecord>;
  total_amount: string;
  total_reward_amount: string;
}

export type PurchaseListResponse = ApiResponse<PurchaseListData>;

export interface PurchaseFundRequest {
  fund_symbol: string;
  amount: string;
  duration_days: number;
}

export interface PurchaseFundResponse extends BaseModal {
  fund_symbol: string;
  amount: string;
  duration_days: number;
  status: string;
  reward_amount: string;
}

export type PurchaseFundResponseType = ApiResponse<PurchaseFundResponse>;

export type FundPurchaseDetailResponse = ApiResponse<FundPurchaseRecord>;

export interface FundClaimDetail extends BaseModal {
  user_clerk_id: string;
  fund_uid: string;
  fund_symbol: string;
  fund_purchase_record_uid: string;
  claimed_amount: string;
  amount: string;
  actual_reward: string;
  reward_eligible: string;
  team_amount: number;
  claim_fee: string;
  commission_fee: string;
  duration_days: number;
  fund_product: EarnItem;
}

export type FundClaimDetailResponse = ApiResponse<FundClaimDetail>;

export interface FundRedeemDetail extends BaseModal {
  user_clerk_id: string;
  fund_uid: string;
  fund_product: EarnItem;
  fund_symbol: string;
  fund_purchase_record_uid: number;
  redeemed_amount: string;
  redeem_fee_rate: string;
  redeem_fee: string;
  penalty_fee_rate: string;
  penalty_fee: string;
  custody_fee: string;
  management_fee: string;
  sales_fee: string;
  actual_redeemed_amount: string;
}

export type FundRedeemDetailResponse = ApiResponse<FundRedeemDetail>;

export interface NewsHistoryItem extends BaseModal {
  timestamp: number;
  fund_product_uid: string;
  fund_product_symbol: string;
  title: Translation;
  home_team: Translation;
  away_team: Translation;
  headline: Translation;
  content: Translation;
  pnl: string;
  match_id: number;
}

export type NewsHistoryResponse = ApiResponse<NewsHistoryItem[]>;

export interface FundFeeData {
  claim_fee_rate: string;
  earn_total_commission_rate: string;
  redeem_fee_rate: string;
  trading_total_commission_rate: string;
}

export type FundFeeResponse = ApiResponse<FundFeeData>;

export interface GetMatchOrderAllParams {
  fund_product_uid: string;
  match_id: string;
  page: number;
  page_size: number;
}

export interface MatchOrderItem extends BaseModal {
  user_uid: number;
  user_clerk_id: string;
  amount: string;
  currency: string;
  status_id: number;
  status_code: string;
  match_id: number;
  odd_id: number;
  market_id: number;
  outcome_id: number;
  hash: string;
  order_type_id: number;
  match: Match;
  final_match: Match;
  area_id: number;
  canceled_at: number;
  canceled_by_rule_uid: number;
  profit: string;
  max_win: string;
  match_status_name: Translation;
  home_team_name: Translation;
  away_team_name: Translation;
  tournament_name: Translation;
  market_name: Translation;
  displayed_odd: Translation;
  bet_item_name: Translation;
  outcome_value: string;
  place_order_time: number;
  match_start_time: number;
  betting_period_name: Translation;
  betting_time_displayed: Translation;
  betting_score: number[] | null;
  final_score: number[];
  match_result: number[];
  area_type_name: Translation;
}

export type GetMatchOrderAllResponse = ApiResponse<Pagination<MatchOrderItem>>;

export interface GetFundNewsDetailRequest {
  fund_product_uid: string;
  match_id: string;
}

export interface NewsInfo extends BaseModal {
  timestamp: number;
  fund_product_uid: string;
  fund_product_symbol: string;
  title: Translation;
  home_team: Translation;
  away_team: Translation;
  headline: Translation;
  content: Translation;
  pnl: string;
  match_id: number;
}

export interface FundNewsDetail {
  match: Match;
  news: NewsInfo;
}

export type GetFundNewsDetailResponse = ApiResponse<FundNewsDetail>;

export interface FundMatchAnalyticsData {
  sports: Array<{
    id: number;
    name: string;
    name_translate: Translation;
    share: number;
  }>;
  tournaments: Array<{
    id: number;
    name: string;
    name_translate: Translation;
    share: number;
  }>;
  locations: Array<{
    id: number;
    name: string;
    name_translate: Translation;
    share: number;
  }>;
  pnls: Array<{
    id: number;
    y: number;
    x: string;
  }>;
}

export type FundMatchAnalyticsResponse = ApiResponse<FundMatchAnalyticsData>;
