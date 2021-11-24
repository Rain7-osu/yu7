import type { Model } from './types';

export interface GlobalState {
}

export const initState: GlobalState = {

};

const model: Model<GlobalState> = {
  namespace: 'global',
  state: initState,
  reducers: {
  },
  effects: {
  },
};

export default model;
