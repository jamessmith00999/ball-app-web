import { futuresApi } from "@/api/futures/futures-api";

import type {
  CreatePostRequest,
  DeletePostRequest,
  PostDetailResponse,
  PostListResponse,
  TranslatePostRequest,
  TranslatePostResponse,
} from "./types";

export * from "./types";

export async function getPostList(params: {
  page: number;
  page_size: number;
  post_uid?: string;
  user_id?: string;
  featured_only?: boolean;
  is_recommended?: boolean;
  newest?: boolean;
  comment_only?: boolean;
  post_only?: boolean;
}): Promise<PostListResponse> {
  const queryParams = new URLSearchParams({
    page: params.page.toString(),
    page_size: params.page_size.toString(),
    ...(params.post_uid ? { post_uid: params.post_uid } : {}),
    ...(params.user_id ? { user_id: params.user_id } : {}),
    ...(params.featured_only
      ? { featured_only: params.featured_only.toString() }
      : {}),
    ...(params.newest ? { newest: params.newest.toString() } : {}),
    ...(params.comment_only
      ? { comment_only: params.comment_only.toString() }
      : {}),
    ...(params.post_only ? { post_only: params.post_only.toString() } : {}),
    ...(params.is_recommended
      ? { is_recommended: params.is_recommended.toString() }
      : {}),
  });

  const response = await futuresApi.get<PostListResponse>(
    `/api/v1/post/list?${queryParams.toString()}`,
  );
  return response.data;
}

export async function getPublicPostList(params: {
  page: number;
  page_size: number;
  post_uid?: string;
  user_id?: string;
  featured_only?: boolean;
  newest?: boolean;
  comment_only?: boolean;
  post_only?: boolean;
}): Promise<PostListResponse> {
  const queryParams = new URLSearchParams({
    page: params.page.toString(),
    page_size: params.page_size.toString(),
    ...(params.post_uid ? { post_uid: params.post_uid } : {}),
    ...(params.user_id ? { user_id: params.user_id } : {}),
    ...(params.featured_only
      ? { featured_only: params.featured_only.toString() }
      : {}),
    ...(params.newest ? { newest: params.newest.toString() } : {}),
    ...(params.comment_only
      ? { comment_only: params.comment_only.toString() }
      : {}),
    ...(params.post_only ? { post_only: params.post_only.toString() } : {}),
  });
  const response = await futuresApi.get<PostListResponse>(
    `/api/v1/post/public/list?${queryParams.toString()}`,
  );
  return response.data;
}

export async function createPost(
  request: CreatePostRequest,
): Promise<PostListResponse> {
  const response = await futuresApi.post<PostListResponse>(
    "/api/v1/post/create",
    request,
  );
  return response.data;
}

export async function deletePost(request: DeletePostRequest): Promise<void> {
  await futuresApi.post("/api/v1/post/update", request);
}

export async function getPostDetail(
  postUid: string,
  params?: {
    comment_in_timeline?: boolean;
    comment_page?: number;
    comment_page_size?: number;
    should_increment_view_count?: boolean;
  },
): Promise<PostDetailResponse> {
  const queryParams = new URLSearchParams({
    ...(params?.comment_in_timeline !== undefined
      ? { comment_in_timeline: params.comment_in_timeline.toString() }
      : {}),
    ...(params?.comment_page !== undefined
      ? { comment_page: params.comment_page.toString() }
      : {}),
    ...(params?.comment_page_size !== undefined
      ? { comment_page_size: params.comment_page_size.toString() }
      : {}),
    ...(params?.should_increment_view_count !== undefined
      ? {
          should_increment_view_count:
            params.should_increment_view_count.toString(),
        }
      : {}),
  });

  const response = await futuresApi.get<PostDetailResponse>(
    `/api/v1/post/list/${postUid}${`?${queryParams.toString()}`}`,
  );
  return response.data;
}

export async function getPublicPostDetail(
  postUid: string,
  params?: {
    comment_in_timeline?: boolean;
    comment_page?: number;
    comment_page_size?: number;
  },
): Promise<PostDetailResponse> {
  const queryParams = new URLSearchParams({
    ...(params?.comment_in_timeline !== undefined
      ? { comment_in_timeline: params.comment_in_timeline.toString() }
      : {}),
    ...(params?.comment_page !== undefined
      ? { comment_page: params.comment_page.toString() }
      : {}),
    ...(params?.comment_page_size !== undefined
      ? { comment_page_size: params.comment_page_size.toString() }
      : {}),
  });

  const response = await futuresApi.get<PostDetailResponse>(
    `/api/v1/post/public/list/${postUid}${`?${queryParams.toString()}`}`,
  );
  return response.data;
}

export async function translatePost(
  request: TranslatePostRequest,
): Promise<TranslatePostResponse> {
  const response = await futuresApi.post<TranslatePostResponse>(
    "/api/v1/post/translate",
    request,
  );
  return response.data;
}

export async function likePost(postUId: string): Promise<void> {
  await futuresApi.post("/api/v1/post/like", { post_uid: postUId });
}

export async function viewPost(postUId: string): Promise<void> {
  await futuresApi.post(`/api/v1/post/view/${postUId}`);
}

export async function sharePost(request: {
  post_uid: string;
  destination: string;
}): Promise<void> {
  await futuresApi.post("/api/v1/post/share", request);
}
