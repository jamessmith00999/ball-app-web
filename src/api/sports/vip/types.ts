import type { ApiResponse, BaseModal } from "@/api/base-api-type";

export interface VipRule {
  level: number;
  points: number;
  cumulative_deposit_amount: number;
  cumulative_valid_order_amount: number;
}

export interface VipNextLevelRequirement {
  deposit_need: number;
  deposit_total: number;
  settled_order_amount_need: number;
  settled_order_amount_total: number;
}

export interface VipCurrent {
  deposit_progress_to_next: number;
  level: number;
  order_progress_to_next: number;
  points: number;
  progress_to_next: number;
  rate: number; // Default points ratio is 1 USDT = 1 point. If rate is 1.2, it means 1 points = 1.2 USDT
}

export interface VipShouldBe {
  level: number;
  points: number;
  cumulative_deposit_amount: number;
  cumulative_valid_order_amount: number;
}

export interface VipInfo {
  current: VipCurrent;
  next_level_requirement: VipNextLevelRequirement;
  rules: VipRule[];
  should_be: VipShouldBe;
}

export type GetVipInfoResponse = ApiResponse<VipInfo>;

export interface VipRecord extends BaseModal {
  user_uid: string;
  from_level: number;
  to_level: number;
  changed_points: number;
  upgraded_at: string;
  from_points: number;
  to_points: number;
}

export type GetVipRecordsResponse = ApiResponse<VipRecord[]>;
