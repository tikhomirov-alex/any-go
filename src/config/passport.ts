import {
  ExtractJwt,
  Strategy as JwtStrategy,
  StrategyOptions,
  VerifiedCallback,
} from 'passport-jwt'
import { Payload } from '../types/extraTypes'
import { PassportStatic } from 'passport'
import { User } from '../models/User'
import 'dotenv/config'

const opt: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
}

const config = (passport: PassportStatic) => {
  passport.use(
    new JwtStrategy(
      opt,
      async (jwtPayload: Payload, done: VerifiedCallback) => {
        const user = await User.findById(jwtPayload.id)

        if (user) {
          return done(null, user)
        }
        return done(null, false)
      }
    )
  )
}

export default config
