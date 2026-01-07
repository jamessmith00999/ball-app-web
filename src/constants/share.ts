/**
 * Share-related constants
 */

// Share URL template - uses official website URL from environment
export const SHARE_BASE_URL = `${import.meta.env.VITE_OFFICIAL_WEBSITE_URL}`;

/**
 * Generate share URL with invitation code
 */
export const getShareUrl = (invitationCode: string): string => {
  return `${SHARE_BASE_URL}?invite_code=${invitationCode}`;
};

/**
 * Social platform URL builders
 */
export const SHARE_PLATFORM_URLS = {
  whatsapp: (message: string) =>
    `whatsapp://send?text=${encodeURIComponent(message)}`,

  facebook: (url: string) =>
    `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,

  telegram: {
    // For ShareArea.tsx style
    url: (url: string, text: string) =>
      `https://t.me/share/url?url=${encodeURIComponent(
        url
      )}&text=${encodeURIComponent(text)}`,
    // For ShareModal.tsx style
    msg: (message: string) => `tg://msg?text=${encodeURIComponent(message)}`,
  },

  x: {
    // For ShareArea.tsx style (single message)
    simple: (message: string) =>
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(message)}`,
    // For ShareModal.tsx style (text + url separated)
    detailed: (text: string, url: string) =>
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        text
      )}&url=${encodeURIComponent(url)}`,
  },
} as const;

/**
 * Share platform types
 */
export type SharePlatform =
  | "whatsapp"
  | "facebook"
  | "telegram"
  | "x"
  | "save-image";
