import { NextFunction, Request, Response } from 'express'

export type Controller = (req: Request, res: Response) => any

type Method =
  | 'get'
  | 'head'
  | 'post'
  | 'put'
  | 'delete'
  | 'connect'
  | 'options'
  | 'trace'
  | 'patch'

export type Middleware = (req: Request, res: Response, next: NextFunction) => any

export type Route = {
  method: Method
  path: String
  middleware: Middleware[]
  controller: Controller
}
