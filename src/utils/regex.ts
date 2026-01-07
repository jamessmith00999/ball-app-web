export const isInputDigit = (value: string) =>
  /^(\d*(\.\d*)?|\.\d+)$/.test(value);

export const isDigit = (value: string) => /^\d+(\.\d+)?$/.test(value);

export const isDigitWithNegative = (value: string) =>
  /^-?\d+(\.\d+)?$/.test(value);

export const isInteger = (value: string) => /^\d+$/.test(value);

export const isLetterAndDigit = (value: string) => /^[a-zA-Z0-9]+$/.test(value);

export const isValidPassword = (value: string) =>
  value.length >= 8 &&
  /[a-z]/.test(value) &&
  /[A-Z]/.test(value) &&
  /[0-9]/.test(value);

export const removePrefix0 = (value: string) => {
  if (!isDigit(value)) return value;
  if (Number(value) === 0 && !value.includes(".")) return "0";
  else {
    if (value.includes(".")) {
      if (!value.startsWith(".")) {
        return value;
      }
      return value.replace(/^0+/, "0");
    }
    return value.replace(/^0+/, "");
  }
};

export const isMaxDecimals = (_value: string, _decimals: number) => {
  const value = String(_value);
  const decimals = Number(_decimals ?? 0);
  if (!value.includes(".")) {
    return true;
  }
  const splits = value.split(".");
  if (decimals === 0) {
    return false;
  }
  const num = splits[1].length;
  return decimals >= num;
};
