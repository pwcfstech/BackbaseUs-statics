/**
 * @module widget-training-atm-list-ng
 * @name AtmListController
 *
 * @description
 * Atm list
 *
 * @param {AtmListService} service
 * @param {Router} router
 */
export default (service, router) => {
  let unsubscribe = null;
  return {
    /**
     * AngularJS Lifecycle hook used to initialize the controller
     *
     * @name AtmListController#$onInit
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
     * @name AtmListController#$onDestroy
     * @type {function}
     * @returns {void}
     */
    $onDestroy() {
      if (unsubscribe) unsubscribe();
    },
  };
};
