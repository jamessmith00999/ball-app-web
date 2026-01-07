import { futuresApi } from "@/api/futures/futures-api";

import type {
  GetNotificationListParams,
  NotificationListResponse,
  NotificationStatisticsResponse,
} from "./types";

export * from "./types";

export async function getNotificationList(
  params: GetNotificationListParams,
): Promise<NotificationListResponse> {
  const queryParams = new URLSearchParams({
    page: params.page.toString(),
    page_size: params.page_size.toString(),
    ...(params.type ? { type: params.type } : {}),
  });

  const response = await futuresApi.get<NotificationListResponse>(
    `/api/v1/user/notification/list?${queryParams.toString()}`,
  );
  return response.data;
}

export async function markNotificationAsRead(request: {
  notification_uid: string;
  notification_type: "system" | "interaction" | "order";
}): Promise<void> {
  await futuresApi.post("/api/v1/user/notification/mark-as-read", request);
}

export async function markAllNotificationsAsReadAll({
  notification_type,
}: {
  notification_type: "system" | "interaction" | "order" | "all";
}): Promise<void> {
  await futuresApi.post("/api/v1/user/notification/mark-all-as-read/all", {
    notification_type,
  });
}

export async function getNotificationStatistics(): Promise<NotificationStatisticsResponse> {
  const response = await futuresApi.get<NotificationStatisticsResponse>(
    "/api/v1/user/notification/statistics",
  );
  return response.data;
}
