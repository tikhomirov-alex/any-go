import { Route } from "../types/types";
import {routes as authRoutes} from './auth.route'

const routes: Route[] = [
  ...authRoutes
]

export default routes
