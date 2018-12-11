import * as extHooks from './hooks';

describe('ext-bus-contact-list-ng:hooks', () => {
  describe('deleteContact', () => {
    it('should call confirm function for any contact', () => {
      const confirmFn = jasmine.createSpy('confirm');

      extHooks.deleteContact(null, confirmFn);
      extHooks.deleteContact({}, confirmFn);
      extHooks.deleteContact(123, confirmFn);

      expect(confirmFn.calls.count()).toEqual(3);
    });
  });

  describe('processContacts', () => {
    it('should return original collection without processing', () => {
      expect(extHooks.processContacts([1, 2, 3])).toEqual([1, 2, 3]);
      expect(extHooks.processContacts(123)).toEqual(123);
      expect(extHooks.processContacts('some string')).toEqual('some string');
      expect(extHooks.processContacts(null)).toEqual(null);
    });
  });

  describe('getSelectedContact', () => {
    it('should return null when contacts are empty', () => {
      expect(extHooks.getSelectedContact()).toBeNull();
      expect(extHooks.getSelectedContact([])).toBeNull();
      expect(extHooks.getSelectedContact([], {})).toBeNull();
    });

    it('should return first item from the list if contact not found', () => {
      const contacts = [
        { id: 1 },
        { id: 2 },
        { id: 3 },
      ];

      expect(extHooks.getSelectedContact(contacts)).toEqual(contacts[0]);
      expect(extHooks.getSelectedContact(contacts, 123)).toEqual(contacts[0]);
      expect(extHooks.getSelectedContact(contacts, { id: 4 })).toEqual(contacts[0]);
    });

    it('should return contact from the list when found', () => {
      const contacts = [
        { id: 1 },
        { id: 2 },
        { id: 3 },
      ];

      expect(extHooks.getSelectedContact(contacts, { id: 2 })).toEqual(contacts[1]);
      expect(extHooks.getSelectedContact(contacts, { id: 3 })).toEqual(contacts[2]);
    });
  });
});
