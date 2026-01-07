import type { ApiResponse, Pagination } from "@/api/base-api-type";
import type { VipInfo } from "@/api/sports/vip/types";

export interface TeamDetail {
  user: {
    id: number;
    created_at: number;
    updated_at: number;
    deleted_at: number;
    uid: string;
    clerk_id: string;
    email: string;
    points: number;
    vip_level: number;
    refer_code: string;
    image_url: string;
    username: string;
    phone: string;
    role_id: number;
    banned: boolean;
    display_username: string;
  };
  profit: string;
  profit_currency: string;
  vip_info: VipInfo;
}

/**
 * Team summary data interface
 */
export interface TeamSummary {
  total_count: number;
  total_profit: string;
  profit_currency: string;
}

export type GetTeamDetailResponse = ApiResponse<Pagination<TeamDetail>>;
export type GetTeamSummaryResponse = ApiResponse<TeamSummary>;
