import { getCurrentUser, login, signup } from '../controllers/auth.controller'
import { privateRoute } from '../middleware/private.middleware'
import { requestLog } from '../middleware/requestLog.middleware'
import { Route } from '../types/routeTypes'

export const routes: Route[] = [
  {
    method: 'get',
    path: 'auth',
    middleware: [requestLog, privateRoute],
    controller: getCurrentUser,
  },
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
]
