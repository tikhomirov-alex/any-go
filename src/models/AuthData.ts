export interface SignupInputData {
  name: string
  email: string
  username?: string
  password: string
  password2: string
}

export interface SignupDataErrors {
  name?: string
  email?: string
  username?: string
  password?: string
  password2?: string
}

export interface LoginData {
  email: string
  password: string
}
