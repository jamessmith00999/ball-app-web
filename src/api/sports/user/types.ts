import type { ApiResponse, BaseModal } from "@/api/base-api-type";

export interface User {
  id: number;
  uid: string;
  email: string;
  points: number;
  refer_code: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export type GetUserResponse = ApiResponse<User>;

export interface UserConfig extends BaseModal {
  user_uid: string;
  soccer_goal_favor: boolean;
  soccer_goal_bet: boolean;
  push_with_vibration: boolean;
  hide_bet_orders: boolean;
}

export type GetUserConfigResponse = ApiResponse<UserConfig>;

export interface ValidateReferCodeResponse {
  is_valid: boolean;
}

export type ValidateReferCodeApiResponse =
  ApiResponse<ValidateReferCodeResponse>;
