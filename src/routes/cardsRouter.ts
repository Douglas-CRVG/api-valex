import { Router } from "express";
import * as cards from "../controllers/cardsController.js";
import { validateAPIKeyMiddleware } from "../middlewares/validateAPIKeyMiddleware.js";
import { validateEmployeeIdMiddleware } from "../middlewares/validateEmployeeIdMiddleware.js";
import { validateSchemaMiddleware } from "../middlewares/validateSchemaMiddlewares.js";
import * as schemas from "../schemas/index.js";

const cardsRouter = Router();

cardsRouter.post(
  "/cards/create/:employeeId",
  validateAPIKeyMiddleware,
  validateEmployeeIdMiddleware,
  validateSchemaMiddleware(schemas.createCardSchema),
  cards.createCard
);

cardsRouter.patch(
  "/cards/:cardId/activate",
  validateSchemaMiddleware(schemas.activateCardSchema),
  cards.activateCard
);

cardsRouter.get("/cards/:cardId/balance", cards.balanceCard);

cardsRouter.patch(
  "/cards/:cardId/block",
  validateSchemaMiddleware(schemas.blockedSchema),
  cards.block
);

cardsRouter.patch(
  "/cards/:cardId/unblock",
  validateSchemaMiddleware(schemas.blockedSchema),
  cards.unblock
);

export default cardsRouter;
