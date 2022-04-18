import joi from "joi";

const paymentSchema = joi.object({
    businessId: joi.number().min(1).required(),
    payment: joi.number().min(1).required(),
    password: joi.string().required().pattern(/^([0-9]{4})$/)
});

export default paymentSchema;