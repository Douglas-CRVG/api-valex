import joi from "joi";

const rechargeCardSchema = joi.object({
    recharge: joi.number().min(1).required()
});

export default rechargeCardSchema;