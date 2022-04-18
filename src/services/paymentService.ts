import * as cardService from "./cardService.js";
import * as businessRepository from "../repositories/businessRepository.js"
import * as paymentRepository from "../repositories/paymentRepository.js"

export async function payment(businessId: number, amount: number, password: string, cardId: number){
    const card = await cardService.resgisteredCard(cardId)

    cardService.expirationCard(card.expirationDate)

    isBlocked(card.isBlocked)

    await cardService.securityVerification(password, card.password)

    const business = await resgisteredBusiness(businessId);

    checkTypes(card.type, business.type)

    await authorizationPaymentAmount(cardId, amount)

    await paymentRepository.insert({ cardId, businessId, amount })
}

export async function resgisteredBusiness(id: number){
    const existBusiness = await businessRepository.findById(id);

    if(existBusiness) return existBusiness;

    throw { type: "not_found"}
}

function checkTypes(typeCard: string, typeBusiness: string){
    if(!(typeBusiness === typeCard)) throw { type: "unauthorized"}
}

async function authorizationPaymentAmount(cardId: number, amount: number){
    const {balance} = await cardService.balanceCard(cardId);

    if(amount > balance) throw {type: "unauthorized"}
}

function isBlocked(blocked: boolean){
    if(blocked) throw {type: "unauthorized"}
}