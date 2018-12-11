import Model from './onboard-2-verifyidwaitscreen';

describe('model-fob-onboard-2-verifyidwaitscreen-ng::model', function() {
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
