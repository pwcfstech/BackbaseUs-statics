import Controller from './controller';

const controller = () =>
  new Controller(null, null);

describe('widget-training-world-ng::Controller', () => {
  it('should have an $onInit method', () => {
    const ctrl = controller();
    expect(ctrl.$onInit).toBeFunction();
  });
});
