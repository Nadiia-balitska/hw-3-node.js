import Contact from "../models/Contact";

export function listContacts() {
  Contact.find({}, "-createdAt -updatedAt");
}

export function getContactById(_id) {
  return Contact.findById(_id);
}

export function removeContact(id) {
  Contact.findByIdAndDelete(id);
}

export function addContact(data) {
  Contact.create(data);
}

export const updateContactById = async (id, data) => {
  Contact.findByIdAndUpdate(id, data);
};

export const updateStatusContact = async (contactId, favorite) => {
  // Contact.updateStatusContact(contactId, body);
  return Contact.findByIdAndUpdate(contactId, { favorite }, { new: true });
};
