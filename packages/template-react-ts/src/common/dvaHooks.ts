import { Dispatch } from 'redux';
import {
  useSelector as useDvaSelector,
  useDispatch as useDvaDispatch,
} from 'dva';
import { ICustomAction, IRootState } from '../models/types';

export const useSelector = <TState = IRootState, TSelected = unknown>(
  selector: (state: TState) => TSelected,
  equalityFn?: (left: TSelected, right: TSelected) => boolean,
) => {
  return useDvaSelector(selector, equalityFn);
};

export const useDispatch = (): Dispatch<ICustomAction> => {
  return useDvaDispatch();
};
