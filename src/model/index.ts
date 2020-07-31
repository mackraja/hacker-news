export interface Alert {
  message: string,
  statusCode: number,
  error?: string,
}

export enum ActionType {
  ALERT,
  GET_HACKER_NEWS,
}

export interface Action<T> {
  type: ActionType;
  payload: T;
}