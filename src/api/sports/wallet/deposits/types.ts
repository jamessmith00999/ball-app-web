import type { ApiResponse, Pagination } from "@/api/base-api-type";

export interface GenerateDepositAddressRequest {
  network_id: number;
}

export interface DepositAddress {
  id: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  address: string;
  network: string;
  network_id: number;
  asset: string;
  asset_id: number;
  user_uid: string;
}

export type GenerateDepositAddressResponse = ApiResponse<DepositAddress>;

export interface DepositTransaction {
  id: number;
  created_at: number;
  updated_at: string;
  deleted_at: string | null;
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
  confirmed_at: string;
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
  user_uid: string;
  wallet_path: string;
  uid: string;
  is_top_up: boolean;
}

export type GetDepositsResponse = ApiResponse<Pagination<DepositTransaction>>;
