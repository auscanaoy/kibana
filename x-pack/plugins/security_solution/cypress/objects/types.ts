/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import type { RuleActionThrottle } from '@kbn/securitysolution-io-ts-alerting-types';

import type { Connectors } from './connector';

export type CreateRulePropsRewrites<CreateRuleProps> = Partial<Exclude<CreateRuleProps, 'type'>>;

export interface Actions {
  throttle: RuleActionThrottle;
  connectors: Connectors[];
}
