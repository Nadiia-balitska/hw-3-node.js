import express from "express";
import {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateContact,
  isFavorite,
} from "../controllers/contactsControllers.js";
import isValidId from "../middlewares/isValidId.js";

// import {
//   createContactSchema,
//   updateContactSchema,
// } from "../schemas/contactsSchemas.js";

// import validateBody from "../helpers/validateBody.js";

// const addMiddleware = validateBody(createContactSchema);
// const updateMiddleware = validateBody(updateContactSchema);

const contactsRouter = express.Router();

contactsRouter.get("/", getAllContacts);

contactsRouter.get("/:id", isValidId, getOneContact);

contactsRouter.delete("/:id", isValidId, deleteContact);

contactsRouter.post("/", createContact);

contactsRouter.put("/:id", isValidId, updateContact);

contactsRouter.patch("/:id/favorite", isValidId, isFavorite);

export default contactsRouter;
