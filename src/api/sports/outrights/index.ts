import sportsApi from "@/api/sports/sports-api";

import type { GetOutrightsResponse, OutrightsResponse } from "./types";

export async function getOutrightsMatches({
  sportId,
  statusIds,
}: {
  sportId: number;
  statusIds: string;
}) {
  try {
    const response = await sportsApi.get<GetOutrightsResponse>(
      "/api/v1/public/outrights/locations",
      {
        params: {
          sport_id: sportId,
          status_ids: statusIds,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching outrights matches:", error);
    throw error;
  }
}

export async function getOutrights({
  tournamentIds,
  sportId,
  statusIds,
}: {
  tournamentIds: string;
  sportId: number;
  statusIds: number;
}) {
  const response = await sportsApi.get<OutrightsResponse>(
    `/api/v1/public/outrights`,
    {
      params: {
        sport_id: sportId,
        status_ids: statusIds,
        tournament_ids: tournamentIds,
      },
    }
  );
  return response.data;
}
