/**
 * Base error class for API-specific errors
 */
export class ApiError extends Error {
  constructor(
    public readonly statusCode: number,
    message: string,
    public readonly details?: Record<string, unknown>
  ) {
    super(message);
    this.name = "ApiError";
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Error class for request validation failures
 */
export class ValidationError extends ApiError {
  constructor(message: string, details?: Record<string, unknown>) {
    super(400, message, details);
    this.name = "ValidationError";
  }
}

/**
 * Error class for resource not found errors
 */
export class NotFoundError extends ApiError {
  constructor(
    resource: string,
    identifier: string | number,
    details?: Record<string, unknown>
  ) {
    super(404, `${resource} with id ${identifier} not found`, details);
    this.name = "NotFoundError";
  }
}

/**
 * Error response interface for consistent error formatting
 */
export interface ErrorResponse {
  error: string;
  details?: Record<string, unknown>;
  statusCode: number;
}