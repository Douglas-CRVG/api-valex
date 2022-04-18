import * as cardService from "./cardService.js";
import * as rechargeRepository from "../repositories/rechargeRepository.js"

export async function rechargeCard(amount: number, id: number){
    const card = await cardService.resgisteredCard(id);

    cardService.expirationCard(card.expirationDate);

    await rechargeRepository.insert(id, amount)
}