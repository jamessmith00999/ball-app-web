import type { ApiResponse } from "@/api/base-api-type";
import type { GetNewestOddsResponse } from "@/api/sports/matches/types";
import sportsApi from "@/api/sports/sports-api";

import type {
  CreateOrdersResponse,
  GetOrdersByClerkIdParams,
  GetOrdersByClerkIdResponse,
  GetOrdersByReferCodeParams,
  GetOrdersByReferCodeResponse,
  GetOrdersParams,
  GetOrdersResponse,
  OrderDetail,
  OrderRequest,
} from "./types";

// Re-export types for convenience
export * from "./types";

export async function createOrders(orderList: OrderRequest[], areaId: number) {
  const response = await sportsApi.post<CreateOrdersResponse>(
    "/api/v1/client/orders",
    {
      order_list: orderList,
      area_id: areaId,
    }
  );
  return response.data;
}

export async function getOrderByUid(uid: string) {
  const response = await sportsApi.get<ApiResponse<OrderDetail>>(
    `/api/v1/client/orders/${uid}`
  );
  return response.data;
}

export async function getOrders(params: GetOrdersParams) {
  const response = await sportsApi.get<GetOrdersResponse>(
    "/api/v1/client/orders",
    {
      params: {
        status_id: params.status_id,
        page: params.page,
        page_size: params.page_size,
      },
    }
  );
  return response.data;
}

export async function getNewestOdds(orderList: OrderRequest[], areaId: number) {
  const response = await sportsApi.post<GetNewestOddsResponse>(
    "/api/v1/public/newest-odds",
    {
      order_list: orderList,
      area_id: areaId,
    }
  );
  return response.data;
}

/**
 * Get orders by refer code
 */
export async function getOrdersByReferCode(params: GetOrdersByReferCodeParams) {
  const response = await sportsApi.get<GetOrdersByReferCodeResponse>(
    "/api/v1/client/team/orders-by-refer-code",
    {
      params: {
        page: params.page,
        page_size: params.page_size,
        refer_code: params.refer_code,
      },
    }
  );
  return response.data;
}

/**
 * Get orders by clerk ID
 */
export async function getOrdersByClerkId(params: GetOrdersByClerkIdParams) {
  const response = await sportsApi.get<GetOrdersByClerkIdResponse>(
    "/api/v1/client/team/orders-by-clerk-id",
    {
      params: {
        page: params.page,
        page_size: params.page_size,
        user_uid: params.user_uid,
      },
    }
  );
  return response.data;
}
