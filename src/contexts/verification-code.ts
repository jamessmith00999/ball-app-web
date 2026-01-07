import { atom } from "jotai";

// Map of cache key to expiry timestamp
export const verificationCodeExpiryMapAtom = atom<Record<string, number>>({});
