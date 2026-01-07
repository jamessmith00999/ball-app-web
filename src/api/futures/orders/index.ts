import type { ApiResponse } from "@/api/base-api-type";
import { futuresApi } from "@/api/futures/futures-api";

import type {
  CancelOrderRequest,
  CreateOrderRequest,
  CreateOrderResponse,
  GetOrdersParams,
  GetOrdersResponse,
  Order,
} from "./types";

export * from "./types";

export async function createOrder(
  order: CreateOrderRequest,
): Promise<CreateOrderResponse> {
  const response = await futuresApi.post<CreateOrderResponse>(
    "/api/v1/exchange/order",
    order,
  );
  return response.data;
}

export async function getOrders(
  params: GetOrdersParams,
): Promise<GetOrdersResponse> {
  const queryParams = new URLSearchParams({
    page: params.page.toString(),
    page_size: params.page_size.toString(),
    ...(params.currency_pair ? { currency_pair: params.currency_pair } : {}),
    ...(params.start_date_timestamp
      ? { start_date_timestamp: params.start_date_timestamp.toString() }
      : {}),
    ...(params.end_date_timestamp
      ? { end_date_timestamp: params.end_date_timestamp.toString() }
      : {}),
    ...(params.status ? { status: params.status.join(",") } : {}),
    ...(params.type
      ? { type: params.type }
      : {
          type: "limit,market",
        }),
  });

  const response = await futuresApi.get<GetOrdersResponse>(
    `/api/v1/exchange/orders?${queryParams.toString()}`,
  );
  return response.data;
}

export async function cancelOrder(request: CancelOrderRequest): Promise<void> {
  await futuresApi.post("/api/v1/exchange/order/cancel", request);
}

export async function closeAllOrders(): Promise<void> {
  await futuresApi.post("/api/v1/exchange/order/close-all", {});
}

export async function getOrderById(
  orderId: string,
): Promise<ApiResponse<Order>> {
  const response = await futuresApi.get<ApiResponse<Order>>(
    `/api/v1/exchange/order/${orderId}`,
  );
  return response.data;
}
