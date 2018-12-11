import { filterCriteria } from './helpers';
export default ({ widget }) => ({
  // TODO: 1. Implement Hooks here
  processContacts:(contacts) => {
  	if (!filterCriteria) {
      return contacts;
    }
  	return contacts.filter(contact => contact.category.toLowerCase() == filterCriteria);
  }
});