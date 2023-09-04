import {
  Strategy as JwtStrategy,
  ExtractJwt,
  VerifiedCallback,
  StrategyOptions,
} from 'passport-jwt'
import { User } from '../models/User'
import { Payload } from '../types/jwtTypes'
import 'dotenv/config'

const opt: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
}

const config = (passport) => {
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
