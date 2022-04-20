import { Router } from "express"
// my modules
import { index, store, show, update, destroy }
    from "../../app/controller/CategoryController.js"
//validations Request Category
import {
    StoreCategoryRequest,
    ShowCategoryRequest,
    UpdateCategoryRequest,
    DestroyCategoryRequest
} from "../../app/http/request/index.js"

//------------------------------------------------
const categorysRouter = Router()

categorysRouter.get("/", index)
categorysRouter.post("/", StoreCategoryRequest, store)
categorysRouter.get("/:id", ShowCategoryRequest, show)
categorysRouter.put("/:id", UpdateCategoryRequest, update)
categorysRouter.delete("/:id", DestroyCategoryRequest, destroy)

export { categorysRouter }