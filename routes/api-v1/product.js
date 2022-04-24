import { Router } from "express"
// my modules
import {
    index,
    store,
    show,
    update,
    destroy
} from "../../app/controller/ProductController.js"
//validations Request Products
import {
    StoreProductRequest,
    ShowProductRequest,
    UpdateProductRequest,
    DestroyProductRequest
} from "../../app/http/request/index.js"

//------------------------------------------------
const productsRouter = Router()

productsRouter.get("/", index)
productsRouter.post("/", StoreProductRequest, store)
productsRouter.get("/:id", ShowProductRequest, show)
productsRouter.put("/:id", UpdateProductRequest, update)
productsRouter.delete("/:id", DestroyProductRequest, destroy)

export { productsRouter }