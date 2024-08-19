import express from "express";
import {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateContact,
  updateFavorite,
} from "../controllers/contactsControllers.js";
import isValidId from "../middlewares/isValidId.js";

import {
  createContactSchema,
  updateContactSchema,
} from "../schemas/contactsSchemas.js";

import validateBody from "../helpers/validateBody.js";

const addMiddleware = validateBody(createContactSchema);
const updateMiddleware = validateBody(updateContactSchema);

const contactsRouter = express.Router();

contactsRouter.get("/", getAllContacts);

contactsRouter.get("/:id", isValidId, getOneContact);

contactsRouter.delete("/:id", isValidId, deleteContact);

contactsRouter.post("/", addMiddleware, createContact);

contactsRouter.put("/:id", isValidId, updateMiddleware, updateContact);

contactsRouter.patch("/:id/favorite", isValidId, updateFavorite);

export default contactsRouter;
