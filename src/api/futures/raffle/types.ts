import type {
  ApiResponse,
  BaseModal,
  Pagination,
  Translation,
} from "@/api/base-api-type";

export interface TurntableRewardItem {
  uid: string;
  name: Translation;
  icon_url: string;
  rate: string;
  type: string;
  amount: string;
  supply: number;
  allocated_count: number;
  remaining: number;
  probability: string;
}

export type TurntableRewardListResponse = ApiResponse<TurntableRewardItem[]>;

export interface RaffleDrawItem extends BaseModal {
  user_clerk_id: string;
  raffle_id: number;
  raffle_uid: string | number;
  raffle_type: string;
  raffle_name: Translation;
  icon_url: string;
  amount: string;
  rate: string;
  probability: string;
  claimed: boolean;
  claimed_at: number;
  used: boolean;
  used_at: number;
  used_reference_uid: string | number;
}

export type RaffleDrawListResponse = ApiResponse<Pagination<RaffleDrawItem>>;

export type RaffleDrawDetail = RaffleDrawItem;

export type RaffleDrawDetailResponse = ApiResponse<RaffleDrawDetail>;

export interface GetRaffleDrawListParams {
  claimed?: boolean | "true" | "false";
  used?: boolean | "true" | "false";
  raffle_type?: string;
}

export interface ClaimRaffleRewardRequest {
  ticket_uid: string;
}

export interface RaffleDrawReward {
  uid: string;
  name: Translation;
  icon_url: string;
  rate: string;
  type: string;
  amount: string;
  supply: number;
  allocated_count: number;
  remaining: number;
  probability: string;
}

export interface RaffleDrawResponseData {
  record_uid: string;
  drawn_at: number;
  raffle: RaffleDrawReward;
}

export type RaffleDrawResponse = ApiResponse<RaffleDrawResponseData>;

export interface DrawTicketNumberData {
  num: number;
}

export type DrawTicketNumberResponse = ApiResponse<DrawTicketNumberData>;

export interface RaffleRulesData {
  rules: Translation;
}

export type RaffleRulesResponse = ApiResponse<RaffleRulesData>;
