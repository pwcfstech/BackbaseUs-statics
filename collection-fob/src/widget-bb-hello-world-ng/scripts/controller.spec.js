import Controller from './controller';

const controller = () =>
  new Controller(null, null);

describe('widget-bb-hello-world-ng::Controller', () => {
  it('should have an $onInit method', () => {
    const ctrl = controller();
    expect(ctrl.$onInit).toBeFunction();
  });
});
