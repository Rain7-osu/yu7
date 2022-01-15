import { IModel } from './types';

export interface IGlobalState {
  currentCount: number;
}

export const initState: IGlobalState = {
  currentCount: 0,
};

const model: IModel<IGlobalState> = {
  namespace: 'global',
  state: initState,
  reducers: {
    increment(prevState, action) {
      return {
        ...prevState,
        currentCount: action.payload,
      };
    },
  },
  effects: {
    * incrementAsync(_, { put, select }) {
      // do something async
    },
  },
};

export default model;
