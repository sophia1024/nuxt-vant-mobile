import type { ShopItem } from '~/constants'
import { getHttp } from './http'

export async function getShops(): Promise<{ result: ShopItem[] }> {
  const http = getHttp()
  return await http('/api/shops', {
    method: 'GET',
  })
}

export async function searchShops(query: string): Promise<{ result: ShopItem[] }> {
  const http = getHttp()
  return await http('/api/shops/search', {
    method: 'GET',
    query: { q: query },
  })
}
