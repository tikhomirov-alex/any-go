import {
  deleteFriend,
  destroyFriendship,
  sendFriendshipRequest,
} from '../controllers/friendship.controller'
import { privateRoute } from '../middleware/private.middleware'
import { requestLog } from '../middleware/requestLog.middleware'
import { Route } from '../types/routeTypes'

export const routes: Route[] = [
  {
    method: 'get',
    path: 'friends/:friend_id',
    middleware: [requestLog, privateRoute],
    controller: sendFriendshipRequest,
  },
  {
    method: 'get',
    path: 'friends/accept/:friend_id',
    middleware: [requestLog, privateRoute],
    controller: sendFriendshipRequest,
  },
  {
    method: 'put',
    path: 'friends/:friend_id',
    middleware: [requestLog, privateRoute],
    controller: deleteFriend,
  },
  {
    method: 'delete',
    path: 'friends/unsubscribe/:friend_id',
    middleware: [requestLog, privateRoute],
    controller: destroyFriendship,
  }
]
