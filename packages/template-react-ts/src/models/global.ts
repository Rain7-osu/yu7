import { fetchIncrement } from '../services/fetchIncrement';
import { Model } from './types';

export interface GlobalState {
  currentCount: number;
}

export const initState: GlobalState = {
  currentCount: 0,
};

const model: Model<GlobalState> = {
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
      const currentValue = yield select(({ global }: { global: GlobalState }) => global.currentCount);
      const res = yield fetchIncrement(currentValue);
      yield put({
        type: 'increment',
        payload: res,
      });
    },
  },
};

export default model;
