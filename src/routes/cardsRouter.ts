import { Router } from "express";
import * as cards from "../controllers/cardsController.js";
import { validateAPIKeyMiddleware } from "../middlewares/validateAPIKeyMiddleware.js";
import { validateEmployeeIdMiddleware } from "../middlewares/validateEmployeeIdMiddleware.js";
import { validateSchemaMiddleware } from "../middlewares/validateSchemaMiddlewares.js";
import createCardSchema from "../schemas/createCardSchema.js";

const cardsRouter = Router();

cardsRouter.post(
    "/cards/create/:employeeId",
    validateAPIKeyMiddleware,
    validateEmployeeIdMiddleware,
    validateSchemaMiddleware(createCardSchema),
    cards.createCard
)

export default cardsRouter;