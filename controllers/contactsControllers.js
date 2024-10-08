import * as fs from "node:fs/promises";
import * as path from "node:path";

import {
  addContact,
  getOneContact,
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

const coversPath = path.resolve("public", "covers");

export const getAllContacts = async (req, res, next) => {
  try {
    const { _id: owner } = req.user;
    const { page = 1, limit = 15 } = req.query;
    const skip = (page - 1) * limit;
    const result = await listContacts({ owner }, { skip, limit });

    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const getOneContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { _id: owner } = req.user;
    const result = await getOneContact({ _id: id, owner });

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
    const { _id: owner } = req.user;

    const result = await removeContact({ _id: id, owner });
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
    const { path: oldPath, filename } = req.file;
    const newPath = path.join(coversPath, filename);
    await fs.rename(oldPath, newPath);

    const { _id: owner } = req.user;
    const cover = path.join("covers", filename);

    const { error } = createContactSchema.validate(req.body);

    if (error) {
      throw HttpError(400, error.message);
    }

    const result = await addContact({ ...req.body, cover, owner });

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
    const { _id: owner } = req.user;
    const result = await updateContactById({ _id: id, owner }, req.body);

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
