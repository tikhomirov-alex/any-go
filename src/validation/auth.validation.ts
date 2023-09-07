import { Errors, ValidationResult } from '../types/extraTypes'
import { isEmpty } from './isEmpty'
import { LoginInputData, SignupInputData } from './models/AuthData'
import Validator from 'validator'

export const validateSignupInput = (
  data: SignupInputData
): ValidationResult => {
  const errors: Errors = {}
  let { email, name, surname, username, password, password2 } = data

  // Clear possible spaces
  email = !isEmpty(email) ? email.trim() : ''
  const normalizedEmail = Validator.normalizeEmail(email, {
    all_lowercase: true,
  })
  name = !isEmpty(name) ? name.trim() : ''
  surname = !isEmpty(surname) ? surname.trim() : ''
  password = !isEmpty(password) ? password.trim() : ''
  password2 = !isEmpty(password2) ? password2.trim() : ''

  // Check email
  if (!normalizedEmail || isEmpty(normalizedEmail)) {
    errors.email = 'Email не может быть пустым'
  } else if (!Validator.isEmail(normalizedEmail)) {
    errors.email = 'Введите корректный email'
  }

  // Check name
  if (isEmpty(name)) {
    errors.name = 'Имя не может быть пустым'
  } else if (!Validator.isLength(name, { min: 2, max: 20 })) {
    errors.name = 'Длина имени может варироваться от 2 до 20 символов'
  } else if (!Validator.matches(name, /^[А-ЯЁ][А-ЯЁ-]+[А-ЯЁ]$/gi)) {
    errors.name =
      'Имя может включать только кириллицу и дефис, должно начинаться и заканчиваться буквой'
  }

  // Check surname
  if (isEmpty(surname)) {
    errors.surname = 'Имя не может быть пустым'
  } else if (!Validator.isLength(surname, { min: 2, max: 20 })) {
    errors.surname = 'Длина имени может варироваться от 2 до 20 символов'
  } else if (!Validator.matches(surname, /^[А-ЯЁ][А-ЯЁ-]+[А-ЯЁ]$/gi)) {
    errors.surname =
      'Фамилия может включать только кириллицу и дефис, должна начинаться и заканчиваться буквой'
  }

  // Check username
  if (username) {
    username = username.toLowerCase()
    if (!Validator.isLength(username, { min: 6, max: 20 })) {
      errors.username = 'Имя пользователя может быть длиной от 6 до 20 символов'
    } else if (Validator.matches(username, /^.*(user|admin).*$/gi)) {
      errors.username =
        'Имя пользователя не может включать слова "user" или "admin"'
    } else if (!Validator.matches(username, /^[a-z][a-z0-9_\-\.]+[a-z0-9]$/g)) {
      errors.username = `Имя пользователя может содержать латиницу, цифры, символы ".", "-" и "_". 
        Должно начинаться с буквы и не должно заканчиваться символом`
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
    errors.password = 'Длина пароля от 8 до 30 символов'
    errors.password2 = 'Длина пароля от 8 до 30 символов'
  } else if (
    !Validator.matches(
      password,
      /^(?=.*[A-Z])(?=.*[!@#$&*_\-\.])(?=.*[0-9])(?=.*[a-z]).*$/g
    )
  ) {
    errors.password =
      'Пароль должен содержать минимум одну заглавную букву, одну цифру и один специальный символ'
    errors.password2 =
      'Пароль должен содержать минимум одну заглавную букву, одну цифру и один специальный символ'
  }

  return { errors, isValid: isEmpty(errors) }
}

export const validateLoginInput = (data: LoginInputData): ValidationResult => {
  let errors: Errors = {}
  let { email, password } = data

  // Clear possible spaces
  const normalizedEmail = Validator.normalizeEmail(email.trim())
  password = password.trim()

  // Check email
  if (!normalizedEmail || isEmpty(normalizedEmail)) {
    errors.email = 'Email не может быть пустым'
  } else if (!Validator.isEmail(normalizedEmail)) {
    errors.email = 'Введите корректный email'
  }

  // Check password
  if (isEmpty(password)) {
    errors.password = 'Пароль не может быть пустым'
  }

  return { errors, isValid: isEmpty(errors) }
}
