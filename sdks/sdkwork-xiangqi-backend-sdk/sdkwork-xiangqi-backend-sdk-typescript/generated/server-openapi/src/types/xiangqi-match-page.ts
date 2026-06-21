import type { XiangqiMatchItem } from './xiangqi-match-item';

export interface XiangqiMatchPage {
  items: XiangqiMatchItem[];
  total: number;
  page: number;
  pageSize: number;
}
