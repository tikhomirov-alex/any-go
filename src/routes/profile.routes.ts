import {
  getProfileByUserId,
  getProfiles,
  updateProfile,
} from '../controllers/profile.controller'
import { privateRoute } from '../middleware/private.middleware'
import { requestLog } from '../middleware/requestLog.middleware'
import { Route } from '../types/routeTypes'

export const routes: Route[] = [
  {
    method: 'get',
    path: 'profiles/:user_id',
    middleware: [requestLog],
    controller: getProfileByUserId,
  },
  {
    method: 'get',
    path: 'profiles',
    middleware: [requestLog],
    controller: getProfiles,
  },
  {
    method: 'put',
    path: 'profiles',
    middleware: [requestLog, privateRoute],
    controller: updateProfile,
  },
]
