import {
  addContact,
  getContactById,
  listContacts,
  removeContact,
  updateContactById,
  updateStatusContact,
} from "../services/contactsServices.js";

import HttpError from "../helpers/HttpError.js";
import {
  createContactSchema,
  updateContactSchema,
  favoriteSchema,
} from "../schemas/contactsSchemas.js";

export const getAllContacts = async (_, res, next) => {
  try {
    const result = await listContacts();

    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const getOneContact = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await getContactById(id);

    if (!result) {
      throw HttpError(404, `Contacts with id=${id} not found`);
    }

    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const deleteContact = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await removeContact(id);
    if (!result) {
      throw HttpError(404, `Contacts with id=${id} not found`);
    }

    res.json({
      message: "Delete success",
    });
  } catch (error) {
    next(error);
  }
};

export const createContact = async (req, res, next) => {
  try {
    const { error } = createContactSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const result = await addContact(req.body);

    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

export const updateContact = async (req, res, next) => {
  try {
    const { error } = updateContactSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const { id } = req.params;

    const result = await updateContactById(id, req.body);
    if (!result) {
      throw HttpError(404, `Contacts with id=${id} not found`);
    }

    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const updateFavorite = async (req, res, next) => {
  try {
    const { favorite } = req.body;
    const { error } = favoriteSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }

    const { contactId } = req.params;
    const result = await updateStatusContact(contactId, favorite);

    if (!result) {
      throw HttpError(404, `Contacts with id=${contactId} not found`);
    }

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
