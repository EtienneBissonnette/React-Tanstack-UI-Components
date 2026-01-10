export interface ApiErrorResponse {
  message: string
  statusCode: number
  detail?: string
}

export interface ApiRequestOptions {
  endpoint: string
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
  body?: unknown
  headers?: Record<string, string>
}

const BASE_URL = import.meta.env.VITE_API_URL ?? '/api'

export async function apiClient<T>({
  endpoint,
  method = 'GET',
  body,
  headers = {},
}: ApiRequestOptions): Promise<T> {
  const config: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    credentials: 'include',
  }

  if (body) {
    config.body = JSON.stringify(body)
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, config)

  if (!response.ok) {
    const error: ApiErrorResponse = await response.json().catch(() => ({
      message: response.statusText,
      statusCode: response.status,
    }))
    throw error
  }

  if (response.status === 204) {
    return undefined as T
  }

  return response.json()
}
