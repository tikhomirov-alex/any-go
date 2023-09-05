import { Controller } from '../types/routeTypes'
import { User } from '../models/User'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { Payload } from '../types/jwtTypes'
import 'dotenv/config'

export const signup: Controller = async (req, res) => {
  if (!process.env.JWT_SECRET) {
    console.log('Fatal error: environment variable JWT_SECRET is empty')
    process.exit(1)
  }
  try {
    const { name, email, password, password2 } = req.body
    let username = req.body.username

    const userExists = await User.findOne({ email })
    if (userExists) {
      return res.status(400).json({ msg: 'Email already exists.' })
    }

    if (username) {
      const usernameExists = await User.findOne({ username })
      if (usernameExists) {
        return res.status(400).json({ msg: 'This username already exists.' })
      }
    } else {
      const userNumber = (await User.count()) + 1
      username = `user${userNumber}`
    }

    if (password !== password2) {
      return res.status(400).json({
        msg: 'Passwords do not match',
      })
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
      return res.status(404).json({ msg: 'User not found' })
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
      return res.status(400).json({ msg: 'Incorrect password' })
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
