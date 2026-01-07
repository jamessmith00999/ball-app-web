import type { ApiResponse, BaseModal } from "@/api/base-api-type";

export interface UserLevel extends BaseModal {
  name: string;
  name_translate: Record<string, any>;
  description: string;
  description_translate: Record<string, any>;
  icon_url: string;
  sort_order: number;
  valid_deposit_amount_required: string;
  valid_team_member_count_required: number;
  transfer_out_fee_rate: string;
  withdraw_fee_rate: string;
}

export interface UserBalance extends BaseModal {
  user_clerk_id: string;
  balance: string;
  available_balance: string;
  frozen_balance: string;
  total_pnl: string;
  total_deposit: string;
  total_withdraw: string;
  is_exchange: boolean;
}

export interface UserSummary extends BaseModal {
  user_clerk_id: string;
  user_uid: string;
  total_pnl: string;
  trading_pnl: string;
  earn_pnl: string;
  total_commission: string;
  total_trading_commission: string;
  total_earn_commission: string;
  total_deposit_amount: string;
  total_withdraw_amount: string;
  total_post_count: number;
  total_comment_count: number;
}

export interface UserInfo extends BaseModal {
  clerk_id: string;
  username: string;
  display_username: string;
  email: string;
  phone: string;
  image_url: string;
  birthday: string;
  language: string;
  level_uid: string;
  level: UserLevel;
  refer_code: string;
  refer_code_used: string;
  refer_code_user_clerk_id?: string;
  is_valid_user: boolean;
  became_valid_user_at: number;
  is_imported: boolean;
  commission_amount: string;
  relationship_level: number;
  banned: boolean;
  gender: string;
  remark: string;
  role: string;
  trial_credit_used: boolean;
  is_trial_credit_page_showed: boolean;
  balance?: UserBalance;
  user_summary?: UserSummary;
}

export type UserInfoResponse = ApiResponse<{
  user: UserInfo;
}>;

export interface UserPnl extends BaseModal {
  user_clerk_id: string;
  earn_pnl: string;
  trading_pnl: string;
  total_pnl: string;
  total_earn_commission: string;
  total_trading_commission: string;
  total_commission: string;
}

export interface UserPnlData {
  pnl: UserPnl;
}

export type UserPnlResponse = ApiResponse<UserPnlData>;

export type UserLevelsResponse = ApiResponse<{
  levels: UserLevel[];
}>;

export interface UserStatusCheckRequest {
  login_info: string;
}

export interface UserStatusCheckData {
  is_banned: boolean;
  is_existed: boolean;
  is_admin: boolean;
}

export type UserStatusCheckResponse = ApiResponse<UserStatusCheckData>;

export interface InviteCodeCheckRequest {
  code: string;
}

export interface InviteCodeCheckData {
  is_valid: boolean;
}

export type InviteCodeCheckResponse = ApiResponse<InviteCodeCheckData>;

export interface GetDocumentUrlRequest {
  folder_name: "institution-verification" | "user-avatar";
  file_name:
    | "registration_certificate"
    | "entity_qualification_certificate"
    | "financial_audit_report"
    | "finalcial_proof_of_funds"
    | "product_prospectus"
    | "historical_performance_report"
    | "team_core_member_professional_qualification_cert"
    | "team_organization_chart"
    | "user-avatar";
}

export interface DocumentUrlData {
  url: string;
}

export type GetDocumentUrlResponse = ApiResponse<DocumentUrlData>;

export interface UploadDocumentRequest {
  file: File;
  folder_name: "institution-verification" | "user-avatar";
  file_name:
    | "registration_certificate"
    | "entity_qualification_certificate"
    | "financial_audit_report"
    | "finalcial_proof_of_funds"
    | "product_prospectus"
    | "historical_performance_report"
    | "team_core_member_professional_qualification_cert"
    | "team_organization_chart"
    | "user-avatar";
}

export interface UploadDocumentData {
  objectName: string;
  url: string;
}

export type UploadDocumentResponse = ApiResponse<UploadDocumentData>;
