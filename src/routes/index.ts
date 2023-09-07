import { Route } from '../types/routeTypes'
import { routes as authRoutes } from './auth.routes'
import { routes as profileRoutes } from './profile.routes'

const routes: Route[] = [...authRoutes, ...profileRoutes]

export default routes
