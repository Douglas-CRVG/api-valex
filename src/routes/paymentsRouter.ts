import { Router } from "express";
import * as paymentController from "../controllers/paymentsController.js";
import { validateSchemaMiddleware } from "../middlewares/validateSchemaMiddlewares.js";
import paymentSchema from "../schemas/paymentSchema.js";

const paymentRouter = Router();
paymentRouter.post(
  "/payment/:cardId",
  validateSchemaMiddleware(paymentSchema),
  paymentController.payment
);

export default paymentRouter;
