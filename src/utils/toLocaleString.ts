import type { BigSource, RoundingMode } from "big.js";
import Big from "big.js";

export default function toLocaleString(
  source: BigSource,
  decimals?: number,
  dp?: RoundingMode
): string {
  if (typeof source === "string") {
    const dest = Number(Big(source).toFixed(decimals, dp));
    return removeTrailingZero(toLocaleString(Number(dest), decimals));
  } else if (typeof source === "number") {
    const dest = Number(Big(source).toFixed(decimals, dp));
    return removeTrailingZero(
      decimals !== undefined
        ? dest.toLocaleString(undefined, {
            maximumFractionDigits: decimals,
            minimumFractionDigits: decimals,
          })
        : dest.toLocaleString()
    );
  } else {
    // Big type
    return removeTrailingZero(
      toLocaleString(
        decimals !== undefined
          ? Number(source.toFixed(decimals, dp))
          : source.toNumber(),
        decimals
      )
    );
  }
}

function removeTrailingZero(num: string): string {
  // Check if the number has a decimal point
  if (num.includes(".")) {
    // Trim trailing zeros from the decimal part
    const trimmed = num.replace(/(\.\d*?[1-9])0+$/, "$1").replace(/\.0*$/, "");
    return trimmed;
  }

  // If there's no decimal point, return the number as is
  return num;
}
