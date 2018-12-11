/**
 * @name deleteContact
 *
 * @description
 * Delete contact action handler
 *
 * @param {object} contact Contact object
 * @type {function}
 * @param {function} confirm Called to confirm delete action
 */
export function deleteContact(contact, confirm) {
  confirm();
}

/**
 * @name processContacts
 *
 * @description
 * Extension hook for pre-processing contacts
 *
 * @param {array} contacts
 * @type {function}
 * @returns {array} contacts Array of contacts
 */
export function processContacts(contacts = []) {
  return contacts;
}

/**
 * @name getSelectedContact
 *
 * @description
 * Selects the contact from contacts by id
 * Or returns null if nothing is found
 *
 * @param {array} contacts Array of contacts
 * @param {object} contact Contact object
 * @type {function}
 * @returns {object|null} Returns found contact or null
 */
export function getSelectedContact(contacts = [], contact) {
  // decoupling original contact list from selected contact
  const firstContact = Array.isArray(contacts) && contacts[0] ? { ...contacts[0] } : null;
  if (!contact) {
    return firstContact;
  }

  const foundContact = contacts.find(item => item.id === contact.id);
  return foundContact ? Object.assign({}, foundContact) : firstContact;
}
