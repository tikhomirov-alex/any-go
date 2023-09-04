import { getCurrentUser, login, signup } from '../controllers/auth.controller'
import { Route } from '../types/routeTypes'
import { privateRoute } from '../middleware/private.middleware'
import { requestLog } from '../middleware/requestLog.middleware'

export const routes: Route[] = [
  {
    method: 'post',
    path: 'auth/signup',
    middleware: [requestLog],
    controller: signup,
  },
  {
    method: 'post',
    path: 'auth/login',
    middleware: [requestLog],
    controller: login,
  },
  {
    method: 'get',
    path: 'auth/current',
    middleware: [privateRoute, requestLog],
    controller: getCurrentUser,
  },
]
