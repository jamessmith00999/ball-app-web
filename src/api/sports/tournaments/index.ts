import sportsApi from "@/api/sports/sports-api";

import type { GetTournamentsResponse } from "./types";

export async function getTournaments({
  sportId,
  statusIds,
  startTsInS,
  endTsInS,
}: {
  sportId: number;
  statusIds: string;
  startTsInS: number;
  endTsInS: number;
}) {
  const response = await sportsApi.get<GetTournamentsResponse>(
    "/api/v1/public/tournaments",
    {
      params: {
        sport_id: sportId,
        status_ids: statusIds,
        start_ts_in_s: startTsInS,
        end_ts_in_s: endTsInS,
      },
    }
  );
  return response.data;
}
