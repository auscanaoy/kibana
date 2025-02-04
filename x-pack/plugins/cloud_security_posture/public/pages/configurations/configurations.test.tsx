/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */
import React from 'react';
import Chance from 'chance';
import type { UseQueryResult } from '@tanstack/react-query';
import { of } from 'rxjs';
import { useLatestFindingsDataView } from '../../common/api/use_latest_findings_data_view';
import { Configurations } from './configurations';
import { TestProvider } from '../../test/test_provider';
import { dataPluginMock } from '@kbn/data-plugin/public/mocks';
import { unifiedSearchPluginMock } from '@kbn/unified-search-plugin/public/mocks';
import { createStubDataView } from '@kbn/data-views-plugin/public/data_views/data_view.stub';
import { CSP_LATEST_FINDINGS_DATA_VIEW } from '../../../common/constants';
import * as TEST_SUBJECTS from './test_subjects';
import type { DataView } from '@kbn/data-plugin/common';
import { chartPluginMock } from '@kbn/charts-plugin/public/mocks';
import { discoverPluginMock } from '@kbn/discover-plugin/public/mocks';
import { useCspSetupStatusApi } from '../../common/api/use_setup_status_api';
import { useSubscriptionStatus } from '../../common/hooks/use_subscription_status';
import { createReactQueryResponse } from '../../test/fixtures/react_query';
import { useCISIntegrationPoliciesLink } from '../../common/navigation/use_navigate_to_cis_integration_policies';
import { useCspIntegrationLink } from '../../common/navigation/use_csp_integration_link';
import { NO_FINDINGS_STATUS_TEST_SUBJ } from '../../components/test_subjects';
import { render } from '@testing-library/react';
import { expectIdsInDoc } from '../../test/utils';
import { fleetMock } from '@kbn/fleet-plugin/public/mocks';
import { licensingMock } from '@kbn/licensing-plugin/public/mocks';
import { PACKAGE_NOT_INSTALLED_TEST_SUBJECT } from '../../components/cloud_posture_page';

jest.mock('../../common/api/use_latest_findings_data_view');
jest.mock('../../common/api/use_setup_status_api');
jest.mock('../../common/hooks/use_subscription_status');
jest.mock('../../common/navigation/use_navigate_to_cis_integration_policies');
jest.mock('../../common/navigation/use_csp_integration_link');

const chance = new Chance();

beforeEach(() => {
  jest.restoreAllMocks();

  (useSubscriptionStatus as jest.Mock).mockImplementation(() =>
    createReactQueryResponse({
      status: 'success',
      data: true,
    })
  );
});

const renderFindingsPage = () => {
  render(
    <TestProvider
      deps={{
        data: dataPluginMock.createStartContract(),
        unifiedSearch: unifiedSearchPluginMock.createStartContract(),
        charts: chartPluginMock.createStartContract(),
        discover: discoverPluginMock.createStartContract(),
        fleet: fleetMock.createStartMock(),
        licensing: licensingMock.createStart(),
      }}
    >
      <Configurations />
    </TestProvider>
  );
};

