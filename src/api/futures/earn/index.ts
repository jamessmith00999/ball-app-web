import type { ApiResponse } from "@/api/base-api-type";
import { futuresApi } from "@/api/futures/futures-api";

import type {
  FundClaimDetailResponse,
  FundFeeResponse,
  FundListResponse,
  FundMatchAnalyticsResponse,
  FundPurchaseDetailResponse,
  FundPurchaseRecordListResponse,
  FundRedeemDetailResponse,
  GetFundNewsDetailRequest,
  GetFundNewsDetailResponse,
  GetMatchOrderAllParams,
  GetMatchOrderAllResponse,
  MyFundListResponse,
  NewsHistoryResponse,
  PurchaseFundRequest,
  PurchaseFundResponseType,
  PurchaseListResponse,
  TrialFundResponse,
} from "./types";

export * from "./types";

export async function getEarnList({
  level_name,
  enabled,
}: {
  level_name?: string;
  enabled?: boolean;
}): Promise<FundListResponse> {
  const queryParams = new URLSearchParams({
    ...(level_name ? { level_name } : {}),
    ...(enabled ? { enabled: enabled.toString() } : {}),
  });
  const response = await futuresApi.get<FundListResponse>(
    `/api/v1/earn/public/fund/list?${queryParams.toString()}`,
  );
  return response.data;
}

export async function getTrialFund({
  enabled,
}: {
  enabled?: boolean;
} = {}): Promise<TrialFundResponse> {
  const queryParams = new URLSearchParams({
    ...(enabled !== undefined ? { enabled: enabled.toString() } : {}),
  });
  const response = await futuresApi.get<TrialFundResponse>(
    `/api/v1/earn/public/fund/list/trial?${queryParams.toString()}`,
  );
  return response.data;
}

export async function getMyFundList(): Promise<MyFundListResponse> {
  const response = await futuresApi.get<MyFundListResponse>(
    "/api/v1/earn/fund/list/my",
  );
  return response.data;
}

export async function getFundList(): Promise<FundPurchaseRecordListResponse> {
  const response = await futuresApi.get<FundPurchaseRecordListResponse>(
    "/api/v1/earn/fund/list",
  );
  return response.data;
}

export async function getPurchaseList(params: {
  fund_symbol: string;
}): Promise<PurchaseListResponse> {
  const response = await futuresApi.get<PurchaseListResponse>(
    "/api/v1/earn/fund/purchase/list",
    {
      params: {
        fund_symbol: params.fund_symbol,
      },
    },
  );
  return response.data;
}

export async function purchaseFund(
  request: PurchaseFundRequest,
): Promise<PurchaseFundResponseType> {
  const response = await futuresApi.post<PurchaseFundResponseType>(
    "/api/v1/earn/fund/purchase",
    request,
  );
  return response.data;
}

export async function getFundPurchaseDetail(
  uid: string,
): Promise<FundPurchaseDetailResponse> {
  const response = await futuresApi.get<FundPurchaseDetailResponse>(
    `/api/v1/earn/fund/purchase/list/${uid}`,
  );
  return response.data;
}

export async function redeemFund(request: {
  fund_purchase_record_uid: string;
  redeem_amount: string;
}): Promise<void> {
  await futuresApi.post("/api/v1/earn/fund/redeem", request);
}

export async function claimFund(request: {
  fund_purchase_record_uid: string;
}): Promise<void> {
  await futuresApi.post("/api/v1/earn/fund/claim", request);
}

export async function claimFundBatch(): Promise<ApiResponse<null>> {
  const response = await futuresApi.post<ApiResponse<null>>(
    "/api/v1/earn/fund/claim/batch",
  );
  return response.data;
}

export async function claimFundBatchByUid(
  uid: string,
): Promise<ApiResponse<null>> {
  const response = await futuresApi.post<ApiResponse<null>>(
    `/api/v1/earn/fund/claim/batch/${uid}`,
  );
  return response.data;
}

export async function getFundClaimDetail(
  id: string,
): Promise<FundClaimDetailResponse> {
  const response = await futuresApi.get<FundClaimDetailResponse>(
    `/api/v1/earn/fund/claim/list/${id}`,
  );
  return response.data;
}

export async function getFundRedeemDetail(
  id: string,
): Promise<FundRedeemDetailResponse> {
  const response = await futuresApi.get<FundRedeemDetailResponse>(
    `/api/v1/earn/fund/redeem/list/${id}`,
  );
  return response.data;
}

export async function getNewsHistory(params: {
  symbol: string;
}): Promise<NewsHistoryResponse> {
  const response = await futuresApi.get<NewsHistoryResponse>(
    "/api/v1/earn/public/fund/news-history/list",
    {
      params: {
        symbol: params.symbol,
      },
    },
  );
  return response.data;
}

export async function getFundFee(): Promise<FundFeeResponse> {
  const response = await futuresApi.get<FundFeeResponse>(
    "/api/v1/earn/public/fund/fee",
  );
  return response.data;
}

export async function getMatchOrderAll(
  params: GetMatchOrderAllParams,
): Promise<GetMatchOrderAllResponse> {
  const queryParams = new URLSearchParams({
    fund_product_uid: params.fund_product_uid,
    match_id: params.match_id,
    page: params.page.toString(),
    page_size: params.page_size.toString(),
  });

  const response = await futuresApi.get<GetMatchOrderAllResponse>(
    `/api/v1/earn/fund/match/order-all?${queryParams.toString()}`,
  );
  return response.data;
}

export async function getMatchOrderMe(
  params: GetMatchOrderAllParams,
): Promise<GetMatchOrderAllResponse> {
  const queryParams = new URLSearchParams({
    fund_product_uid: params.fund_product_uid,
    match_id: params.match_id,
    page: params.page.toString(),
    page_size: params.page_size.toString(),
  });

  const response = await futuresApi.get<GetMatchOrderAllResponse>(
    `/api/v1/earn/fund/match/order-me-randomly?${queryParams.toString()}`,
  );
  return response.data;
}

export async function getFundNewsDetail(
  params: GetFundNewsDetailRequest,
): Promise<GetFundNewsDetailResponse> {
  const queryParams = new URLSearchParams({
    fund_product_uid: params.fund_product_uid.toString(),
    match_id: params.match_id,
  });

  const response = await futuresApi.get<GetFundNewsDetailResponse>(
    `/api/v1/earn/fund/news/detail?${queryParams.toString()}`,
  );
  return response.data;
}

export async function getFundMatchAnalytics(params: {
  fund_product_uid: string;
}): Promise<FundMatchAnalyticsResponse> {
  const queryParams = new URLSearchParams({
    fund_product_uid: params.fund_product_uid,
  });

  const response = await futuresApi.get<FundMatchAnalyticsResponse>(
    `/api/v1/earn/public/fund/match-analytics?${queryParams.toString()}`,
  );
  return response.data;
}
