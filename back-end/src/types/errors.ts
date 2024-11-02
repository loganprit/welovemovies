/**
 * Custom error class for API-specific errors
 */
export class ApiError extends Error {
  constructor(
    public statusCode: number,
    message: string,
    public details?: unknown
  ) {
    super(message);
    this.name = "ApiError";
  }
}

/**
 * Custom error class for validation errors
 */
export class ValidationError extends ApiError {
  constructor(message: string, details?: unknown) {
    super(400, message, details);
    this.name = "ValidationError";
  }
}

/**
 * Custom error class for not found errors
 */
export class NotFoundError extends ApiError {
  constructor(resource: string, id: string | number) {
    super(404, `${resource} with id ${id} not found`);
    this.name = "NotFoundError";
  }
}

/**
 * Type for error response structure
 */
export interface ErrorResponse {
  error: string;
  details?: unknown;
  statusCode: number;
}
