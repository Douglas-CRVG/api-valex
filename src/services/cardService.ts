import * as cardRepository from "../repositories/cardRepository.js";
import * as paymentRepository from "../repositories/paymentRepository.js";
import * as rechargeRepository from "../repositories/rechargeRepository.js";
import { faker } from '@faker-js/faker';
import dayjs from "dayjs";
import bcrypt from "bcrypt";

export async function create(type: string, employee: any){
    await uniqueCard(type, employee.id);

    const card: any = formatCard(type, employee)

    const {id} = await cardRepository.insert({...card})
    card.id = id

    if(id) return card

    throw {type: "conflict"}
}

async function uniqueCard(type: any, employeeId: number){
    const existCard = await cardRepository.findByTypeAndEmployeeId(type, employeeId)

    if(existCard) throw {type: "conflict"}
}

function formatCard(type: string, employee: any){
    const {id, fullName} = employee;
    
    const card = {
        employeeId: id,
        number: faker.finance.creditCardNumber("mastercard"),
        cardholderName: formatCardHolderName(fullName),
        securityCode: faker.finance.creditCardCVV(),
        expirationDate: dayjs().add(5, "y").format("MM/YY"),
        password: null,
        isVirtual: false,
        originalCardId: null,
        isBlocked: true,
        type
    }

    return card
}

function formatCardHolderName(name: string){
    const nameArr = name.toUpperCase().split(" ");
    let holderName = "";

    for(let i = 0; i < nameArr.length; i++){
        if (i > 0) holderName += " ";

        if (i === 0 || i === nameArr.length - 1){
            holderName += nameArr[i]
        } else if(nameArr[i].length > 2 ){
            holderName += nameArr[i][0]
        }
    }

    return holderName;
}

export async function activateCard(securityCode: string, password: string, id: number){
    const card = await resgisteredCard(id);

    expirationCard(card.expirationDate)

    isBlocked(card.isBlocked)

    await securityVerification(securityCode, card.securityCode)

    card.isBlocked = false;
    card.password = bcrypt.hashSync(password, 10);

    await cardRepository.update(id, card)
}

export async function resgisteredCard(id: number){
    const existCard = await cardRepository.findById(id);

    if(existCard) return existCard;

    throw { type: "not_found"}
}

export function expirationCard(date: string){
    if (dayjs().format("MM/YY") > date) throw {type: "not_found"}
}

function isBlocked(blocked: boolean){
    if(!blocked) throw {type: "conflict"}
}

export async function securityVerification(code: string, codeHash: string){
    if(!bcrypt.compareSync(code, codeHash)) throw {type: "unauthorized"}
}

export async function balanceCard(id: number){
    await resgisteredCard(id);
    const recharges = await rechargeRepository.findByCardId(id);
    const transactions = await paymentRepository.findByCardId(id);
    
    let balance = sumAmount(recharges) - sumAmount(transactions);

    return {
        balance,
        transactions,
        recharges
    }
}

function sumAmount(list: any[]){
    const initial: number = 0;
    
    return list
    .map(item => item.amount)
    .reduce((sum, currentValue) => sum + currentValue, initial);
}

//============================ BLOCK UNLOCK =============================

export async function toggleBlock(blocked: boolean, id: number, password: string){
    const card = await resgisteredCard(id);

    expirationCard(card.expirationDate)

    const newBlocked = isBlockedNoError(blocked, card.isBlocked)

    existPassword(card.password)

    securityVerification(password, card.password)

    card.isBlocked = newBlocked;

    await cardRepository.update(id, card)
}

function isBlockedNoError(blocked: boolean, isBlocked: boolean){
    if (!(blocked === isBlocked)) throw {type: "conflict"}

    if (isBlocked) return false

    return true
}

function existPassword(password: any){
    if(!password) throw {type: "unauthorized"}
}