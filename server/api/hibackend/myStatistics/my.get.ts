import { MOCK_USER_STATISTICS } from '~/constants/auth'

export default defineEventHandler(async () => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 600))

  return {
    code: 200,
    msg: 'success',
    data: MOCK_USER_STATISTICS,
  }
})
