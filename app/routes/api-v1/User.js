
import { Router } from "express"
import { index, store, update, updatePatch, destroy }
from "../../Controller/UserController.js"

const router = Router()

router.get("/", index)

router.post("/", store)

router.put("/:id", update)

router.patch("/", updatePatch)

router.delete("/", destroy)

export default router