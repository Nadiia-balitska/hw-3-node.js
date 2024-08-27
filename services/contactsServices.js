import Contact from "../models/Contact.js";

export function listContacts(filter, settings) {
  Contact.find(filter, "-createdAt -updatedAt", settings).populate(
    "owner",
    "username email"
  );
}

export function getOneContact(filter) {
  return Contact.findById(filter);
}

export function removeContact(filter) {
  Contact.findOneAndDelete(filter);
}

export function addContact(data) {
  Contact.create(data);
}

export const updateContactById = async (filter, data) => {
  Contact.findOneAndUpdate(filter, data);
};

export const updateStatusContact = async (contactId, favorite) => {
  // Contact.updateStatusContact(contactId, body);
  return Contact.findByIdAndUpdate(contactId, { favorite }, { new: true });
};
