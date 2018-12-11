import createStateContainer from 'lib-bb-state-container';
import createInitialState from './initial-state'
import list from './list';

describe('HelloWorld::ViewModel::list', () => {
  let listActionDispatchers;

  const getListDispatchers = () =>
    list(createStateContainer(createInitialState()));

  beforeEach(() => {
    listActionDispatchers = getListDispatchers();
  });
  
  describe('ViewModel::beforeList', () => {
    it('is defined', () => {
      expect(listActionDispatchers.beforeList).toBeFunction();
    });
  });

  describe('ViewModel::afterListSuccess', () => {
    it('is defined', () => {
      expect(listActionDispatchers.afterListSuccess).toBeFunction();
    });
  });

  describe('ViewModel::afterListError', () => {
    it('is defined', () => {
      expect(listActionDispatchers.afterListError).toBeFunction();
    });
  });
});
