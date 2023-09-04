import { Route } from '../types/routeTypes'
import { routes as authRoutes } from './auth.route'

const routes: Route[] = [...authRoutes]

export default routes
