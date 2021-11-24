export interface IParams {
  [key: string]: any;
}

export interface IBody {
  [key: string]: any;
}

export interface IHeaders {
  [key: string]: any;
}

export interface IResponse<T> {
  flag: boolean;
  code: number;
  message: string;
  data: T;
}
