/**
 * 英数字のみかどうかを判定する関数
 */
export const isAlphaNumeric = (text: string): boolean => {
  return /^[a-zA-Z0-9]+$/.test(text);
};

/**
 * 全角英数字を半角英数字に変換する関数
 */
export const normalizeAlphaNumericText = (text: string) => {
  return text.replace(/[Ａ-Ｚａ-ｚ０-９]/g, (s) => {
    return String.fromCharCode(s.charCodeAt(0) - 0xfee0);
  });
};
