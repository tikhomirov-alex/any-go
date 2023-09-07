export type Errors = {
  [key: string]: string
}

export type Payload = {
  id: string
  name: string
  username: string
}

export type ValidationResult = {
  errors: Errors
  isValid: boolean
}
