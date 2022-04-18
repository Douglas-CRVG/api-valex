import { Request, Response } from "express";
import * as cardService from "../services/cardService.js"

export async function createCard(req: Request, res: Response){
    const {type} = req.body;
    const {employee} = res.locals;

    const card = await cardService.create(type, employee)

    res.status(201).send(card)
}

export async function activateCard(req: Request, res: Response){
    const id = Number(req.params.cardId);
    const { password, securityCode } = req.body;

    await cardService.activateCard(securityCode, password, id)
    res.sendStatus(200)
}

export async function balanceCard(req: Request, res: Response){
    const id = Number(req.params.cardId);

    const result = await cardService.balanceCard(id)

    res.status(200).send(result)
}

export async function block(req: Request, res: Response){
    const id = Number(req.params.cardId);
    const {password} = req.body;

    await cardService.toggleBlock(false, id, password)

    res.sendStatus(200)
}

export async function unblock(req: Request, res: Response){
    const id = Number(req.params.cardId);
    const {password} = req.body;

    await cardService.toggleBlock(true, id, password)

    res.sendStatus(200)
}