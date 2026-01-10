import type { ApiErrorResponse } from '@/lib/api-client'

export const isVerifyEmailError = (error: ApiErrorResponse): boolean =>
  error.statusCode === 403 && error.detail === 'EMAIL_NOT_VERIFIED'

export const isInvalidTokenError = (error: ApiErrorResponse): boolean =>
  error.statusCode === 400 && error.detail === 'INVALID_TOKEN'

export const isApiError = (error: unknown): error is ApiErrorResponse =>
  typeof error === 'object' && error !== null && 'statusCode' in error
