export type Payload = {
  id: string
  name: string
  username: string
}

export interface Errors {
  [key: string]: string
}

export type ValidationResult = {
  errors: Errors
  isValid: boolean
}
