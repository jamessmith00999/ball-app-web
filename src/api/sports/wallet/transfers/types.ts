import type { ApiResponse, BaseModal, Pagination } from "@/api/base-api-type";

export interface Transfer extends BaseModal {
  from_user_uid: string;
  to_user_uid: string;
  amount: string;
  asset_id: number;
  network_id: number;
  status_id: number;
  tx_type_id: number;
  tx_type_code: string;
}

export type GetTransfersResponse = ApiResponse<Pagination<Transfer>>;
