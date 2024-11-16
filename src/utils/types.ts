export type Result<T> = {
  success: boolean;
  data?: T;
  error?: {
    message: string;
    code: string;
  };
};
