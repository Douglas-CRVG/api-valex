import * as cardRepository from "../repositories/cardRepository.js"
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

    securityCodeVerification(securityCode, card.securityCode)

    card.isBlocked = false;
    card.password = bcrypt.hashSync(password, 10);
    card.originalCardId = id;

    await cardRepository.update(id, card)
}

async function resgisteredCard(id: number){
    const existCard = await cardRepository.findById(id);

    if(existCard) return existCard;

    throw { type: "not_found"}
}

function expirationCard(date: string){
    if (dayjs().format("MM/YY") > date) throw {type: "not_found"}
}

function isBlocked(blocked: boolean){
    if(!blocked) throw {type: "conflict"}
}

function securityCodeVerification(cvc: string, cvcHash: string){
    if(!bcrypt.compareSync(cvc, cvcHash)) throw {type: "unauthorized"}
}