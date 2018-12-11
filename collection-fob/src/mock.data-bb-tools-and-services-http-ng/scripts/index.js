/* eslint-disable */
import ng from 'vendor-bb-angular';

import bbStorageModuleKey, { bbStorageServiceKey } from 'lib-bb-storage-ng';
import toolsAndServicesData from './data-bb-tools-and-services-http';

const toolsAndServicesDataModuleKey = 'data-bb-tools-and-services-http-ng';

export const toolsAndServicesDataKey = 'data-bb-tools-and-services-http-ng:toolsAndServicesData';

export default ng
  .module(toolsAndServicesDataModuleKey, [
    bbStorageModuleKey,
  ])
  .provider(toolsAndServicesDataKey, [() => {
    const config = {
      baseUri: '/',
    };

    return {
      setBaseUri: (baseUri) => {
        config.baseUri = baseUri;
      },
      $get: [
        '$q',
        bbStorageServiceKey,
        '$httpParamSerializer',
        /* into */
       toolsAndServicesData(config),
      ],
    };
  }])
  .name;
