import { MOCK_SHOPS } from '~/constants'

export default defineEventHandler(async () => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500))

  return {
    code: 200,
    message: 'success',
    result: MOCK_SHOPS,
  }
})
