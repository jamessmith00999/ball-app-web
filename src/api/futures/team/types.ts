import type {
  ApiResponse,
  BaseModal,
  Pagination,
  Translation,
} from "@/api/base-api-type";
import type { FundPurchaseRecord } from "@/api/futures/earn/types";
import type { ExchangePair } from "@/api/futures/market/types";

export interface TeamInfo extends BaseModal {
  user_clerk_id: string;
  all_team_member_count: number;
  valid_team_member_count: number;
}

export interface TeamInfoType {
  team_info: TeamInfo;
  valid_deposit_amount: string;
}

export type TeamInfoResponse = ApiResponse<TeamInfoType>;

export interface TeamMember extends BaseModal {
  clerk_id: string;
  username: string;
  display_username: string;
  email: string;
  phone: string;
  imageUrl: string;
  level_uid: string;
  commission_amount: string;
  level: {
    id: number;
    uid: string;
    created_at: number;
    updated_at: number;
    deleted_at: number;
    name: string;
    name_translate: Translation;
    icon_url: string;
    description: string;
    description_translate: Translation;
    withdraw_fee_rate: string;
    valid_team_member_count_required: number;
    valid_deposit_amount_required: string;
    sort_order: number;
    transfer_out_fee_rate: string;
  };
  refer_code_used: string;
  refer_code_user_clerk_id: string;
  refer_code: string;
  is_valid_user: boolean;
  relationship_level: number;
  birthday: number;
  language: string;
  is_imported: boolean;
  banned: boolean;
}

export type TeamListResponse = ApiResponse<Pagination<TeamMember>>;

export interface CommissionRate extends BaseModal {
  relationship_level: number;
  earn_commission_rate: string;
  trading_commission_rate: string;
}

export type CommissionRatesResponse = ApiResponse<CommissionRate[]>;

export interface TeamCommissionHistoryItem extends BaseModal {
  user_clerk_id: string;
  user?: {
    id: number;
    uid: string;
    created_at: number;
    updated_at: number;
    deleted_at: number;
    clerk_id: string;
    username: string;
    display_username: string;
    email: string;
    phone: string;
    imageUrl: string;
    level_uid: string;
    refer_code_used: string;
    refer_code_user_clerk_id: string;
    refer_code: string;
    is_valid_user: boolean;
    commission_amount: string;
    birthday: number;
    language: string;
    is_imported: boolean;
    banned: boolean;
  };
  ancestor_clerk_id: string;
  relationship_level: number;
  commission_type: "trading" | "earn";
  commission_name?: string;
  fund_purchase_uid?: string;
  fund_purchase?: FundPurchaseRecord;
  pair_uid?: number;
  pair?: ExchangePair;
  order_uid?: string | null;
  commission_amount: string;
  related_uid: string;
  related_type: "order" | "fund" | "fundProductPurchaseUid";
  timestamp: number;
}

export type TeamCommissionHistoryResponse = ApiResponse<{
  commission_data: Pagination<TeamCommissionHistoryItem>;
}>;

export interface CommissionDetail extends TeamCommissionHistoryItem {
  fund_purchase_uid?: string;
  fund_purchase?: FundPurchaseRecord;
  order_uid?: string | null;
  commission_name?: string;
}

export type CommissionDetailResponse = ApiResponse<CommissionDetail>;

export interface TeamSummary {
  member_count: number;
  total_commission: string;
}

export type TeamSummaryResponse = ApiResponse<TeamSummary>;
