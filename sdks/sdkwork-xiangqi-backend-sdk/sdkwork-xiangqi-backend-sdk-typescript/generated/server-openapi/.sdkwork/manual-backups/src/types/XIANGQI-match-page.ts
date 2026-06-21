import type { XiangqiMatchItem } from './XIANGQI-match-item';

export interface XiangqiMatchPage {
  items: XiangqiMatchItem[];
  total: number;
  page: number;
  pageSize: number;
}
