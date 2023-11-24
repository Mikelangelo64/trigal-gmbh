import { Timeline } from 'vevet';

export interface IState {
  isCanScrollUp: boolean;
  isCanScrollDown: boolean;
  isCanScrolling: boolean;
  isNavigationEvent: boolean;
  scrollingIndex: number;
  previousIndex: number;
  timelines: Timeline[];
  duration: number;
}

export interface ICreateNestedTimelines {
  state: IState;
  differ: number;
  prevIndex: number;
  indexBn: number;
  nestdTmArray: Timeline[];
  isReversed: boolean;
}

export interface IAddNestedCallbacks {
  itemArray: NodeListOf<HTMLElement>;
  buttons: HTMLButtonElement[];
  wrapperProp: HTMLElement;
  timeline: Timeline;
  stateProp: IState;
  prevIndex: number;
  indexTm: number;
  indexBn: number;
  currentTimelineArray: Timeline[];
  isSpecial?: boolean;
}
