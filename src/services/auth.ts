import bcrypt from 'bcryptjs'
import { apiRequest, setTokens, clearTokens, getAccessToken } from './api'
import type { KibbeResult } from '../pages/test/types'

export interface AuthUser {
  id: string
  email: string
  name?: string
  role?: 'User' | 'Moderator' | 'Admin'
  status?: 'Active' | 'Inactive' | 'Banned' | 'Suspended'
  kibbeResult?: KibbeResult
}

interface TokensResponse {
  accessToken: string
  refreshToken: string
}

interface RegisterResponse {
  Id: string
  Role: 'User' | 'Moderator' | 'Admin'
  Status: 'Active' | 'Inactive' | 'Banned' | 'Suspended'
  CreatedAt: string
  UpdatedAt: string
}


const BCRYPT_SALT_ROUNDS = 10

const hashPassword = async (password: string): Promise<string> => {
  return bcrypt.hash(password, BCRYPT_SALT_ROUNDS)
}


const USER_DATA_KEY = 'zm_user_data'

const saveUserData = (user: AuthUser) => {
  localStorage.setItem(USER_DATA_KEY, JSON.stringify(user))
}

const loadUserData = (): AuthUser | null => {
  try {
    const raw = localStorage.getItem(USER_DATA_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

const clearUserData = () => {
  localStorage.removeItem(USER_DATA_KEY)
}


export const register = async (
  email: string,
  password: string,
  name?: string
): Promise<AuthUser> => {
  if (!email || !password) {
    throw new Error('Email и пароль обязательны')
  }
  if (password.length < 6) {
    throw new Error('Пароль должен быть не короче 6 символов')
  }

  
  const passwordHash = await hashPassword(password)

  // 1. Регистрация
  const registerResponse = await apiRequest<RegisterResponse>('/auth/register', {
    method: 'POST',
    body: JSON.stringify({
      Email: email.toLowerCase().trim(),
      Password: passwordHash,
    }),
  })

  
  await login(email, password)

  
  const user: AuthUser = {
    id: registerResponse.Id,
    email: email.toLowerCase().trim(),
    name: name?.trim() || undefined,
    role: registerResponse.Role,
    status: registerResponse.Status,
  }

  saveUserData(user)
  return user
}


export const login = async (
  email: string,
  password: string
): Promise<AuthUser> => {
  if (!email || !password) {
    throw new Error('Email и пароль обязательны')
  }


  const tokens = await apiRequest<TokensResponse>('/auth/login', {
    method: 'POST',
    body: JSON.stringify({
      Email: email.toLowerCase().trim(),
      Password: password,
    }),
  })

  setTokens(tokens.accessToken, tokens.refreshToken)

  
  const existing = loadUserData()
  const user: AuthUser = existing && existing.email === email.toLowerCase().trim()
    ? existing
    : { id: 'unknown', email: email.toLowerCase().trim() }

  saveUserData(user)
  return user
}


export const logout = () => {
  clearTokens()
  clearUserData()
}


export const getCurrentUser = async (): Promise<AuthUser | null> => {
  if (!getAccessToken()) {
    return null
  }

  try {
    
    const userData = await apiRequest<{
      Id: string
      Role: string
      Status: string
      CreatedAt: number
      UpdatedAt: number
    }>('/users/@me')

    
    const profileData = await apiRequest<{
      Id: string
      FirstName?: string
      SecondName?: string
      Height?: number
      Weight?: number
      Gender?: string
      PhotoURL?: string
      Birthday?: number
      SkinColor?: string
    }>('/profiles/@me')

    
    const user: AuthUser = {
      id: userData.Id,
      email: loadUserData()?.email || 'unknown',  // email из локального кеша наверное 
      name: profileData.FirstName || undefined,
      role: userData.Role as AuthUser['role'],
      status: userData.Status as AuthUser['status'],
      kibbeResult: loadUserData()?.kibbeResult,  // пока локально
    }

    saveUserData(user)
    return user
  } catch {
    clearTokens()
    clearUserData()
    return null
  }
}

export const saveTestResult = async (result: KibbeResult): Promise<AuthUser> => {
  const user = loadUserData()
  if (!user) {
    throw new Error('Пользователь не авторизован')
  }

  const preferences = mapKibbeToPreferences(result)

  try {
    await apiRequest<unknown>('/profiles/@me', {
      method: 'POST',
      body: JSON.stringify({
        Preferences: preferences,
        SkinColor: result.colourSeasonName,  // цветотип в виде строки
      }),
    })
  } catch (err) {
    console.error('Не удалось сохранить на бэк:', err)
    // Не падаем — продолжаем сохранять локально на случай
  }

  
  const updated: AuthUser = { ...user, kibbeResult: result }
  saveUserData(updated)

  return updated
}


const mapKibbeToPreferences = (result: KibbeResult) => {
  const baseType = getBaseType(result.bodyPrimary)
  return {
    Dramatic: baseType === 'dramatic' ? 100 : 0,
    Classic: baseType === 'classic' ? 100 : 0,
    Natural: baseType === 'natural' ? 100 : 0,
    Romantic: baseType === 'romantic' ? 100 : 0,
    Gamin: baseType === 'gamin' ? 100 : 0,
  }
}

const getBaseType = (primary?: string): string => {
  if (!primary) return 'classic'
  const p = primary.toLowerCase()
  if (p.includes('dramatic')) return 'dramatic'
  if (p.includes('natural')) return 'natural'
  if (p.includes('romantic')) return 'romantic'
  if (p.includes('gamin')) return 'gamin'
  return 'classic'
}