export interface SignupInputData {
  name: string
  surname: string
  email: string
  username?: string
  password: string
  password2: string
}

export interface LoginInputData {
  email: string
  password: string
}
