import type { XiangqiMatchData } from './xiangqi-match-data';

export interface XiangqiMatchResponse {
  code: 0;
  data: unknown & XiangqiMatchData;
  traceId: string;
}
