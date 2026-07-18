import type { XiangqiMatchListData } from './xiangqi-match-list-data';

export interface XiangqiMatchListResponse {
  code: 0;
  data: unknown & XiangqiMatchListData;
  traceId: string;
}
