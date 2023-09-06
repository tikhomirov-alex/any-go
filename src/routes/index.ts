import { Route } from '../types/routeTypes'
import { routes as authRoutes } from './auth.routes'

const routes: Route[] = [...authRoutes]

export default routes
