/**
 * @module ext-training-contact-tiles-ng
 *
 * @description
 * Contact tiles
 *
 * @requires vendor-bb-angular-ng-aria
 */
import ngAriaModuleKey from 'vendor-bb-angular-ng-aria';
import uiTrainingInputGroupNg from 'ui-training-input-group-ng';
import extHooks from './hooks';
import uiBbI18nNgKey from 'ui-bb-i18n-ng';

// uncomment below to include CSS in your extension
// import '../styles/index.css';

export const dependencyKeys = [
  ngAriaModuleKey,
  uiTrainingInputGroupNg,
  uiBbI18nNgKey
];

export const hooks = (context) => extHooks(context);

export { default as helpers } from './helpers';

export const events = {};
