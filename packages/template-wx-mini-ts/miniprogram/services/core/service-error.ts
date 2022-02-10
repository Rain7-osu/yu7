export class ServiceError {
  private readonly _status: number;

  private readonly _message: string;

  constructor(status: number, message: string) {
    this._status = status;
    this._message = message;
  }

  get status() {
    return this._status;
  }

  get message() {
    return this._message;
  }

  toString() {
    const status = this._status;
    let errDetail: string;

    if (status >= 500) {
      errDetail = 'Internal Server Error';
    } else if (status >= 400 && status < 500) {
      errDetail = 'Bad Request';
    } else if (status >= 300 && status < 400) {
      errDetail = 'Redirect';
    } else {
      errDetail = 'Unknown Error';
    }

    return `${this._status} ${errDetail} ${this._message}`;
  }
}

export class BizError {
  private readonly _code: number;

  private readonly _message: string;

  constructor(code: number, message: string) {
    this._code = code;
    this._message = message;
  }

  get code() {
    return this._code;
  }

  get message() {
    return this._message;
  }

  toString() {
    return `${this._code} ${this._message}`;
  }
}
