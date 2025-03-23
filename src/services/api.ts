/**
 * API通信の共通ユーティリティ
 */
import qs from "qs";

// 環境変数からベースURLを取得
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  "https://us-central1-compass-hr.cloudfunctions.net";

/**
 * APIリクエストを実行する共通関数
 * @param endpoint APIエンドポイント（/から始まるパス）
 * @param params URLパラメータ
 * @param options fetchオプション
 * @returns APIレスポンス
 */
async function apiRequest<T>(
  endpoint: string,
  params?: Record<string, string | number | boolean | undefined>,
  options: RequestInit = {}
): Promise<T> {
  const queryString = qs.stringify(params || {});
  const url = `${API_BASE_URL}${endpoint}${queryString}`;

  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  });

  if (!response.ok) {
    const errorText = await response.text().catch(() => "Unknown error");
    throw new Error(`API error: ${response.status} - ${errorText}`);
  }

  return response.json();
}

/**
 * GET リクエストを実行
 * @param endpoint APIエンドポイント
 * @param params URLパラメータ
 * @returns APIレスポンス
 */
export function get<T>(
  endpoint: string,
  params?: Record<string, string | number | boolean | undefined>
): Promise<T> {
  return apiRequest<T>(endpoint, params, { method: "GET" });
}
