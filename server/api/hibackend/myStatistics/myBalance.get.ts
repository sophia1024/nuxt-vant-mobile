import { MOCK_USER_BALANCE } from '~/constants/auth'

export default defineEventHandler(async () => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 400))

  return {
    code: 200,
    msg: 'success',
    data: MOCK_USER_BALANCE,
  }
})
