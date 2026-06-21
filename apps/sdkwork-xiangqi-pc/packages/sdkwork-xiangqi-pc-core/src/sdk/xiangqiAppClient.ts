/// <reference types="vite/client" />

import {
  createClient,
  type SdkworkXiangqiAppClient,
  type SdkworkAppConfig,
} from '@sdkwork-internal/xiangqi-app-sdk-generated';

const DEFAULT_DEV_PRINCIPAL =
  'tenant_id=demo-tenant;user_id=user-1;session_id=session-1;app_id=XIANGQI;auth_level=password';

let cachedClient: SdkworkXiangqiAppClient | null = null;

export function resolveXIANGQIAppSdkConfig(): SdkworkAppConfig {
  const env = import.meta.env;
  const baseUrl =
    env.VITE_sdkwork_xiangqi_APP_API_BASE_URL ??
    env.VITE_xiangqi_API_BASE_URL ??
    (typeof window !== 'undefined' ? window.location.origin : 'http://localhost:8098');
  const principal =
    env.VITE_xiangqi_DEV_PRINCIPAL ?? env.SDKWORK_ACCESS_TOKEN ?? DEFAULT_DEV_PRINCIPAL;

  return {
    baseUrl,
    authToken: `Bearer ${principal}`,
    accessToken: principal,
  };
}

export function getXIANGQIAppClient(): SdkworkXiangqiAppClient {
  if (!cachedClient) {
    cachedClient = createClient(resolveXIANGQIAppSdkConfig());
  }
  return cachedClient;
}

export function resetXIANGQIAppClient(): void {
  cachedClient = null;
}
