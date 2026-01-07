import type {
  ApiResponse,
  BaseModal,
  Pagination,
  Translation,
} from "@/api/base-api-type";

export interface Asset extends BaseModal {
  user_clerk_id: string;
  balance: string;
  available_balance: string;
  frozen_balance: string;
  total_deposit: string;
  total_withdraw: string;
  total_pnl: string;
  is_exchange: boolean;
}

export interface UserAsset {
  asset: Asset;
  earn_holding_value: string;
  total_asset: string;
  total_margin_amount: string;
}

export type UserAssetResponse = ApiResponse<UserAsset>;

export interface FrozenDetails {
  institution_pledge_amount: string;
  order_amount: string;
  pending_withdraw_amount: string;
}

export type FrozenDetailsResponse = ApiResponse<FrozenDetails>;

export interface DepositAddressRequest {
  network_id: number;
}

export interface DepositAddressData {
  deposit_address: string;
}

export type DepositAddressResponse = ApiResponse<DepositAddressData>;

export interface WithdrawCodeRequest {
  method: "email" | "sms";
  lang: string;
}

export interface WithdrawCodeData {
  message: string;
}

export type WithdrawCodeResponse = ApiResponse<WithdrawCodeData>;

export interface WithdrawRequest {
  asset_id: number;
  amount: string;
  network_id: number;
  destination_address: string;
  code: string;
}

export interface WithdrawData {
  message: string;
}

export type WithdrawResponse = ApiResponse<WithdrawData>;

export interface FundProductPurchaseMetadata {
  icon_url: string;
  yield_rate: string;
  fund_symbol: string;
  duration_days: number;
  purchase_amount: string;
  fund_name_translate: Translation;
  background_image_url: string;
}

export interface TransactionLog extends BaseModal {
  user_id: string;
  balance_before: string;
  balance_after: string;
  available_before: string;
  available_after: string;
  frozen_before: string;
  frozen_after: string;
  total_pnl_before: string;
  total_pnl_after: string;
  total_deposit_before: string;
  total_deposit_after: string;
  total_withdraw_before: string;
  total_withdraw_after: string;
  transaction_type: string;
  reference_id: string;
  reference_type: string;
  description: string;
  metadata: FundProductPurchaseMetadata | null;
}

export type TransactionLogResponse = ApiResponse<Pagination<TransactionLog>>;

export interface DepositTransactionDetail extends BaseModal {
  from_address: string;
  to_address: string;
  address_uid: number;
  amount: string;
  float_amount: string;
  decimal: number;
  tx_hash: string;
  status: string;
  asset_id: number;
  asset_name: string;
  network_id: number;
  network_name: string;
  confirmed: boolean;
  confirmed_at: number;
  type: string;
  transaction_uid: number;
  user_id: string;
}

export type DepositTransactionDetailResponse =
  ApiResponse<DepositTransactionDetail>;

export type WithdrawRequestStatus =
  | "pending"
  | "approved"
  | "rejected"
  | "pending_onchain_confirmation"
  | "confirmed_onchain"
  | "failed_onchain";

export interface WithdrawTransactionDetail extends BaseModal {
  withdraw_request_uid: string;
  user_clerk_id: string;
  asset_id: number;
  asset_name: string;
  network_id: number;
  network_name: string;
  address: string;
  amount: string;
  actual_amount: string;
  withdraw_fee: string;
  withdraw_actual_fee: string;
  approved: boolean;
  reviewed_at: number;
  reviewed_by_admin_uid: string;
  reject_reason: string;
  confirmed: boolean;
  tx_hash: string;
  withdraw_request_status: WithdrawRequestStatus;
}

export type WithdrawTransactionDetailResponse =
  ApiResponse<WithdrawTransactionDetail>;

export interface TransferHistoryDetail extends BaseModal {
  transfer_uid: string;
  user_clerk_id: string;
  amount: string;
  from_platform: string;
  to_platform: string;
  status: string;
  error: string;
  error_msg: string;
  signature: string;
  transfer_fee: string;
}

export type TransferHistoryDetailResponse = ApiResponse<
  TransferHistoryDetail[]
>;

export interface TransferOutRequest {
  amount: string;
  platform: "exchange" | "ball";
}
