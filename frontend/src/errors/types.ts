export class AppError extends Error {
  constructor(
    message: string,
    public readonly code: string,
    public readonly statusCode?: number
  ) {
    super(message)
    this.name = this.constructor.name
  }
}

export class ApiError extends AppError {
  constructor(
    message: string,
    statusCode: number,
    public readonly detail?: unknown
  ) {
    super(message, 'API_ERROR', statusCode)
  }
}

export class VerifyEmailError extends AppError {
  constructor() {
    super('Email verification required', 'VERIFY_EMAIL', 403)
  }
}

export class InvalidTokenError extends AppError {
  constructor() {
    super('Token is invalid or expired', 'INVALID_TOKEN', 400)
  }
}
