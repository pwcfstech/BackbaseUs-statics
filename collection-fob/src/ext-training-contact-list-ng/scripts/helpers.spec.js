/* global jasmine, describe, expect, fail, it */
import helpersGenerator from './helpers';

const $filter = filter => filter === 'i18n' ? key => key + 'i18n': null;

const getForm = ({ $pristine = false, $valid = true }) => {
  const form = jasmine.createSpyObj('form', ['$setUntouched', '$setPristine', '$valid']);
  form.$pristine = $pristine;
  form.$valid = $valid;
  return form;
};

describe('helpers', () => {
  let helpers, ext, ctrl;

  beforeEach(() => {
    helpers = helpersGenerator({ $filter });
    ctrl = jasmine.createSpyObj('ctrl', ['selectContact', 'cancelContactForm', 'saveContact', 'search', 'cancelSearch']);
    ext = { cancelFormConfirmOpened: false };
  });

  describe('cancelEditForm', () => {
    it('should just cancel contact form if no form or selected contact', () => {
      helpers.cancelEditForm(ext, ctrl);

      expect(ctrl.cancelContactForm).toHaveBeenCalled();
      expect(ctrl.selectContact).not.toHaveBeenCalled();
    });

    it('should select contact if present', () => {
      ext.contactToSelect = 123;

      helpers.cancelEditForm(ext, ctrl);

      expect(ctrl.selectContact).toHaveBeenCalled();
      expect(ctrl.cancelContactForm).not.toHaveBeenCalled();
      expect(ext.contactToSelect).toBeNull();
    });

    it('should reset form state if form is present', () => {
      const form = getForm({});
      ext.contactForm = form;

      helpers.cancelEditForm(ext, ctrl);

      expect(ctrl.cancelContactForm).toHaveBeenCalled();
      expect(ctrl.selectContact).not.toHaveBeenCalled();
      expect(form.$setUntouched).toHaveBeenCalled();
      expect(ext.contactForm).toBeNull();
    });
  });

  describe('tryToCancelEditForm', () => {
    it('should cancel form if it is not defined yet', () => {
      helpers.tryToCancelEditForm(ext, ctrl);

      expect(ext.cancelFormConfirmOpened).toBeFalse();
      expect(ctrl.cancelContactForm).toHaveBeenCalled();
    });

    it('should cancel form if it is defined and pristine', () => {
      ext.contactForm = getForm({ $pristine: true });
      helpers.tryToCancelEditForm(ext, ctrl);

      expect(ext.cancelFormConfirmOpened).toBeFalse();
      expect(ctrl.cancelContactForm).toHaveBeenCalled();
    });

    it('should not cancel form if it is defined and not pristine', () => {
      ext.contactForm = getForm({ $pristine: false });
      helpers.tryToCancelEditForm(ext, ctrl);

      expect(ext.cancelFormConfirmOpened).toBeTrue();
      expect(ctrl.selectContact).not.toHaveBeenCalled();
      expect(ctrl.cancelContactForm).not.toHaveBeenCalled();
    });
  });

  describe('saveContact', () => {
    it('should save contact and reset form state on success', done => {
      const form = getForm({});
      ctrl.state = {
        contact: { data: 123 },
      };
      ctrl.saveContact.and.returnValue(Promise.resolve());

      helpers.saveContact(ctrl, form)
        .then(() => {
          expect(ctrl.saveContact.calls.argsFor(0)[0]).toBe(123);
          expect(form.$setUntouched).toHaveBeenCalled();
          expect(form.$setPristine).toHaveBeenCalled();
        })
        .then(done)
        .catch(done.fail);
    });

    it('should save contact and not reset form state on failure', done => {
      const form = getForm({});
      ctrl.state = {
        contact: { data: 123 },
      };
      ctrl.saveContact.and.returnValue(Promise.reject());

      helpers.saveContact(ctrl, form)
        .then(done.fail)
        .catch(() => {
          expect(ctrl.saveContact.calls.argsFor(0)[0]).toBe(123);
          expect(form.$setUntouched).not.toHaveBeenCalled();
          expect(form.$setPristine).not.toHaveBeenCalled();
        })
        .then(done);
    });
  });

  describe('notificationMessage', () => {
    it('should return correct message based on status object', () => {
      expect(helpers.notificationMessage({})).toBe('');
      expect(helpers.notificationMessage({ text: 'test' })).toBe('test');
      expect(helpers.notificationMessage({ i18n: 'some' })).toBe('somei18n');
      expect(helpers.notificationMessage({ text: 'text', i18n: 'boom' })).toBe('boomi18n');
    });
  });

  describe('isContactListEmpty', () => {
    it('should see if there is any search result', () => {
      ctrl.state = {
        searching: true,
        contactsSearch: {
          loading: false,
        },
      };
      ctrl.hasSearchContacts = jasmine.createSpy('hasSearchContacts').and.returnValue(false);
      expect(helpers.isContactListEmpty(ctrl)).toBeTrue();
      expect(ctrl.hasSearchContacts).toHaveBeenCalled();
    });
  });

  describe('getListData', () => {
    it('should return correct contacts collection depending on state', () => {
      ctrl.state = {
        searching: false,
        contacts: {
          data: 'contacts data'
        },
        contactsSearch: {
          data: 'search contacts data'
        }
      };

      expect(helpers.getListData(ctrl)).toEqual('contacts data');

      ctrl.state.searching = true;
      expect(helpers.getListData(ctrl)).toEqual('search contacts data');
    });
  });

  describe('searchContact', () => {
    it('should do search for specified query string', () => {
      ctrl.state = {
        contactsSearch: {
          query: 'search query'
        }
      };

      helpers.searchContact(ctrl, { key: 'Enter' });
      expect(ctrl.cancelSearch).not.toHaveBeenCalled();
      expect(ctrl.search).toHaveBeenCalledWith('search query', undefined, { from: 0 });
    });

    it('should cancel search for empty search query', () => {
      ctrl.state = {
        contactsSearch: {
          query: ''
        }
      };

      helpers.searchContact(ctrl, { keyCode: 13 });
      expect(ctrl.cancelSearch).toHaveBeenCalled();
      expect(ctrl.search).not.toHaveBeenCalled();
    });
  });

  describe('getEmptyIconClasses', () => {
    it('should return correct icon classes', () => {
      ctrl.state = {
        page: 'new',
        searching: true,
      };
      expect(helpers.getEmptyIconClasses(ctrl)).toContain('fa-search');
      ctrl.state.searching = false;
      expect(helpers.getEmptyIconClasses(ctrl)).toContain('fa-address-book');
    });
  });

  describe('getEmptyTitle', () => {
    it('should return correct title', () => {
      ctrl.state = {
        page: 'new',
        searching: true,
      };
      expect(helpers.getEmptyTitle(ctrl)).toBeString();
    });
  });

  describe('getEmptyDescription', () => {
    it('should return correct title', () => {
      ctrl.state = {
        page: 'new',
        searching: true,
      };
      expect(helpers.getEmptyDescription(ctrl)).toBeString();
    });
  });
});
