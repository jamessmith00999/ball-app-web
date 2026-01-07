import type {
  ApiResponse,
  BaseModal,
  Pagination,
  Translation,
} from "@/api/base-api-type";

export interface NotificationMetadata {
  post_uid?: string;
  event_type?: string;
  post_title?: string;
  post_content?: string;
  commenter_username?: string;
  commenter_display_username?: string;
  commenter_image_url?: string;
}

export type NotificationType = "system" | "interaction" | "order";

export interface Notification extends BaseModal {
  user_clerk_id: string;
  title: string;
  content: string;
  language: string;
  type: NotificationType;
  Status: "read" | "pending";
  channel: string;
  Priority: "low" | "medium" | "high" | "normal";
  enabled: boolean;
  published_at: number;
  read_at: string | null;
  sent_at: string | null;
  delivered_at: string | null;
  failed_at: string | null;
  error_msg: string;
  metadata: NotificationMetadata;
  expires_at: string | null;
  read_count: number;
  retry_count: number;
  max_retries: number;
  title_translate: Translation;
  content_translate: Translation;
}

export interface GetNotificationListParams {
  page: number;
  page_size: number;
  type?: NotificationType;
}

export type NotificationListResponse = ApiResponse<Pagination<Notification>>;

export interface NotificationStatistic {
  type: NotificationType;
  unread_count: number;
  last: Notification | null;
}

export type NotificationStatisticsResponse = ApiResponse<
  NotificationStatistic[]
>;
