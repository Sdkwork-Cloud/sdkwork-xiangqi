import { HttpClient, createHttpClient } from './http/client';
import type { SdkworkAppConfig } from './types/common';
import type { AuthTokenManager } from '@sdkwork/sdk-common';

import { XiangqiApi, createXiangqiApi } from './api/xiangqi';

export class SdkworkXiangqiAppClient {
  private httpClient: HttpClient;

  public readonly xiangqi: XiangqiApi;

  constructor(config: SdkworkAppConfig) {
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

export function createClient(config: SdkworkAppConfig): SdkworkXiangqiAppClient {
  return new SdkworkXiangqiAppClient(config);
}

export default SdkworkXiangqiAppClient;
