import { MOCK_SHOPS } from '~/constants'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const searchQuery = (query.q as string)?.toLowerCase() || ''

  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300))

  const filtered = MOCK_SHOPS.filter(shop =>
    shop.name.toLowerCase().includes(searchQuery)
    || shop.address.toLowerCase().includes(searchQuery)
    || shop.tags.some(tag => tag.toLowerCase().includes(searchQuery)),
  )

  return {
    code: 200,
    message: 'success',
    result: filtered,
  }
})
