import type { ApiResponse, Pagination } from "@/api/base-api-type";

export interface CustomerSupport {
  uid: string;
  lang: string;
  qrcode: string;
  link: string;
  created_at: number;
  updated_at: number;
}

export type GetCustomerSupportResponse = ApiResponse<
  Pagination<CustomerSupport>
>;
