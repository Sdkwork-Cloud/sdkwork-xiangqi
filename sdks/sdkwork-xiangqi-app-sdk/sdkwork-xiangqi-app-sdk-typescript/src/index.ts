import {
  createClient as createGeneratedAppClient,
  SdkworkXiangqiAppClient,
} from '../generated/server-openapi/src/index';
import type { SdkworkAppConfig } from '../generated/server-openapi/src/types/common';

export { SdkworkXiangqiAppClient, createGeneratedAppClient };
export type { SdkworkAppConfig };
export * from '../generated/server-openapi/src/types';
export * from '../generated/server-openapi/src/api';
export * from '../generated/server-openapi/src/http';
export * from '../generated/server-openapi/src/auth';

export type SdkworkAppClient = SdkworkXiangqiAppClient;

export function createClient(config: SdkworkAppConfig): SdkworkAppClient {
  return createGeneratedAppClient(config);
}
