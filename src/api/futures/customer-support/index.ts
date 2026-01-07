import futuresApi from "@/api/futures/futures-api";

import type { GetCustomerSupportResponse } from "./types";

/**
 * Get customer support information including QR code and link
 */
export async function getCustomerSupport() {
  const response = await futuresApi.get<GetCustomerSupportResponse>(
    "/api/v1/public/customer-support",
  );
  return response.data;
}
