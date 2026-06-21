import { appApiPath } from './paths';
import type { HttpClient } from '../http/client';

import type { XiangqiHealthResponse } from '../types';


export class HealthXiangqiReadyApi {
  private client: HttpClient;

  constructor(client: HttpClient) {
    this.client = client;
  }


async check(): Promise<XiangqiHealthResponse> {
    return this.client.get<XiangqiHealthResponse>(appApiPath(`/system/ready`));
  }
}

export class HealthXiangqiHealthApi {
  private client: HttpClient;

  constructor(client: HttpClient) {
    this.client = client;
  }


async check(): Promise<XiangqiHealthResponse> {
    return this.client.get<XiangqiHealthResponse>(appApiPath(`/system/health`));
  }
}

export class HealthXiangqiApi {
  private client: HttpClient;
  public readonly health: HealthXiangqiHealthApi;
  public readonly ready: HealthXiangqiReadyApi;

  constructor(client: HttpClient) {
    this.client = client;
    this.health = new HealthXiangqiHealthApi(client);
    this.ready = new HealthXiangqiReadyApi(client);
  }

}

export class HealthApi {
  private client: HttpClient;
  public readonly xiangqi: HealthXiangqiApi;

  constructor(client: HttpClient) {
    this.client = client;
    this.xiangqi = new HealthXiangqiApi(client);
  }

}

export function createHealthApi(client: HttpClient): HealthApi {
  return new HealthApi(client);
}

function appendQueryString(path: string, rawQueryString: string): string {
  const query = rawQueryString.replace(/^\?+/, '');
  if (!query) {
    return path;
  }
  return path.includes('?') ? `${path}&${query}` : `${path}?${query}`;
}
