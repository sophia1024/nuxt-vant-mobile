import type { AuthLoginResponse, PointsRule, UserBalance, UserInfo, UserStatistics } from '~/constants/auth'
import { getHttp } from './http'

export async function checkLoginStatus(): Promise<{ code: number, msg: string, data: { hasLogin: boolean } }> {
  const http = getHttp()
  return await http('/api/auth/hasLogin', {
    method: 'GET',
  })
}

export async function sendEmailCaptcha(emailAddress: string): Promise<{ code: number, msg: string, data: string }> {
  const http = getHttp()
  return await http('/api/hibackend/h5InitPage/sendMailCaptcha', {
    method: 'POST',
    body: {
      emailAddress,
      sendSource: 'normal',
    },
  })
}

export async function getPointsRule(code: string): Promise<{ code: number, msg: string, data: PointsRule }> {
  const http = getHttp()
  return await http(`/api/hibackend/pointsRule/backend/detailByCode/${code}`, {
    method: 'GET',
  })
}

export async function registerUser(params: {
  emailAddress: string
  captchaCode: string
  evaluateType: string
  isoCountryCode: string
  age: number
  source?: string
}): Promise<{ code: number, msg: string, data: AuthLoginResponse }> {
  const http = getHttp()
  return await http('/api/auth/h5Register', {
    method: 'POST',
    body: {
      emailAddress: params.emailAddress,
      captchaCode: params.captchaCode,
      evaluateType: params.evaluateType,
      isoCountryCode: params.isoCountryCode,
      age: params.age,
      source: params.source || '',
    },
  })
}

export async function getUserInfo(): Promise<{ code: number, msg: string, data: UserInfo }> {
  const http = getHttp()
  return await http('/api/hibackend/h5InitPage/getInfoByh5', {
    method: 'GET',
  })
}

export async function getUserBalance(): Promise<{ code: number, msg: string, data: UserBalance }> {
  const http = getHttp()
  return await http('/api/hibackend/myStatistics/myBalance', {
    method: 'GET',
  })
}

export async function getUserStatistics(): Promise<{ code: number, msg: string, data: UserStatistics }> {
  const http = getHttp()
  return await http('/api/hibackend/myStatistics/my', {
    method: 'GET',
  })
}
