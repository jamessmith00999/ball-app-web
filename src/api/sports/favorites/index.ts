import type { InPlayMatchesType } from "@/api/sports/inplay";
import sportsApi from "@/api/sports/sports-api";

import type { GetMyFavoritesResponse } from "./types";

export async function getMyFavorites(params: {
  type: InPlayMatchesType;
  sportId: string;
  page: number;
  pageSize: number;
}) {
  const response = await sportsApi.get<GetMyFavoritesResponse>(
    "/api/v1/client/favorites",
    {
      params: {
        type: params.type,
        sport_id: params.sportId,
        page: params.page,
        page_size: params.pageSize,
      },
    },
  );
  return response.data;
}

export async function addFavorite(matchId: number) {
  const response = await sportsApi.post("/api/v1/client/favorites", {
    match_id: matchId,
  });
  return response.data;
}

export async function removeFavorite(matchId: number) {
  const response = await sportsApi.delete("/api/v1/client/favorites", {
    data: {
      match_id: matchId,
    },
  });
  return response.data;
}
