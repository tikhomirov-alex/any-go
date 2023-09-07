import { Errors, ValidationResult } from '../types/extraTypes'
import { isEmpty } from './isEmpty'
import { ProfileInputData } from './models/ProfileData'
import Validator from 'validator'

export const validateProfileInput = (
  data: ProfileInputData
): ValidationResult => {
  const errors: Errors = {}

  let { name, surname, birthday, city } = data

  name = !isEmpty(name) ? name.trim() : ''
  surname = !isEmpty(surname) ? surname.trim() : ''
  city = !isEmpty(city) ? city?.trim() : ''

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

  // Check birthday
  if (birthday && !Validator.isDate(birthday)) {
    errors.birthday = 'Поле "День рождения" не является датой'
  }

  // Check city
  if (city && !Validator.matches(city, /^[А-ЯЁ\-/s]+$/gi)) {
    errors.city = 'Город может содержать кириллицу, дефис и пробел'
  }

  return { errors, isValid: isEmpty(errors) }
}
