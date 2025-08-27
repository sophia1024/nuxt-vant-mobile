export default defineEventHandler(async () => {
  // Check if user has valid token in headers
  // For mock purposes, always return false
  return {
    code: 200,
    msg: 'success',
    data: {
      hasLogin: false,
    },
  }
})
