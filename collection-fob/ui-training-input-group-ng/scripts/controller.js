export default function controller() {
  const $ctrl = this;
  /**
   * AngularJS Lifecycle hook used to initialize the controller
   *
   * @name Controller#$onInit
   * @returns {void}
   */
  const $onInit = () => {
     // Component initialized
  };

  Object.assign($ctrl, {
    $onInit,
  });
}
