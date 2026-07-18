import type { PageInfo } from './page-info';
import type { XiangqiMatchItem } from './xiangqi-match-item';

export interface XiangqiMatchListData {
  items: XiangqiMatchItem[];
  pageInfo: PageInfo;
}
