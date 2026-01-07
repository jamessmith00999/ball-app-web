import {
  emailOTPClient,
  oneTimeTokenClient,
  phoneNumberClient,
  twoFactorClient,
} from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";
import type { User as BetterAuthUser } from "better-auth/types";

import config from "@/config";

/**
 * Extended User type with optional phone number support and custom fields
 */
export interface User extends BetterAuthUser {
  phoneNumber?: string;
  phoneNumberVerified?: boolean;
  birthday?: string;
  gender?: "male" | "female";
}

export const authClient = createAuthClient({
  baseURL: config.betterAuthUrl,
  emailAndPassword: {
    enabled: true,
  },
  phoneNumber: {
    enabled: true,
  },
  plugins: [
    emailOTPClient(),
    phoneNumberClient(),
    oneTimeTokenClient(),
    twoFactorClient({
      onTwoFactorRedirect: () => {
        // Redirect to 2FA verification page
        window.location.href = "/verify-2fa";
      },
    }),
  ],
});

export const { useSession } = authClient;

export const useAuth = () => {
  const signOut = async () => {
    await authClient.signOut();
  };

  const { data: session, isPending, refetch } = useSession();

  // Provide a getToken function for compatibility with existing code
  // Note: In Better Auth, tokens are handled by the axios interceptor
  // but some components still call getToken manually
  const getToken = async () => {
    if (!session?.user) return null;
    const { data: tokenData } = await authClient.oneTimeToken.generate();
    return tokenData?.token || null;
  };

  return {
    session,
    user: session?.user,
    isAuthenticated: Boolean(session?.user),
    isLoading: isPending,
    signOut,
    refetch,
    getToken,
    sessionId: session?.session?.id,
  } as const;
};

export const useUser = () => {
  const { data: session, isPending } = useSession();

  return {
    user: session?.user,
    isLoaded: !isPending,
    isSignedIn: Boolean(session?.user),
    isLoading: isPending,
  };
};

/**
 * Generate a one-time token for API authentication
 * Used by API interceptors to authenticate requests
 *
 * @returns {Promise<string | null>} One-time token or null if not authenticated
 */
export async function getOneTimeToken(): Promise<string | null> {
  const { data: session } = await authClient.getSession();

  if (!session?.user) {
    return null;
  }

  const { data: tokenData, error: tokenError } =
    await authClient.oneTimeToken.generate();

  if (tokenError || !tokenData?.token) {
    console.error("Failed to generate one-time token:", tokenError);
    return null;
  }

  return tokenData.token;
}
