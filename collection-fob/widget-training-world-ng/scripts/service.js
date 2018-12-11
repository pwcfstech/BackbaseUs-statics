/**
 * @name WorldService
 * @type {object}
 * @description
 * The service encapsulates the core functionality of the World
 * Widget. It co-ordinates the communication of data from the `Model`
 * with the communication with the user by updating the {@link ViewState}.
 *
 * Asynchronous methods update the {@link ViewState} in 3 potential
 * stages; "before", "success", and "error", to allow the view to
 * provide feedback to the user.
 */

/**
 * @name createWorldService
 * @inner
 * @type {function}
 * @param {WorldModel} model
 * @param {ViewModel} viewModel
 * @return {WorldService}
 */
export default (model, viewModel) => ({
  /**
   * @name WorldService#list
   * @type {function}
   * @description Update the view with an list of
   * items loaded from the model
   * @return {Promise.<void>}
   */
  list() {
    viewModel.list.beforeList();
    return model.load()
      .then(viewModel.list.afterListSuccess, viewModel.list.afterListError);
  },
});
