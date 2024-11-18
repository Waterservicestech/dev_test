export type ServiceMessage = { message: string };

type ServiceResponseErrorType = 'INVALID_DATA' | 'INTERNAL_ERROR';

export type ServiceResponseError = {
  status: ServiceResponseErrorType,
  data: ServiceMessage
};

export type ServiceResponseSuccess<T> = {
  status: 'CREATED',
  data: T
};

export type ServiceResponse<T> = ServiceResponseError | ServiceResponseSuccess<T>;