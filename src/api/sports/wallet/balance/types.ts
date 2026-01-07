import type { ApiResponse } from "@/api/base-api-type";

export interface Balance {
  currency: string;
  available: string;
  total: string;
  locked: string;
}

export type GetBalanceResponse = ApiResponse<Balance[]>;
