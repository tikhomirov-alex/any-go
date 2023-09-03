import { NextFunction, Request, Response } from 'express'

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

type Middleware = (req: Request, res: Response, next: NextFunction) => any

export type Controller = (req: Request, res: Response) => any

export type Route = {
  method: Method
  path: string
  middleware: Middleware[]
  controller: Controller
}
