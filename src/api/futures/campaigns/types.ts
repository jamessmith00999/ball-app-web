import type {
  ApiResponse,
  BaseModal,
  Pagination,
  Translation,
} from "@/api/base-api-type";

export interface BannerItem extends BaseModal {
  title: string;
  image_url: string;
  link: string;
  is_active: boolean;
  navigate_type: "url" | "inapp" | "none";
  app_page?: string;
  sort: number;
  entry_options: BannerType;
}

export type BannerType = "Home" | "Earn" | "Recharge";

export type BannerListResponse = ApiResponse<BannerItem[]>;

export interface Campaign extends BaseModal {
  name_translate: Translation;
  icon: string;
  sort: number;
  target_type: string;
  target_url: string;
  condition_type: string;
  condition_value: string;
  task_frequency: string;
  reward_type: string;
  reward_value: string;
  valid_until: number;
  release_type: string;
  release_custom_at: number;
  platform: string;
  status: string;
}

export type CampaignListResponse = ApiResponse<Pagination<Campaign>>;

export interface MarkCampaignInProgressRequest {
  campaign_uid: string;
}

export interface RewardRecord {
  user_clerk_id: string;
  login_info: string;
  user_campaign_uid: string;
  campaign_uid: string;
  campaign_type: string;
  status: string;
  reward_amount: string;
  reward_type: string;
  timestamp: number;
  campaign_name_translate: Translation;
}

export type RewardRecordResponse = ApiResponse<RewardRecord>;
