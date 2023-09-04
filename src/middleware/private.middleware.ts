import { Middleware } from '../types/routeTypes'
import passport from 'passport'

export const privateRoute: Middleware = (req, res, next) => {
  passport.authenticate('jwt', { session: false })(req, res, next)
}
