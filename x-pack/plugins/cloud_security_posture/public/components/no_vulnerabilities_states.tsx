/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import React from 'react';
import {
  EuiLoadingLogo,
  EuiEmptyPrompt,
  EuiIcon,
  EuiMarkdownFormat,
  EuiLink,
  EuiButton,
  EuiFlexGroup,
  EuiFlexItem,
  EuiImage,
} from '@elastic/eui';
import { FormattedHTMLMessage, FormattedMessage } from '@kbn/i18n-react';
import { i18n } from '@kbn/i18n';
import { css } from '@emotion/react';
import { VULN_MGMT_POLICY_TEMPLATE } from '../../common/constants';
import { FullSizeCenteredPage } from './full_size_centered_page';
import {
  CloudPosturePage,
  VULN_MGMT_INTEGRATION_NOT_INSTALLED_TEST_SUBJECT,
} from './cloud_posture_page';
import { useCspSetupStatusApi } from '../common/api/use_setup_status_api';
import type { IndexDetails } from '../../common/types';
import { NO_VULNERABILITIES_STATUS_TEST_SUBJ } from './test_subjects';
import noDataIllustration from '../assets/illustrations/no_data_illustration.svg';
import { useCspIntegrationLink } from '../common/navigation/use_csp_integration_link';

const REFETCH_INTERVAL_MS = 20000;

const ScanningVulnerabilitiesEmptyPrompt = () => (
  <EuiEmptyPrompt
    data-test-subj={NO_VULNERABILITIES_STATUS_TEST_SUBJ.SCANNING_VULNERABILITIES}
    color="plain"
    icon={<EuiLoadingLogo logo="logoSecurity" size="xl" />}
    title={
      <h2>
        <FormattedMessage
          id="xpack.csp.noVulnerabilitiesStates.scanningVulnerabilitiesEmptyPrompt.indexingButtonTitle"
          defaultMessage="Scanning your cloud environment for vulnerabilities"
        />
      </h2>
    }
    body={
      <p>
        <FormattedMessage
          id="xpack.csp.noVulnerabilitiesStates.scanningVulnerabilitiesEmptyPrompt.indexingDescription"
          defaultMessage="Results should start to appear within a minute"
        />
      </p>
    }
  />
);

const VulnerabilitiesFindingsInstalledEmptyPrompt = ({
  vulnMgmtIntegrationLink,
}: {
  vulnMgmtIntegrationLink?: string;
}) => {
  return (
    <EuiEmptyPrompt
      data-test-subj={VULN_MGMT_INTEGRATION_NOT_INSTALLED_TEST_SUBJECT}
      icon={<EuiImage size="fullWidth" src={noDataIllustration} alt="no-data-illustration" />}
      title={
        <h2>
          <FormattedHTMLMessage
            tagName="h2"
            id="xpack.csp.cloudPosturePage.vulnerabilitiesInstalledEmptyPrompt.promptTitle"
            defaultMessage="Detect vulnerabilities <br/> in your cloud assets!"
          />
        </h2>
      }
      layout="horizontal"
      color="plain"
      body={
        <p>
          <FormattedMessage
            id="xpack.csp.cloudPosturePage.vulnerabilitiesInstalledEmptyPrompt.promptDescription"
            defaultMessage="Add the Elastic Vulnerability Management Integration to begin. {learnMore}."
            values={{
              learnMore: (
                <EuiLink href={''} target="_blank">
                  <FormattedMessage
                    id="xpack.csp.cloudPosturePage.vulnerabilitiesInstalledEmptyPrompt.learnMoreTitle"
                    defaultMessage="Learn more about Elastic Vulnerability Management(VM) for Cloud"
                  />
                </EuiLink>
              ),
            }}
          />
        </p>
      }
      actions={
        <EuiFlexGroup>
          <EuiFlexItem grow={false}>
            <EuiButton color="primary" fill href={vulnMgmtIntegrationLink}>
              <FormattedMessage
                id="xpack.csp.cloudPosturePage.vulnerabilitiesInstalledEmptyPrompt.addVulMngtIntegrationButtonTitle"
                defaultMessage="Install Elastic Vulnerability Management for Cloud"
              />
            </EuiButton>
          </EuiFlexItem>
        </EuiFlexGroup>
      }
    />
  );
};

