import joi from "joi";

const activateCardSchema = joi.object({
  securityCode: joi
    .string()
    .required()
    .pattern(/^([0-9]{3})$/),
  password: joi
    .string()
    .required()
    .pattern(/^([0-9]{4})$/),
});

export default activateCardSchema;
