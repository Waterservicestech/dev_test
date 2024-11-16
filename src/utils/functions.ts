export const wait = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export function mapErrorToStatusCode(errorCode: string): number {
  const errorMapping: Record<string, number> = {
    EMAIL_ALREADY_REGISTERED: 400,
    INVALID_INPUT: 400,
    NOT_FOUND: 404,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    CONFLICT: 409,
    SERVER_ERROR: 500,
  };

  return errorMapping[errorCode] || 500;
}
