import type { ApiResponse, Pagination } from "@/api/base-api-type";
import type { Match } from "@/api/sports/matches/types";

export type GetMyFavoritesResponse = ApiResponse<Pagination<Match>>;
