import Joi from "joi";

export const createContactSchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": "name must be exist",
  }),
  phone: Joi.string().required().messages({
    "any.required": "phone must be exist",
  }),
  email: Joi.string().required().messages({
    "any.required": "email must be exist",
  }),
  favorite: Joi.boolean(),
});

export const updateContactSchema = Joi.object({
  name: Joi.string(),
  phone: Joi.string(),
  email: Joi.string(),
  favorite: Joi.boolean(),
});

export const favoriteSchema = Joi.object({
  favorite: Joi.boolean(),
});
