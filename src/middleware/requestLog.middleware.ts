import { Middleware } from "../types/routeTypes";

export const requestLog: Middleware = (req, res, next) => {
  console.log(`${req.method}: ${req.path}`)
  next()
}