describe('<Findings />', () => {
  it('no findings state: not-deployed - shows NotDeployed instead of findings', () => {
    (useCspSetupStatusApi as jest.Mock).mockImplementation(() =>
      createReactQueryResponse({
        status: 'success',
        data: {
          kspm: { status: 'not-deployed' },
          cspm: { status: 'not-deployed' },
          indicesDetails: [
            { index: 'logs-cloud_security_posture.findings_latest-default', status: 'empty' },
            { index: 'logs-cloud_security_posture.findings-default*', status: 'empty' },
          ],
        },
      })
    );
    (useCISIntegrationPoliciesLink as jest.Mock).mockImplementation(() => chance.url());
    (useCspIntegrationLink as jest.Mock).mockImplementation(() => chance.url());

    renderFindingsPage();

    expectIdsInDoc({
      be: [NO_FINDINGS_STATUS_TEST_SUBJ.NO_AGENTS_DEPLOYED],
      notToBe: [
        TEST_SUBJECTS.FINDINGS_CONTAINER,
        NO_FINDINGS_STATUS_TEST_SUBJ.INDEXING,
        NO_FINDINGS_STATUS_TEST_SUBJ.INDEX_TIMEOUT,
        NO_FINDINGS_STATUS_TEST_SUBJ.UNPRIVILEGED,
      ],
    });
  });

  it('no findings state: indexing - shows Indexing instead of findings', () => {
    (useCspSetupStatusApi as jest.Mock).mockImplementation(() =>
      createReactQueryResponse({
        status: 'success',
        data: {
          kspm: { status: 'indexing' },
          cspm: { status: 'indexing' },
          indicesDetails: [
            { index: 'logs-cloud_security_posture.findings_latest-default', status: 'empty' },
            { index: 'logs-cloud_security_posture.findings-default*', status: 'empty' },
          ],
        },
      })
    );
    (useCspIntegrationLink as jest.Mock).mockImplementation(() => chance.url());

    renderFindingsPage();

    expectIdsInDoc({
      be: [NO_FINDINGS_STATUS_TEST_SUBJ.INDEXING],
      notToBe: [
        TEST_SUBJECTS.FINDINGS_CONTAINER,
        NO_FINDINGS_STATUS_TEST_SUBJ.NO_AGENTS_DEPLOYED,
        NO_FINDINGS_STATUS_TEST_SUBJ.INDEX_TIMEOUT,
        NO_FINDINGS_STATUS_TEST_SUBJ.UNPRIVILEGED,
      ],
    });
  });

  it('no findings state: index-timeout - shows IndexTimeout instead of findings', () => {
    (useCspSetupStatusApi as jest.Mock).mockImplementation(() =>
      createReactQueryResponse({
        status: 'success',
        data: {
          kspm: { status: 'index-timeout' },
          cspm: { status: 'index-timeout' },
          indicesDetails: [
            { index: 'logs-cloud_security_posture.findings_latest-default', status: 'empty' },
            { index: 'logs-cloud_security_posture.findings-default*', status: 'empty' },
          ],
        },
      })
    );
    (useCspIntegrationLink as jest.Mock).mockImplementation(() => chance.url());

    renderFindingsPage();

    expectIdsInDoc({
      be: [NO_FINDINGS_STATUS_TEST_SUBJ.INDEX_TIMEOUT],
      notToBe: [
        TEST_SUBJECTS.FINDINGS_CONTAINER,
        NO_FINDINGS_STATUS_TEST_SUBJ.NO_AGENTS_DEPLOYED,
        NO_FINDINGS_STATUS_TEST_SUBJ.INDEXING,
        NO_FINDINGS_STATUS_TEST_SUBJ.UNPRIVILEGED,
      ],
    });
  });

  it('no findings state: unprivileged - shows Unprivileged instead of findings', () => {
    (useCspSetupStatusApi as jest.Mock).mockImplementation(() =>
      createReactQueryResponse({
        status: 'success',
        data: {
          kspm: { status: 'unprivileged' },
          cspm: { status: 'unprivileged' },
          indicesDetails: [
            { index: 'logs-cloud_security_posture.findings_latest-default', status: 'empty' },
            { index: 'logs-cloud_security_posture.findings-default*', status: 'empty' },
          ],
        },
      })
    );
    (useCspIntegrationLink as jest.Mock).mockImplementation(() => chance.url());

    renderFindingsPage();

    expectIdsInDoc({
      be: [NO_FINDINGS_STATUS_TEST_SUBJ.UNPRIVILEGED],
      notToBe: [
        TEST_SUBJECTS.FINDINGS_CONTAINER,
        NO_FINDINGS_STATUS_TEST_SUBJ.NO_AGENTS_DEPLOYED,
        NO_FINDINGS_STATUS_TEST_SUBJ.INDEXING,
        NO_FINDINGS_STATUS_TEST_SUBJ.INDEX_TIMEOUT,
      ],
    });
  });

  it("renders the success state component when 'latest findings' DataView exists and request status is 'success'", async () => {
    const source = await dataPluginMock.createStartContract().search.searchSource.create();

    (useCspSetupStatusApi as jest.Mock).mockImplementation(() => ({
      status: 'success',
      data: {
        kspm: { status: 'indexed' },
        cspm: { status: 'indexed' },
        indicesDetails: [
          { index: 'logs-cloud_security_posture.findings_latest-default', status: 'not-empty' },
          { index: 'logs-cloud_security_posture.findings-default*', status: 'empty' },
          { index: 'logs-cloud_security_posture.findings-default*', status: 'empty' },
        ],
      },
    }));
    (source.fetch$ as jest.Mock).mockReturnValue(of({ rawResponse: { hits: { hits: [] } } }));

    (useLatestFindingsDataView as jest.Mock).mockReturnValue({
      status: 'success',
      data: createStubDataView({
        spec: {
          id: CSP_LATEST_FINDINGS_DATA_VIEW,
        },
      }),
    } as UseQueryResult<DataView>);

    renderFindingsPage();

    expectIdsInDoc({
      be: [TEST_SUBJECTS.LATEST_FINDINGS_CONTAINER],
      notToBe: [
        NO_FINDINGS_STATUS_TEST_SUBJ.INDEX_TIMEOUT,
        NO_FINDINGS_STATUS_TEST_SUBJ.NO_AGENTS_DEPLOYED,
        NO_FINDINGS_STATUS_TEST_SUBJ.INDEXING,
        NO_FINDINGS_STATUS_TEST_SUBJ.UNPRIVILEGED,
      ],
    });
  });

  it('renders integrations installation prompt if integration is not installed', async () => {
    (useCspSetupStatusApi as jest.Mock).mockImplementation(() =>
      createReactQueryResponse({
        status: 'success',
        data: {
          kspm: { status: 'not-installed' },
          cspm: { status: 'not-installed' },
          indicesDetails: [
            { index: 'logs-cloud_security_posture.findings_latest-default', status: 'empty' },
            { index: 'logs-cloud_security_posture.findings-default*', status: 'empty' },
          ],
        },
      })
    );
    (useCspIntegrationLink as jest.Mock).mockImplementation(() => chance.url());
    renderFindingsPage();

    expectIdsInDoc({
      be: [PACKAGE_NOT_INSTALLED_TEST_SUBJECT],
      notToBe: [
        TEST_SUBJECTS.LATEST_FINDINGS_CONTAINER,
        NO_FINDINGS_STATUS_TEST_SUBJ.INDEX_TIMEOUT,
        NO_FINDINGS_STATUS_TEST_SUBJ.NO_AGENTS_DEPLOYED,
        NO_FINDINGS_STATUS_TEST_SUBJ.INDEXING,
        NO_FINDINGS_STATUS_TEST_SUBJ.UNPRIVILEGED,
      ],
    });
  });
});
