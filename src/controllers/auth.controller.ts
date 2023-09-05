import { Controller } from '../types/routeTypes'
import { User } from '../models/db/User'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { Payload } from '../types/extraTypes'
import 'dotenv/config'
import { validateSignupInput } from '../validation/auth.validation'

export const signup: Controller = async (req, res) => {
  if (!process.env.JWT_SECRET) {
    console.log('Fatal error: environment variable JWT_SECRET is empty')
    process.exit(1)
  }

  try {
    const { errors, isValid } = validateSignupInput(req.body)
    if (!isValid) {
      return res.status(400).json(errors)
    }

    const { name, email, password } = req.body
    let username = req.body.username

    const userExists = await User.findOne({ email })
    if (userExists) {
      errors.email = 'Email already exists'
      return res.status(400).json(errors)
    }

    if (username) {
      const usernameExists = await User.findOne({ username })
      if (usernameExists) {
        errors.username = 'This username already exists'
        return res.status(400).json(errors)
      }
    } else {
      const userNumber = (await User.count()) + 1
      username = `user${userNumber}`
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const user = new User({
      name,
      username,
      email,
      password: hashedPassword,
    })

    await user.save()
    const payload: Payload = {
      id: user.id,
      username: user.username,
      name: user.name,
    }
    const sign = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '4h',
    })

    res.status(201).json({ token: `Bearer ${sign}` })
  } catch (err) {
    res.status(500).json({ msg: `Server error: ${err}` })
  }
}

export const login: Controller = async (req, res) => {
  if (!process.env.JWT_SECRET) {
    console.log('Fatal error: environment variable JWT_SECRET is empty')
    process.exit(1)
  }

  try {
    const { email, password } = req.body

    const user = await User.findOne({ email })
    if (!user) {
      return res.status(404).json({ errors: { email: 'User not found' } })
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
      return res
        .status(400)
        .json({ errors: { password: 'Incorrect password' } })
    }

    const payload: Payload = {
      id: user.id,
      username: user.username,
      name: user.name,
    }
    console.log(process.env.JWT_SECRET)
    const sign = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '4h' })
    res.status(200).json({ token: `Bearer ${sign}` })
  } catch (err) {
    res.status(500).json({ msg: `Server error: ${err}` })
  }
}

export const getCurrentUser: Controller = async (req, res) => {
  try {
    const user: any = req.user

    res.json({
      id: user.id,
      email: user.email,
      name: user.name,
      username: user.username,
    })
  } catch (err) {
    res.status(500).json({ msg: `Server error: ${err}` })
  }
}
