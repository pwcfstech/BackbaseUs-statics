/**
 * Project level configuration of modules
 *
 * @module config-bb-project-ng
 *
 * @example
 * Export functions to be used in config phase. E.g.:
 *
 * import { dataSomeEndpointKey } from 'data-bb-some-endpoint-ng';
 *
 * export default [
 *   [`${dataSomeEndpointKey}Provider`, function(endpoint) {
 *     endpoint.setBaseUri('http://example.com/api');
 *   }],
 * ];
 *
 */

define('config-bb-providers-ng', function (require, exports) {
  // the window._portalConfiguration currently is defined in the page template
  function getPortalName(defaultPortalName) {
    return window._portalConfiguration && window._portalConfiguration.portalName
      ? window._portalConfiguration.portalName
      : defaultPortalName;
  };
  function getLinkRoot() {
    return window._portalConfiguration && window._portalConfiguration.linkRoot
      ? window._portalConfiguration.linkRoot
      : '/gateway';
  };

  var retailPortalBaseUri = getLinkRoot() + '/' + getPortalName('retail-banking-demo');
  var businessPortalBaseUri = getLinkRoot() + '/' + getPortalName('business-banking-demo');
  var entiPortalBaseUri = getLinkRoot() + '/' + getPortalName('enti');
  var wealthPortalBaseUri = getLinkRoot() + '/' + getPortalName('wealth-management-demo');
  var endpointBaseUri = getLinkRoot() + '/api/';
  var servicesBaseUri = '/portalserver/services/api/';

  exports.default = [
    ['$httpProvider', function(params) {
      Object.assign(params.defaults, {
        xsrfCookieName: 'XSRF-TOKEN',
	      xsrfHeaderName: 'X-XSRF-TOKEN',
      });
    }],
    /* Enable this to have the default Login widget go against a custom AUTH microservice.*/

    ['data-bb-cxp-authentication-http-ng:cXPAuthenticationDataProvider', function(endpoint) {
      endpoint.setHeaders({
        Accept: '*!/!*',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'X-Requested-With': 'XMLHttpRequest',
      });
      endpoint.setApiRoot('/gateway/api')
      endpoint.setAuthUri('/auth');
      endpoint.setUsernameParamName('username');
      endpoint.setPasswordParamName('password');
    }],
    ['lib-bb-intent-ng:intentProvider', function(intents) {
      intents.setRoutes({
        /** Retail routes */
        'view.account.category.transactions': retailPortalBaseUri + '/insights',
        'intent.rb.transactions.dbit.list.view': retailPortalBaseUri + '/insights',
        'intent.rb.transactions.crdt.list.view': retailPortalBaseUri + '/insights',
        'intent.bb.product.summary.view': retailPortalBaseUri + '/index',
        'intent.bb.manage.products.view': retailPortalBaseUri + '/manage-products',
        'intent.bb.billpay.view.payees': retailPortalBaseUri + '/bill-pay',
        'intent.bb.billpay.view.payments': retailPortalBaseUri + '/bill-pay',
        'intent.bb.billpay.add-a-payee.view': retailPortalBaseUri + '/bill-pay/add-a-payee',
        'intent.rb.categories.management.list.view': retailPortalBaseUri + '/index',
        'intent.bb.change.transaction.category': retailPortalBaseUri + '/index',
        /** Business routes */
        'view.account.accountsOverview': businessPortalBaseUri + '/accounts-overview',
        'view.account.managePayments': businessPortalBaseUri + '/manage-payments',
        'view.account.authorizations': businessPortalBaseUri + '/authorizations',
        'view.account.transactions': businessPortalBaseUri + '/transactions',
        'view.account.notifications': businessPortalBaseUri + '/tools',
        'go.payment.create': businessPortalBaseUri + '/create-payment',
        'go.contact.create': businessPortalBaseUri + '/contact-manager',
        'go.action.create': businessPortalBaseUri + '/tools',
        'go.message.create': businessPortalBaseUri + '/secure-inbox',
        'go.batch.import': businessPortalBaseUri + '/upload-batches',
        'contact.auth.create': businessPortalBaseUri + '/contact-manager',
        'contact.auth.update': businessPortalBaseUri + '/contact-manager',
        'payment-orders.auth.create': businessPortalBaseUri + '/create-payment',
        /** Wealth routes */
        'view.portfolio.details': wealthPortalBaseUri + '/portfolio-details',
        'view.transactions': wealthPortalBaseUri + '/portfolio-details',
        'view.portfolio.positions.assets': wealthPortalBaseUri + '/portfolio-details',
        /** Entitlements routes */
        'view.user.privileges.assign': entiPortalBaseUri + '/master/users-permissions',
        'view.legalentities.select': entiPortalBaseUri + '/master/legal-entities',
        'view.serviceagreement.assignpairs': entiPortalBaseUri + '/consumer/assign-pairs',
        'view.serviceagreement.userprivileges': entiPortalBaseUri + '/provider/users-permissions',
        'intent.bb.accessgroup.serviceagreement.viewBoth': entiPortalBaseUri + '/provider-consumer/users-permissions'
      });
    }],
    [
      'data-bb-categories-management-http-ng:categoriesManagementDataProvider',
      function(endpoint) {
        console.log('configuring provider data-bb-product-summary-http-ng:categoriesManagementDataProvider to BASE_URIcategories-management-presentation-service/');
        endpoint.setBaseUri(endpointBaseUri + 'categories-management-presentation-service/');
      }
    ],
    [
      'data-bb-product-summary-http-ng:productSummaryDataProvider',
      function(endpoint) {
        console.log('configuring provider data-bb-product-summary-http-ng:productSummaryDataProvider to BASE_URIproduct-summary-presentation-service/');
        endpoint.setBaseUri(endpointBaseUri + 'product-summary-presentation-service/');
      }
    ],
    [
      'data-bb-arrangements-http-ng:arrangementsDataProvider',
      function(endpoint) {
        console.log('configuring provider data-bb-arrangements-http-ng:arrangementsDataProvider to BASE_URIaccount-presentation-service/');
        endpoint.setBaseUri(endpointBaseUri + 'account-presentation-service/');
      }
    ],
    [
      'data-bb-contact-http-ng:contactDataProvider',
      function(endpoint) {
        console.log('configuring provider data-bb-contact-http-ng:contactDataProvider to BASE_URIcontact-presentation-service/');
        endpoint.setBaseUri(endpointBaseUri + 'contact-presentation-service/');
      }
    ],
    [
      'data-bb-transactions-http-ng:transactionsDataProvider',
      function(endpoint) {
        console.log('configuring provider data-bb-transactions-http-ng:transactionsDataProvider to BASE_URItransactions-presentation-service/');
        endpoint.setBaseUri(endpointBaseUri + 'transactions-presentation-service/');
      }
    ],
    [
      'data-bb-payments-http-ng:paymentsDataProvider',
      function(endpoint) {
        console.log('configuring provider data-bb-payments-http-ng:paymentsDataProvider to BASE_URIpayment-presentation-service-mock/');
        endpoint.setBaseUri(endpointBaseUri + 'payment-presentation-service-mock/');
      }
    ],
    [
      'data-bb-payment-orders-http-ng:paymentOrdersDataProvider',
      function(endpoint) {
        console.log('configuring provider data-bb-payment-orders-http-ng:paymentOrdersDataProvider to BASE_URIpayment-order-presentation-service/');
        endpoint.setBaseUri(endpointBaseUri + 'payment-order-presentation-service/');
      }
    ],
    [
      'data-bb-batches-http-ng:batchesDataProvider',
      function(endpoint) {
        console.log('configuring provider data-bb-batches-http-ng:batchesDataProvider to BASE_URIbatches-presentation-service/');
        endpoint.setBaseUri(endpointBaseUri + 'batch-presentation-service/');
      }
    ],
    [
      'data-bb-messaging-service-http-ng:messagingServiceDataProvider',
      function(endpoint) {
        console.log('configuring provider data-bb-messaging-service-http-ng:messagingServiceData to BASE_URImessages-presentation-service/');
        endpoint.setBaseUri(endpointBaseUri + 'messages-presentation-service/');
      }
    ],
    [
      'data-bb-action-recipes-http-ng:actionRecipesDataProvider',
      function(endpoint) {
        console.log('configuring provider data-bb-action-recipes-http-ng:actionRecipesData to BASE_URIactionrecipes-presentation-service/');
        endpoint.setBaseUri(endpointBaseUri + 'actionrecipes-presentation-service/');
      }
    ],
    [
      'data-bb-user-http-ng:userDataProvider',
      function(endpoint) {
        console.log('configuring provider data-bb-user-http-ng:userDataProvider to BASE_URIuser-presentation-service/');
        endpoint.setBaseUri(endpointBaseUri + 'user-presentation-service/');
      }
    ],
    [
      'data-bb-notifications-http-ng:notificationsDataProvider',
      function(endpoint) {
        console.log('configuring provider data-bb-notifications-http-ng:notificationsDataProvider to BASE_URInotifications-presentation-service/');
        endpoint.setBaseUri(endpointBaseUri + 'notifications-presentation-service/');
      }
    ],
    [
      'data-bb-audit-http-ng:auditDataProvider',
      function(endpoint) {
        console.log('configuring provider data-bb-audit-http-ng:auditDataProvider to BASE_URIaudit-presentation-service/');
        endpoint.setBaseUri(endpointBaseUri + 'audit-presentation-service/');
      }
    ],
    [
      'data-bb-bill-pay-http-ng:billPayDataProvider',
      function(endpoint) {
        console.log('configuring provider data-bb-bill-pay-http-ng:billPayDataProvider to BASE_URIbillpay-presentation-service/');
        endpoint.setBaseUri(endpointBaseUri + 'billpay-presentation-service/');
      }
    ],
    [
      'data-bb-account-statements-http-ng:accountStatementsDataProvider',
      function (endpoint) {
        console.log('configuring provider data-bb-account-statements-http-ng:accountStatementsDataProvider to /account-statement-presentation-service/');
        endpoint.setBaseUri(endpointBaseUri + 'account-statement-presentation-service/');
      }
    ],
    /** Wealth data urls */
    [
      'data-bb-portfolio-summary-http-ng:portfolioSummaryDataProvider',
      function (endpoint) {
        console.log('configuring provider data-bb-portfolio-summary-http-ng:portfolioSummaryDataProvider to /portfolio-summary-presentation-service/');
        endpoint.setBaseUri(endpointBaseUri + 'portfolio-summary-presentation-service/');
      }
    ],
    /** Entitlements data urls */
    [
      'data-bb-legalentity-http-ng:legalEntityDataProvider',
      function (endpoint) {
        console.log('configuring provider data-bb-legalentity-http-ng:legalEntityDataProvider to /legalentity-presentation-service/');
        endpoint.setBaseUri(endpointBaseUri + 'legalentity-presentation-service/');
      }
    ],
    [
      'data-bb-accessgroups-http-ng:accessGroupsDataProvider',
      function (endpoint) {
        console.log('configuring provider data-bb-accessgroups-http-ng:accessGroupsDataProvider to /accessgroup-presentation-service/');
        endpoint.setBaseUri(endpointBaseUri + 'accessgroup-presentation-service/');
      }
    ],
    [
      'data-bb-limits-http-ng:limitsDataProvider',
      function (endpoint) {
        console.log('configuring provider data-bb-limits-http-ng:limitsDataProvider to /limits-presentation-service/');
        endpoint.setBaseUri(endpointBaseUri + 'limits-presentation-service/');
      }
    ],
    [
        'data-bb-locations-http-ng:locationsDataProvider',
        function(endpoint) {
            console.log('configuring provider data-bb-locations-http-ng:locationsDataProvider to BASE_URI atm-location-service/');
            endpoint.setBaseUri(endpointBaseUri + 'atm-location-service/');
        }
    ],
    [  // postal validation
        'data-bb-postal-validation-specification-http-ng:postalValidationSpecificationDataProvider',
        function(endpoint) {
            console.log('configuring provider to BASE_URI postal-validation-service/');
            endpoint.setBaseUri(endpointBaseUri + 'postal-service/');
        }
    ],
    [ // CIP service
        'data-bb-cip-http-ng:cipDataProvider',
        function(endpoint) {
            console.log('configuring provider to BASE_URI postal-validation-service/');
            endpoint.setBaseUri(endpointBaseUri + 'cip-service/');
        }
    ],
    [ // new prospect
        'data-bb-newprospect-http-ng:newprospectDataProvider',
        function(endpoint) {
            console.log('configuring provider to BASE_URI new-prospect-service/');
            endpoint.setBaseUri(endpointBaseUri + 'new-prospect-service/');
        }
    ],  //Mambu Account Creation
    [
        'data-bb-account-creation-specification-http-ng:accountCreationSpecificationDataProvider',
        function(endpoint) {
            console.log('configuring provider to BASE_URI account-creation-service/');
            endpoint.setBaseUri(endpointBaseUri + 'account-creation-service/');
        }
    ]
  ];
});
