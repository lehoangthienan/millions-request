import { Router } from 'express'

import * as test from '../controllers/test'

/*
  Create,      /
  Delete,     / An Le
  Directory  /
*/

const routes = new Router()

routes.post('/', test.addQueue)

export default routes

/*
  Create,      /
  Delete,     / An Le
  Directory  /
*/