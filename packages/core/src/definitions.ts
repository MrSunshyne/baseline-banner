/**
 * Definitions for the baseline status
 * Source: https://developer.mozilla.org/en-US/docs/Glossary/Baseline/Compatibility
 */

import { BaselineInfo } from "./api"

type Definitions = {
    [K in BaselineInfo['status']]: {
        message: string
    }
}


export const definitions: Definitions = {
    'newly': {
        message: 'Features listed as newly available work in at least the latest stable version of each of the Baseline browsers, but may not work with older browsers and devices.',
    },
    'limited': {
        message: 'Features listed with limited availability are not yet available in all browsers.',
    },
    'widely': {
        message: 'Features listed as widely available have a consistent history of support in each of the Baseline browsers for at least 2.5 years.',
    },
    'no_data': {
        message: 'No data available on this feature.'
    }
}