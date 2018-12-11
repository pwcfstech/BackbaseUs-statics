/**
 * @module widget-training-world-ng
 * @name WorldController
 *
 * @description
 * World
 *
 * @param {WorldService} service
 * @param {Router} router
 */
export default (service, router) => {
  let unsubscribe = null;
  return {
    /**
     * AngularJS Lifecycle hook used to initialize the controller
     *
     * @name WorldController#$onInit
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
     * @name WorldController#$onDestroy
     * @type {function}
     * @returns {void}
     */
    $onDestroy() {
      if (unsubscribe) unsubscribe();
    },
  };
};
