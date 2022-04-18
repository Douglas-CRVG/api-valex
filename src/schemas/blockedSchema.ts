import joi from "joi";

const blockedSchemaSchema = joi.object({
    password: joi.string().required().pattern(/^([0-9]{4})$/)
});

export default blockedSchemaSchema;