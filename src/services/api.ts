
const API_URL = import.meta.env.VITE_API_URL || 'https://змстилист.рф/api'


const ACCESS_TOKEN_KEY = 'zm_access_token'
const REFRESH_TOKEN_KEY = 'zm_refresh_token'


export const setTokens = (accessToken: string, refreshToken: string) => {
  localStorage.setItem(ACCESS_TOKEN_KEY, accessToken)
  localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken)
}

export const getAccessToken = (): string | null => {
  return localStorage.getItem(ACCESS_TOKEN_KEY)
}

export const getRefreshToken = (): string | null => {
  return localStorage.getItem(REFRESH_TOKEN_KEY)
}

export const clearTokens = () => {
  localStorage.removeItem(ACCESS_TOKEN_KEY)
  localStorage.removeItem(REFRESH_TOKEN_KEY)
}



let isRefreshing = false
let refreshPromise: Promise<boolean> | null = null

const refreshAccessToken = async (): Promise<boolean> => {
  // Если уже идёт обновление в другом запросе — ждём его результат
  if (isRefreshing && refreshPromise) {
    return refreshPromise
  }

  isRefreshing = true
  refreshPromise = (async () => {
    try {
      const refreshToken = getRefreshToken()
      if (!refreshToken) return false

      const response = await fetch(`${API_URL}/auth/refresh`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken }),
      })

      if (!response.ok) {
        clearTokens()
        return false
      }

      const data = await response.json()
      setTokens(data.accessToken, data.refreshToken)
      return true
    } catch {
      clearTokens()
      return false
    } finally {
      isRefreshing = false
      refreshPromise = null
    }
  })()

  return refreshPromise
}


export const apiRequest = async <T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> => {
  const makeRequest = async (token: string | null): Promise<Response> => {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(options.headers as Record<string, string>),
    }

   
    if (token) {
      headers.Authorization = token
    }

    return fetch(`${API_URL}${endpoint}`, { ...options, headers })
  }

  
  let response = await makeRequest(getAccessToken())

  
  if (response.status === 401 && getRefreshToken()) {
    const refreshed = await refreshAccessToken()
    if (refreshed) {
      response = await makeRequest(getAccessToken())
    }
  }

  if (!response.ok) {
    let errorMessage = 'Ошибка запроса'
    try {
      const errorData = await response.json()
      errorMessage = errorData.error || errorData.message || errorMessage
    } catch {
      // Не смогли распарсить JSON — оставляем дефолтное сообщение
    }
    throw new Error(errorMessage)
  }

  return response.json()
}