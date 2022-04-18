import { Request, Response } from "express";
import * as paymentService from "../services/paymentService.js"

export async function payment(req: Request, res: Response){
    const id = Number(req.params.cardId);
    const { businessId, payment, password } = req.body;

    await paymentService.payment(businessId, payment, password, id)
    res.sendStatus(200)
}