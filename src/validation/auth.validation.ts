import Validator from 'validator'
import { LoginInputData, SignupInputData } from '../models/AuthData'
import { Errors, ValidationResult } from '../types/extraTypes'
import { isEmpty } from './isEmpty'

export const validateSignupInput = (
  data: SignupInputData
): ValidationResult => {
  let errors: Errors = {}
  let { email, name, surname, username, password, password2 } = data

  // Clear possible spaces
  const normalizedEmail = Validator.normalizeEmail(email.trim())
  name = name.trim()
  surname = surname.trim()
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
  } else if (!Validator.isLength(name, { min: 2, max: 20 })) {
    errors.name = 'Длина имени может варироваться от 2 до 20 символов'
  } else if (
    !Validator.matches(name, /^[А-Яа-яЁё\-]+$/gi) ||
    Validator.matches(name, /(^-|-$)/g)
  ) {
    errors.name =
      'Имя может включать только кириллицу и дефис и должно начинаться с буквы'
  }

  // Check surname
  if (isEmpty(surname)) {
    errors.surname = 'Фамилия не может быть пустой'
  } else if (!Validator.isLength(surname, { min: 2, max: 20 })) {
    errors.surname = 'Длина имени может варироваться от 2 до 20 символов'
  } else if (
    !Validator.matches(surname, /^[А-Яа-яЁё\-]+$/gi) ||
    Validator.matches(surname, /(^-|-$)/g)
  ) {
    errors.surname =
      'Фамилия может включать только кириллицу и дефис и должна начинаться с буквы'
  }

  // Check username
  if (username) {
    if (!Validator.isLength(username, { min: 6, max: 20 })) {
      errors.username = 'Имя пользователя может быть длиной от 6 до 20 символов'
    } else if (!Validator.matches(username, /^[/w\-]$/gi)) {
      errors.username =
        'Имя пользователя может содержать латиницу, цифры, символы "_" и "-"'
    } else if (Validator.matches(username, /^.*(user|admin).*$/gi)) {
      errors.username =
        'Имя пользователя не может включать слова "user" или "admin"'
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
  } else if (
    !Validator.matches(
      password,
      /^.*(?=.*[A-Za-z])(?=.*\d)(?=.*[!_-#$%&? "]).*$/
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
