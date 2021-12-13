import type { EffectsMapObject, SubscriptionsMapObject } from 'dva';
import type { Action } from 'redux';
import { GlobalState } from './global';

export type Reducer<S, A> = (prevState: S, action: A) => S;

export interface ICustomAction<T = any> extends Action {
  [key: string]: any;
  type: string;
  payload: T;
}

export interface Model<State = any, Payload = any> {
  namespace?: string;
  state?: State;
  reducers?: {
    [key: string]: Reducer<State, ICustomAction<Payload>>;
  };
  effects?: EffectsMapObject;
  subscriptions?: SubscriptionsMapObject;
}

export interface IRootState {
  global: GlobalState;
}
