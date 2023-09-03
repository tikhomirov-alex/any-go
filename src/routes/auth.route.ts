import { login, signup } from "../controllers/auth.controller";
import { Route } from "../types/types";

export const routes: Route[] = [
  {
    method: 'post',
    path: 'auth/signup',
    middleware: [],
    controller: signup
  },
  {
    method: 'post',
    path: 'auth/login',
    middleware: [],
    controller: login
  }
]
