import Model from './onboardpersonalinfo';

describe('model-fob-onboardpersonalinfo-ng::model', function() {
  function getModel() {
    return Model(Promise);
  }

  beforeEach(function() {
    // ...
  });

  describe('load()', function() {
    it('loads some data', function(done) {
      let model = getModel();

      model.load()
        .then(function(data) {
          // expect(...).toBe(...);
        })
        .then(done);
    });
  });
});
