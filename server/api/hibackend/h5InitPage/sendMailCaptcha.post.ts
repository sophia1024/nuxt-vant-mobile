export default defineEventHandler(async (event) => {
  const _body = await readBody(event)

  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800))

  // Generate random 4-digit code
  const captcha = Math.floor(1000 + Math.random() * 9000).toString()

  return {
    code: 200,
    msg: 'success',
    data: captcha,
  }
})
