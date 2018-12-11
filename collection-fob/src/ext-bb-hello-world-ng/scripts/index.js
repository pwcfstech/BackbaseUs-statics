/**
 * @module ext-bb-hello-world-ng
 *
 * @description
 * Default extension for widget-bb-hello-world-ng
 *
 * @requires vendor-bb-angular-ng-aria
 */
import ngAriaModuleKey from 'vendor-bb-angular-ng-aria';

// uncomment below to include CSS in your extension
// import '../styles/index.css';

export const dependencyKeys = [
  ngAriaModuleKey,
];

export const hooks = {};

export { default as helpers } from './helpers';

export const events = {};
