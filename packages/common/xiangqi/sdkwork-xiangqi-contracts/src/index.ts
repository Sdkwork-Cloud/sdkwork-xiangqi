import { slugify } from '@sdkwork/utils';

export type XIANGQIMatchStatus = 'draft' | 'published' | 'archived';

export interface XIANGQIMatchSummary {
  id: string;
  matchCode: string;
  title: string;
  status: XIANGQIMatchStatus;
}

export function normalizeMatchCode(title: string): string {
  return slugify(title);
}

export const xiangqi_APP_API_PREFIX = '/app/v3/api';
export const xiangqi_BACKEND_API_PREFIX = '/backend/v3/api';
