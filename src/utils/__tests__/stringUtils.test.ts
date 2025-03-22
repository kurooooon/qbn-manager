import { describe, expect, it } from "vitest";
import { isAlphaNumeric, normalizeAlphaNumericText } from "../stringUtils";

describe("isAlphaNumeric", () => {
  it("英数字のみの文字列の場合trueを返す", () => {
    expect(isAlphaNumeric("abc123")).toBe(true);
    expect(isAlphaNumeric("ABC123")).toBe(true);
    expect(isAlphaNumeric("123456")).toBe(true);
    expect(isAlphaNumeric("abcDEF789")).toBe(true);
  });

  it("英数字以外の文字を含む場合falseを返す", () => {
    expect(isAlphaNumeric("abc-123")).toBe(false);
    expect(isAlphaNumeric("abc 123")).toBe(false);
    expect(isAlphaNumeric("あいうえお")).toBe(false);
    expect(isAlphaNumeric("abc_123")).toBe(false);
    expect(isAlphaNumeric("")).toBe(false); // 空文字列
  });
});

describe("normalizeAlphaNumericText", () => {
  it("全角英数字を半角英数字に変換する", () => {
    expect(normalizeAlphaNumericText("ＡＢＣ１２３")).toBe("ABC123");
    expect(normalizeAlphaNumericText("ａｂｃＡＢＣ１２３")).toBe("abcABC123");
    expect(normalizeAlphaNumericText("１２３４５６７８９０")).toBe(
      "1234567890"
    );
  });

  it("すでに半角の文字はそのまま", () => {
    expect(normalizeAlphaNumericText("ABC123")).toBe("ABC123");
    expect(normalizeAlphaNumericText("abc123")).toBe("abc123");
  });

  it("全角と半角が混在する場合、全角のみ変換する", () => {
    expect(normalizeAlphaNumericText("ABC１２３")).toBe("ABC123");
    expect(normalizeAlphaNumericText("ＡＢＣ123")).toBe("ABC123");
    expect(normalizeAlphaNumericText("ａｂｃABC１２３")).toBe("abcABC123");
  });

  it("英数字以外の文字は変換しない", () => {
    expect(normalizeAlphaNumericText("ＡＢＣ１２３あいうえお")).toBe(
      "ABC123あいうえお"
    );
    expect(normalizeAlphaNumericText("ＡＢＣ　１２３")).toBe("ABC　123"); // 全角スペース
    expect(normalizeAlphaNumericText("ＡＢＣ-１２３")).toBe("ABC-123"); // ハイフン
  });
});
