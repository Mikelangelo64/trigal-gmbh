import { Timeline } from 'vevet';

export interface IState {
  isCanScrollUp: boolean;
  isCanScrollDown: boolean;
  isCanScrolling: boolean;
  isNavigationEvent: boolean;
  scrollingIndex: number;
  timelines: Timeline[];
  duration: number;
}
