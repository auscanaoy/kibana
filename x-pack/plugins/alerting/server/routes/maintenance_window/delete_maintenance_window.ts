/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import { IRouter } from '@kbn/core/server';
import { schema } from '@kbn/config-schema';
import { ILicenseState } from '../../lib';
import { verifyAccessAndContext } from '../lib';
import { AlertingRequestHandlerContext, INTERNAL_BASE_ALERTING_API_PATH } from '../../types';
import { MAINTENANCE_WINDOW_API_PRIVILEGES } from '../../../common';

const paramSchema = schema.object({
  id: schema.string(),
});

export const deleteMaintenanceWindowRoute = (
  router: IRouter<AlertingRequestHandlerContext>,
  licenseState: ILicenseState
) => {
  router.delete(
    {
      path: `${INTERNAL_BASE_ALERTING_API_PATH}/rules/maintenance_window/{id}`,
      validate: {
        params: paramSchema,
      },
      options: {
        tags: [`access:${MAINTENANCE_WINDOW_API_PRIVILEGES.WRITE_MAINTENANCE_WINDOW}`],
      },
    },
    router.handleLegacyErrors(
      verifyAccessAndContext(licenseState, async function (context, req, res) {
        const maintenanceWindowClient = (await context.alerting).getMaintenanceWindowClient();
        const { id } = req.params;
        await maintenanceWindowClient.delete({ id });
        return res.noContent();
      })
    )
  );
};
