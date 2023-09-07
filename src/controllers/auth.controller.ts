import bcrypt from 'bcryptjs'
import { Controller } from '../types/routeTypes'
import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'
import { Payload } from '../types/extraTypes'
import { Profile } from '../models/Profile'
import {
  validateLoginInput,
  validateSignupInput,
} from '../validation/auth.validation'
import { User } from '../models/User'

export const signup: Controller = async (req, res) => {
  if (!process.env.JWT_SECRET) {
    console.log('Fatal error: environment variable JWT_SECRET is empty')
    process.exit(1)
  }
  const session = await mongoose.startSession()
  try {
    const { errors, isValid } = validateSignupInput(req.body)
    if (!isValid) {
      return res.status(400).json(errors)
    }

    const { name, surname, email, password } = req.body
    let username = req.body.username

    const userExists = await User.findOne({ email })
    if (userExists) {
      errors.email = 'Пользователь с таким email уже зарегистрирован'
      return res.status(400).json(errors)
    }

    if (username) {
      const usernameExists = await User.findOne({ username })
      if (usernameExists) {
        errors.username = 'Это имя пользователя уже используется'
        return res.status(400).json(errors)
      }
    } else {
      const userNumber = (await User.count()) + 1
      username = `user${userNumber}`
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    await session.startTransaction()

    const user = new User({
      username,
      email,
      password: hashedPassword,
    })
    await user.save({ session })

    const profile = new Profile({
      user: user.id,
      name,
      surname,
    })
    await profile.save({ session })

    await session.commitTransaction()

    const payload: Payload = {
      id: user.id,
      username: user.username,
      name: `${profile.name} ${profile.surname}`,
    }
    const sign = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '4h',
    })

    res.status(201).json({ token: `Bearer ${sign}` })
  } catch (err: any) {
    await session.abortTransaction()
    res.status(500).json({ msg: `Server error: ${err}` })
  } finally {
    session.endSession()
  }
}

export const login: Controller = async (req, res) => {
  if (!process.env.JWT_SECRET) {
    console.log('Fatal error: environment variable JWT_SECRET is empty')
    process.exit(1)
  }

  try {
    const { errors, isValid } = validateLoginInput(req.body)
    if (!isValid) {
      return res.status(400).json(errors)
    }

    const { email, password } = req.body

    const user = await User.findOne({ email })
    if (!user) {
      errors.email = 'Пользователь с таким email не найден'
      return res.status(404).json({ errors })
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
      errors.password = 'Неверный пароль'
      return res.status(400).json({ errors })
    }

    const profile = await Profile.findOne({ user: user.id })
    if (!profile) {
      return res
        .status(500)
        .json({ msg: 'Server error: user profile not found' })
    }

    const payload: Payload = {
      id: user.id,
      username: user.username,
      name: `${profile.name} ${profile.surname}`,
    }

    const sign = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '4h' })
    res.status(200).json({ token: `Bearer ${sign}` })
  } catch (err: any) {
    res.status(500).json({ msg: `Server error: ${err}` })
  }
}

export const getCurrentUser: Controller = async (req, res) => {
  try {
    const user: any = req.user
    const profile = await Profile.findOne({ user: user.id })

    if (!profile) {
      return res
        .status(500)
        .json({ msg: 'Server error: user profile not found' })
    }

    res.status(200).json({
      email: user.email,
      name: `${profile.name} ${profile.surname}`,
      username: user.username,
    })
  } catch (err: any) {
    res.status(500).json({ msg: `Server error: ${err}` })
  }
}
