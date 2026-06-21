import { HttpClient, createHttpClient } from './http/client';
import type { SdkworkBackendConfig } from './types/common';
import type { AuthTokenManager } from '@sdkwork/sdk-common';

import { XiangqiApi, createXiangqiApi } from './api/XIANGQI';

export class SdkworkXiangqiBackendClient {
  private httpClient: HttpClient;

  public readonly xiangqi: XiangqiApi;

  constructor(config: SdkworkBackendConfig) {
    this.httpClient = createHttpClient(config);
    this.xiangqi = createXiangqiApi(this.httpClient);
  }
  setAuthToken(token: string): this {
    this.httpClient.setAuthToken(token);
    return this;
  }

  setAccessToken(token: string): this {
    this.httpClient.setAccessToken(token);
    return this;
  }

  setTokenManager(manager: AuthTokenManager): this {
    this.httpClient.setTokenManager(manager);
    return this;
  }

  get http(): HttpClient {
    return this.httpClient;
  }
}

export function createClient(config: SdkworkBackendConfig): SdkworkXiangqiBackendClient {
  return new SdkworkXiangqiBackendClient(config);
}

export default SdkworkXiangqiBackendClient;
