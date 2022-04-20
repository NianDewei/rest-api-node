import { Router } from "express"
// my modules
import { index, } from "../../app/controller/SearchController.js"
import {SearchRequest} from "../../app/http/request/index.js"
//------------------------------------------------

const searchsRouter = Router()
searchsRouter.get('/:collections/:value',SearchRequest, index)

export { searchsRouter }