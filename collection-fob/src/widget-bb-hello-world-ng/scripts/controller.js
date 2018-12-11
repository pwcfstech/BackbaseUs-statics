/**
 * @module widget-bb-hello-world-ng
 * @name HelloWorldController
 *
 * @description
 * This is just hello world
 *
 * @param {HelloWorldService} service
 * @param {Router} router
 */
export default (service, router) => {
  let unsubscribe = null;
  return {
    /**
     * AngularJS Lifecycle hook used to initialize the controller
     *
     * @name HelloWorldController#$onInit
     * @type {function}
     * @returns {void}
     */
    $onInit() {
      service.list();
      unsubscribe = router.subscribe(route => {
        if (route !== 'list') return;
        service.list();
      });
    },

    /**
     * AngularJS Lifecycle hook used to destroy the controller
     *
     * @name HelloWorldController#$onDestroy
     * @type {function}
     * @returns {void}
     */
    $onDestroy() {
      if (unsubscribe) unsubscribe();
    },
  };
};
