import type {
  ApiResponse,
  BaseModal,
  Pagination,
  Translation,
} from "@/api/base-api-type";

export interface Ledger extends BaseModal {
  user_uid: string;
  user_clerk_id: string;
  tx_type_id: number;
  tx_type_code: string;
  amount: string;
  asset_id: number;
  asset_name: string;
  network_id: number;
  network_name: string;
  status_id: number;
  status_code: string;
  from_balance: string;
  to_balance: string;
  reject_reason: Translation;
  refer_uid: string;
}

export type GetLedgersResponse = ApiResponse<Pagination<Ledger>>;
