import { MOCK_USER_INFO } from '~/constants/auth'

export default defineEventHandler(async () => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500))

  return {
    code: 200,
    msg: 'Operation successful.',
    data: MOCK_USER_INFO,
    success: true,
  }
})
