import type { ApiResponse } from "@/api/base-api-type";
import sportsApi from "@/api/sports/sports-api";

import type { GetAnnouncementsParams, GetAnnouncementsResponse } from "./types";

/**
 * Create read record for an announcement
 */
export async function createReadRecord(data: { article_uid: string }) {
  const response = await sportsApi.post("/api/v1/client/read-record", data);
  return response.data;
}

/**
 * Mark all announcements as read
 */
export async function markAllAnnouncementsAsRead() {
  const response = await sportsApi.post(
    "/api/v1/client/read-record-all-announcement",
    {},
  );
  return response.data;
}

/**
 * Get announcements list
 */
export async function getAnnouncements(params: GetAnnouncementsParams) {
  const response = await sportsApi.get<GetAnnouncementsResponse>(
    "/api/v1/client/announcements",
    {
      params: {
        lang: params.lang,
        page: params.page,
        page_size: params.page_size,
      },
    },
  );
  return response.data;
}

/**
 * Get unread announcements count
 */
export async function getAnnouncementUnreadCount(): Promise<
  ApiResponse<number>
> {
  const response = await sportsApi.get<ApiResponse<number>>(
    "/api/v1/client/announcements/unread-count",
  );
  return response.data;
}
