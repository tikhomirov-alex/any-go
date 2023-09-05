import Validator from 'validator'
import { SignupInputData, SignupDataErrors } from '../models/AuthData'
import { normalize } from 'path'
import { ValidationResult } from '../types/extraTypes'
import { isEmpty } from './isEmpty'

export const validateSignupInput = (
  data: SignupInputData
): ValidationResult<SignupDataErrors> => {
  let errors: SignupDataErrors = {}
  let { email, name, username, password, password2 } = data

  // Clear possible spaces
  const normalizedEmail = Validator.normalizeEmail(email.trim())
  name = name.trim() 
  username = username?.trim()
  password = password.trim()
  password2 = password2.trim()

  // Check email
  if (!normalizedEmail || isEmpty(normalizedEmail)) {
    errors.email = 'Email не может быть пустым'
  } else if (!Validator.isEmail(normalizedEmail)) {
    errors.email = 'Введите корректный email'
  }

  // Check name
  if (isEmpty(name)) {
    errors.name = 'Имя не может быть пустым'
  } else if (!Validator.isLength(name, { min: 4, max: 40 })) {
    errors.name = 'Длина имени может варироваться от 4 до 40 символов'
  } else if (!Validator.matches(data.name, /^[А-ЯЁ\-\./s]+$/gi)) {
    errors.name = 'Имя может включать только кириллицу, пробел, дефис и точку'
  }

  // Check username
  if (username) {
    if (!Validator.isLength(username, { min: 6, max: 20 })) {
      errors.username = 'Имя пользователя может быть длиной от 6 до 20 символов'
    } else if (!Validator.matches(username, /^[/w]$/gi)) {
      errors.username = 'Имя пользователя может содержать латиницу, цифры, символы "_", "-"'
    } else if (Validator.matches(username, /^user.*$/gi)) {
      errors.username = 'Имя пользователя не должно начинаться со слова "user"'
    } else if (Validator.matches(username, /.*admin.*/gi)) {
      errors.username = 'Имя пользователя некорректно'
    }
  }

  // Сheck password
  if (!Validator.equals(password, password2)) {
    errors.password = 'Пароли не совпадают'
    errors.password2 = 'Пароли не совпадают'
  }
  if (!password) {
    errors.password = 'Пароль не может быть пустым'
    errors.password2 = 'Пароль не может быть пустым'
  } else if (!Validator.isLength(password, { min: 8, max: 40 })) {
    errors.password = 'Длина пароля от 8 до 40 символов'
    errors.password2 = 'Длина пароля от 8 до 40 символов'
  }

  return { errors, isValid: isEmpty(errors) }
}
