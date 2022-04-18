import joi from "joi";

const createCardSchema = joi.object({
    type: joi.string().required().valid('groceries', 'restaurant', 'transport', 'education', 'health')
});

export default createCardSchema;