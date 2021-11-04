import { AxiosRequestConfig } from 'axios';

export interface DataProps<T> {
  data?: T;
  items?: T[];
  totalItems?: number;
  message?: string;
  [key: string]: any;
}

export interface RequestParams {
  url: string;
  config?: AxiosRequestConfig;
  payload?: any;
  options?: {
    clearData?: boolean;
    showMessage?: boolean;
  };
}

export interface Request<T> {
  (params: RequestParams): Promise<DataProps<T>>;
}

export interface UseFetchResponse<T> {
  response?: DataProps<T>;
  loading: boolean;
  error?: string | boolean;
  clearData: VoidFunction;
  get: Request<T>;
  post: Request<T>;
  put: Request<T>;
  patch: Request<T>;
  del: Request<T>;
}
