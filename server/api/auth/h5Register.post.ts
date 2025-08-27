export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000))

  // Mock successful registration
  return {
    code: 200,
    msg: 'success',
    data: {
      access_token: 'eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyX2lkIjoxODExNzE3NzE1NDM0NTI0NjcyLCJ1c2VyX2tleSI6IjA2ZjA1YzU5LWI5MjAtNDJjYy05NTZiLTg3MmUxYTc1N2FjZiIsInRlcm1pbmFsIjoiMCIsInVzZXJJZCI6IjE4MTE3MTc3MTU0MzQ1MjQ2NzIiLCJ1c2VybmFtZSI6IjEwMjkwNTFxZWY0In0.7_aP_2K2cJmyKJGsPTUVKeTVXgtrzKBQomDAydodPCogmdBaDDDHjb14afVojaX1CrMZFkMwwfi59RXK2aR6kg',
      expires_in: 43200,
      hasRegister: false,
      age: body.age || 21,
    },
  }
})