const IndexTimeout = () => (
  <EuiEmptyPrompt
    data-test-subj={NO_VULNERABILITIES_STATUS_TEST_SUBJ.INDEX_TIMEOUT}
    color="plain"
    icon={<EuiLoadingLogo logo="logoSecurity" size="xl" />}
    title={
      <h2>
        <FormattedMessage
          id="xpack.csp.noVulnerabilitiesStates.indexTimeout.indexTimeoutTitle"
          defaultMessage="Findings Delayed"
        />
      </h2>
    }
    body={
      <p>
        <FormattedMessage
          id="xpack.csp.noVulnerabilitiesStates.indexTimeout.indexTimeoutDescription"
          defaultMessage="Collecting findings is taking longer than expected, please review our {docs} or reach out to support"
          values={{
            docs: (
              <EuiLink href="https://ela.st/findings" target="_blank">
                <FormattedMessage
                  id="xpack.csp.noVulnerabilitiesStates.indexTimeout.indexTimeoutDocLink"
                  defaultMessage="docs"
                />
              </EuiLink>
            ),
          }}
        />
      </p>
    }
  />
);

const Unprivileged = ({ unprivilegedIndices }: { unprivilegedIndices: string[] }) => (
  <EuiEmptyPrompt
    data-test-subj={NO_VULNERABILITIES_STATUS_TEST_SUBJ.UNPRIVILEGED}
    color="plain"
    icon={<EuiIcon type="logoSecurity" size="xl" />}
    title={
      <h2>
        <FormattedMessage
          id="xpack.csp.noVulnerabilitiesStates.unprivileged.unprivilegedTitle"
          defaultMessage="Privileges required"
        />
      </h2>
    }
    body={
      <p>
        <FormattedMessage
          id="xpack.csp.noVulnerabilitiesStates.unprivileged.unprivilegedDescription"
          defaultMessage="To view cloud posture data, you must update privileges. For more information, contact your Kibana administrator."
        />
      </p>
    }
    footer={
      <EuiMarkdownFormat
        css={css`
          text-align: initial;
        `}
        children={
          i18n.translate(
            'xpack.csp.noVulnerabilitiesStates.unprivileged.unprivilegedFooterMarkdown',
            {
              defaultMessage:
                'Required Elasticsearch index privilege `read` for the following indices:',
            }
          ) + unprivilegedIndices.map((idx) => `\n- \`${idx}\``)
        }
      />
    }
  />
);

/**
 * This component will return the render states based on cloud posture setup status API
 * since 'not-installed' is being checked globally by CloudPosturePage and 'indexed' is the pass condition, those states won't be handled here
 * */
export const NoVulnerabilitiesStates = () => {
  const getSetupStatus = useCspSetupStatusApi({
    refetchInterval: REFETCH_INTERVAL_MS,
  });
  const vulnMgmtIntegrationLink = useCspIntegrationLink(VULN_MGMT_POLICY_TEMPLATE);

  const status = getSetupStatus.data?.vuln_mgmt?.status;
  const indicesStatus = getSetupStatus.data?.indicesDetails;
  const unprivilegedIndices =
    indicesStatus &&
    indicesStatus
      .filter((idxDetails) => idxDetails.status === 'unprivileged')
      .map((idxDetails: IndexDetails) => idxDetails.index)
      .sort((a, b) => a.localeCompare(b));

  const render = () => {
    if (status === 'not-deployed' || status === 'indexing' || status === 'waiting_for_results')
      return <ScanningVulnerabilitiesEmptyPrompt />; // integration installed, but no agents added
    if (status === 'index-timeout') return <IndexTimeout />; // agent added, index timeout has passed
    if (status === 'not-installed')
      return (
        <VulnerabilitiesFindingsInstalledEmptyPrompt
          vulnMgmtIntegrationLink={vulnMgmtIntegrationLink}
        />
      );
    if (status === 'unprivileged')
      return <Unprivileged unprivilegedIndices={unprivilegedIndices || []} />; // user has no privileges for our indices
  };

  return (
    <CloudPosturePage query={getSetupStatus}>
      <FullSizeCenteredPage>{render()}</FullSizeCenteredPage>
    </CloudPosturePage>
  );
};
