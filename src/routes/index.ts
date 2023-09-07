import { Route } from '../types/routeTypes'
import { routes as authRoutes } from './auth.routes'
import { routes as profileRoutes } from './profile.routes'

export const routes: Route[] = [...authRoutes, ...profileRoutes]
