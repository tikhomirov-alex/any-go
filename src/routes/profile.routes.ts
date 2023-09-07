import {
  getProfileByUserId,
  updateProfile,
} from '../controllers/profile.controller'
import { privateRoute } from '../middleware/private.middleware'
import { Route } from '../types/routeTypes'

export const routes: Route[] = [
  {
    method: 'get',
    path: 'profiles/:user_id',
    middleware: [],
    controller: getProfileByUserId,
  },
  {
    method: 'put',
    path: 'profiles',
    middleware: [privateRoute],
    controller: updateProfile,
  },
]
