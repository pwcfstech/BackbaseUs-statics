import Controller from './controller';

const loginLogoutService = {
    setUserLoggedIn: () => '',
  };

const controller = () =>
  new Controller({
    login: (name, password, extra) => Promise.resolve({status: 200}),
  }, {
    getStringPreference: () => '',
  }, {
    location: {
      assign: () => '',
    }, 
  }, loginLogoutService,
  );

describe('widget-bb-login-ng::Controller', () => {
  it('should have an $onInit method', () => {
    const ctrl = controller();
    expect(ctrl.$onInit).toBeFunction();
  });

  it('should change login flag on localStorage to be true', (done) => {
    spyOn(loginLogoutService, 'setUserLoggedIn');

    const ctrl = controller();
    ctrl.login()
      .then(() => {
        expect(loginLogoutService.setUserLoggedIn).toHaveBeenCalled();
      })
      .then(done)
      .catch(e => done.fail(e));
  });
});
