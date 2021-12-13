import { Dispatch } from 'redux';
import {
  useSelector as _useSelector,
  useDispatch as _useDispatch,
} from 'dva';
import { ICustomAction, IRootState } from '../models/types';

export const useSelector = <TState = IRootState, TSelected = unknown>(
  selector: (state: TState) => TSelected,
  equalityFn?: (left: TSelected, right: TSelected) => boolean,
) => {
  return _useSelector(selector, equalityFn);
};

export const useDispatch = (): Dispatch<ICustomAction> => {
  return _useDispatch();
};
