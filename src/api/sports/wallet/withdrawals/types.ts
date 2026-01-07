import type {
  ApiResponse,
  BaseModal,
  Pagination,
  Translation,
} from "@/api/base-api-type";

export interface WithdrawalRequest {
  asset_id: number;
  amount: number;
  destination: string;
  network_id: number;
  email_code?: string;
  sms_code?: string;
  totp_code?: string;
}

export interface WithdrawalResponse {
  request_uid: string;
  status: string;
}

export interface WithdrawalAddress {
  id: number;
  uid: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  address: string;
  network: string;
  network_id: number;
  asset: string;
  asset_id: number;
  user_uid: string;
  remark: string;
}

export type GetWithdrawalAddressesResponse = ApiResponse<WithdrawalAddress[]>;

export interface WithdrawalFee {
  fee_rate: string;
  max_delay_in_hours: string;
}

export type GetWithdrawalFeeResponse = ApiResponse<WithdrawalFee>;

export interface WithdrawalTransaction extends BaseModal {
  amount: string;
  asset_id: number;
  asset_name: string;
  block_number: number;
  call_back_response_body: string;
  call_back_response_code: number;
  call_back_response_status: string;
  call_back_retries: number;
  call_back_status: string;
  collect_base_fee: string;
  collect_block_number: number;
  collect_confirmed_at: string;
  collect_nonce: number;
  collect_priority_fee: string;
  collect_task_status: string;
  collect_total_amount: string;
  collect_tx_confirmed: boolean;
  collect_tx_hash: string;
  collected_at: string;
  confirmed: boolean;
  confirmed_at: string | null;
  decimal: number;
  float_amount: string;
  gas_base_fee: string;
  gas_nonce: number;
  gas_priority_fee: string;
  gas_tx_hash: string;
  is_collected: boolean;
  last_call_back_at: string;
  last_error: string;
  network_id: number;
  network_name: string;
  next_call_back_at: string;
  project_uid: string;
  request_error: string;
  retries: number;
  sender: string;
  tx_hash: string;
  status: string;
  user_address: string;
  user_uid: number;
  wallet_path: string;
  uid: string;
  is_deducted: boolean;
  from_address: string;
  to_address: string;
  address_uid: string;
  fee: number;
  fee_rate: number;
  reason: string;
  reject_reason: Translation;
  withdrawal_request_uid: string;
  user_clerk_id: string;
  type: string;
}

export type GetWithdrawalsResponse = ApiResponse<
  Pagination<WithdrawalTransaction>
>;
