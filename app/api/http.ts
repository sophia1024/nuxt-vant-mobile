import type { $Fetch } from 'ofetch'
import { useRuntimeConfig } from '#app'
import { ofetch } from 'ofetch'
import { storeToRefs } from 'pinia'
import { useLangStore } from '../../store/lang'
import { useUserStore } from '../../store/userStore'
import { aesEncode, isMobile, queryUrl } from '../utils/index'

type HttpStatusErrorHandler = (message: string, statusCode: number) => void
let httpStatusErrorHandler: HttpStatusErrorHandler

let http: $Fetch

export function setupHttp() {
  if (http)
    return http

  const config = useRuntimeConfig()
  const baseURL = config.public.apiBase as string

  http = ofetch.create({
    baseURL,
    async onRequest({ options }) {
      const userStore = useUserStore()
      const langStore = useLangStore()
      const { language } = storeToRefs(langStore)
      const token = queryUrl('token')
      const TOKEN = token || userStore.token
      const brand = 'HiSMK'
      const deviceId = isMobile() ? 'mobile' : 'pc'
      const timestamp = new Date().getTime()
      const signature = aesEncode(`appId=${brand};timestamp=${timestamp}`)

      options.headers = {
        Authorization: TOKEN,
        channel: 'mobile',
        deviceId,
        brand,
        timestamp: timestamp.toString(),
        signature,
        appId: brand,
        lang: language.value,
        ...options.headers,
      } as any
    },
    async onResponseError({ response }) {
      const { message } = response._data
      if (Array.isArray(message)) {
        message.forEach((item) => {
          httpStatusErrorHandler?.(item, response.status)
        })
      }
      else {
        httpStatusErrorHandler?.(message, response.status)
      }
      return Promise.reject(response._data)
    },
    retry: 3,
    retryDelay: 1000,
  })
}

export function injectHttpStatusErrorHandler(handler: HttpStatusErrorHandler) {
  httpStatusErrorHandler = handler
}

export function getHttp() {
  if (!http) {
    throw new Error('HTTP client not initialized. Call setupHttp first.')
  }
  return http
}
