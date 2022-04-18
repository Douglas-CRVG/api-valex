import { Router } from "express";
import * as rechargesController from "../controllers/rechargesController.js";
import { validateAPIKeyMiddleware } from "../middlewares/validateAPIKeyMiddleware.js";
import { validateSchemaMiddleware } from "../middlewares/validateSchemaMiddlewares.js";
import * as schemas from "../schemas/index.js"

const rechargesRouter = Router()

rechargesRouter.post(
    "/recharges/:cardId",
    validateAPIKeyMiddleware,
    validateSchemaMiddleware(schemas.rechargeCardSchema),
    rechargesController.recharge
)

export default rechargesRouter;