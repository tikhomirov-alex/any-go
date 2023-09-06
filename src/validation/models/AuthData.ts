export type SignupInputData = {
  name: string
  surname: string
  email: string
  username?: string
  password: string
  password2: string
}

export type LoginInputData = {
  email: string
  password: string
}
