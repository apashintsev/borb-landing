export type ApiResult<T> = {
  success: boolean;
  payload: T;
  errors: string[];
};

export type ApiResponse<T> = Promise<AxiosResponse<ApiResult<T>>>;