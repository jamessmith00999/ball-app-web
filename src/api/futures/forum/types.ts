import type { ApiResponse, Pagination, Translation } from "@/api/base-api-type";
import type { FundPurchaseRecord } from "@/api/futures/earn/types";
import type { Position } from "@/api/futures/positions/types";

export interface PostUser {
  banned: boolean;
  birthday: number;
  clerk_id: string;
  commission_amount: string;
  created_at: number;
  deleted_at: number;
  email: string;
  id: number;
  image_url: string;
  is_imported: boolean;
  is_valid_user: boolean;
  became_valid_user_at?: number;
  language: string;
  level_uid: string;
  phone: string;
  refer_code: string;
  refer_code_used: string;
  refer_code_user_clerk_id: string;
  uid: string;
  updated_at: number;
  username: string;
  display_username: string;
  gender?: string;
  role?: string;
  relationship_level?: number;
}

export interface Comments {
  data: {
    type: "embedded" | "flat";
    posts_embeded: Array<{
      post: Post;
      comments_in_timeline: Pagination<Post>;
    }>;
    posts_flat: Post[];
  };
  total: number;
  page: number;
  page_size: number;
  total_pages: number;
}

export interface Post {
  id: number;
  uid: string;
  created_at: number;
  updated_at: number;
  deleted_at: number;
  user_clerk_id: string;
  user: PostUser;
  title: string;
  title_translate: Translation;
  content: string;
  content_translate: Translation;
  fund_purchase_uid: number | null;
  fund_purchase: FundPurchaseRecord | null;
  position: Position | null;
  position_uid: number | null;
  latest_price: string;
  parent_post_uid: number | null;
  parent_post: Post | null;
  at_post_uid: number | null;
  comment_count: number;
  total_comment_count: number;
  comments: Comments;
  view_count: number;
  view_count_platform: number;
  like_count: number;
  like_count_platform: number;
  share_count: number;
  share_count_platform: number;
  is_nsfw_content?: boolean;
  is_nsfw_reason?: string;
  is_deleted: boolean;
  is_deleted_reason: string;
  is_featured: boolean;
  is_featured_reason: string;
  is_recommended: boolean;
  manual_review_status: string;
  manual_review_reason: string;
  posted_at: number;
  edited_at: number;
  is_liked_by_current_user: boolean;
  source_language: string;
}

export interface CreatePostRequest {
  title?: string;
  content: string;
  fund_purchase_uid?: string;
  position_uid?: string;
  parent_post_uid?: string;
  latest_price?: string;
  at_post_uid?: string;
}

export interface DeletePostRequest {
  post_uid: string;
  delete: boolean;
}

export type PostListResponse = ApiResponse<Pagination<Post>>;

export type PostDetailResponse = ApiResponse<Post>;

export interface TranslatePostRequest {
  post_uid: string;
  lang: string;
}

export type TranslatePostResponse = ApiResponse<Post>;
