export class AppError extends Error {
  readonly code: string;
  readonly statusCode?: number;

  constructor(message: string, code: string, statusCode?: number) {
    super(message);
    this.name = this.constructor.name;
    this.code = code;
    this.statusCode = statusCode;
  }
}

export class ApiError extends AppError {
  readonly detail?: unknown;

  constructor(message: string, statusCode: number, detail?: unknown) {
    super(message, 'API_ERROR', statusCode);
    this.detail = detail;
  }
}

export class VerifyEmailError extends AppError {
  constructor() {
    super('Email verification required', 'VERIFY_EMAIL', 403);
  }
}

export class InvalidTokenError extends AppError {
  constructor() {
    super('Token is invalid or expired', 'INVALID_TOKEN', 400);
  }
}
