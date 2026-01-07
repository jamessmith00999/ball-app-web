import sportsApi from "@/api/sports/sports-api";

import type { GetPublicHelpResponse } from "./types";

/**
 * Get help information including FAQs, announcements, game rules, etc.
 */
export async function getHelp({ lang }: { lang: string }) {
  const response = await sportsApi.get<GetPublicHelpResponse>(
    "/api/v1/public/help-center",
    {
      params: {
        lang,
      },
    },
  );
  return response.data;
}
