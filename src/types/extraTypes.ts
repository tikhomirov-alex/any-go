export type Payload = {
  id: string
  name: string
  username: string
}

export type ValidationResult<T> = {
  errors: T
  isValid: boolean
}
