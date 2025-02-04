/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import { PackagePolicy } from '@kbn/fleet-plugin/common';

export const getTestBrowserSyntheticsPolicy = ({
  id,
  params,
}: {
  name: string;
  id: string;
  locationName?: string;
  namespace?: string;
  params?: Record<string, any>;
}): PackagePolicy => ({
  id: 'abf904a4-cb9a-4b29-8c11-4d183cca289b-fe621d20-7b01-11ed-803f-475d82e1f9ca-default',
  version: 'WzEzNzYsMV0=',
  name: 'Test HTTP Monitor 03-Test private location 0-default',
  namespace: 'testnamespace',
  package: { name: 'synthetics', title: 'Elastic Synthetics', version: '0.11.4' },
  enabled: true,
  policy_id: 'fe621d20-7b01-11ed-803f-475d82e1f9ca',
  inputs: [
    {
      type: 'synthetics/http',
      policy_template: 'synthetics',
      enabled: false,
      streams: [
        {
          enabled: false,
          data_stream: { type: 'synthetics', dataset: 'http' },
          vars: {
            __ui: { type: 'yaml' },
            enabled: { value: true, type: 'bool' },
            type: { value: 'http', type: 'text' },
            name: { type: 'text' },
            schedule: { value: '"@every 3m"', type: 'text' },
            urls: { type: 'text' },
            'service.name': { type: 'text' },
            timeout: { type: 'text' },
            max_redirects: { type: 'integer' },
            proxy_url: { type: 'text' },
            tags: { type: 'yaml' },
            username: { type: 'text' },
            password: { type: 'password' },
            'response.include_headers': { type: 'bool' },
            'response.include_body': { type: 'text' },
            'check.request.method': { type: 'text' },
            'check.request.headers': { type: 'yaml' },
            'check.request.body': { type: 'yaml' },
            'check.response.status': { type: 'yaml' },
            'check.response.headers': { type: 'yaml' },
            'check.response.body.positive': { type: 'yaml' },
            'check.response.body.negative': { type: 'yaml' },
            'ssl.certificate_authorities': { type: 'yaml' },
            'ssl.certificate': { type: 'yaml' },
            'ssl.key': { type: 'yaml' },
            'ssl.key_passphrase': { type: 'text' },
            'ssl.verification_mode': { type: 'text' },
            'ssl.supported_protocols': { type: 'yaml' },
            location_name: { value: 'Fleet managed', type: 'text' },
            id: { type: 'text' },
            config_id: { type: 'text' },
            run_once: { value: false, type: 'bool' },
            origin: { type: 'text' },
            'monitor.project.id': { type: 'text' },
            'monitor.project.name': { type: 'text' },
          },
          id: 'synthetics/http-http-abf904a4-cb9a-4b29-8c11-4d183cca289b-fe621d20-7b01-11ed-803f-475d82e1f9ca-default',
        },
      ],
    },
    {
      type: 'synthetics/tcp',
      policy_template: 'synthetics',
      enabled: false,
      streams: [
        {
          enabled: false,
          data_stream: { type: 'synthetics', dataset: 'tcp' },
          vars: {
            __ui: { type: 'yaml' },
            enabled: { value: true, type: 'bool' },
            type: { value: 'tcp', type: 'text' },
            name: { type: 'text' },
            schedule: { value: '"@every 3m"', type: 'text' },
            hosts: { type: 'text' },
            'service.name': { type: 'text' },
            timeout: { type: 'text' },
            proxy_url: { type: 'text' },
            proxy_use_local_resolver: { value: false, type: 'bool' },
            tags: { type: 'yaml' },
            'check.send': { type: 'text' },
            'check.receive': { type: 'text' },
            'ssl.certificate_authorities': { type: 'yaml' },
            'ssl.certificate': { type: 'yaml' },
            'ssl.key': { type: 'yaml' },
            'ssl.key_passphrase': { type: 'text' },
            'ssl.verification_mode': { type: 'text' },
            'ssl.supported_protocols': { type: 'yaml' },
            location_name: { value: 'Fleet managed', type: 'text' },
            id: { type: 'text' },
            config_id: { type: 'text' },
            run_once: { value: false, type: 'bool' },
            origin: { type: 'text' },
            'monitor.project.id': { type: 'text' },
            'monitor.project.name': { type: 'text' },
          },
          id: 'synthetics/tcp-tcp-abf904a4-cb9a-4b29-8c11-4d183cca289b-fe621d20-7b01-11ed-803f-475d82e1f9ca-default',
        },
      ],
    },
    {
      type: 'synthetics/icmp',
      policy_template: 'synthetics',
      enabled: false,
      streams: [
        {
          enabled: false,
          data_stream: { type: 'synthetics', dataset: 'icmp' },
          vars: {
            __ui: { type: 'yaml' },
            enabled: { value: true, type: 'bool' },
            type: { value: 'icmp', type: 'text' },
            name: { type: 'text' },
            schedule: { value: '"@every 3m"', type: 'text' },
            wait: { value: '1s', type: 'text' },
            hosts: { type: 'text' },
            'service.name': { type: 'text' },
            timeout: { type: 'text' },
            tags: { type: 'yaml' },
            location_name: { value: 'Fleet managed', type: 'text' },
            id: { type: 'text' },
            config_id: { type: 'text' },
            run_once: { value: false, type: 'bool' },
            origin: { type: 'text' },
            'monitor.project.id': { type: 'text' },
            'monitor.project.name': { type: 'text' },
          },
          id: 'synthetics/icmp-icmp-abf904a4-cb9a-4b29-8c11-4d183cca289b-fe621d20-7b01-11ed-803f-475d82e1f9ca-default',
        },
      ],
    },
    {
      type: 'synthetics/browser',
      policy_template: 'synthetics',
      enabled: true,
      streams: [
        {
          enabled: true,
          data_stream: {
            type: 'synthetics',
            dataset: 'browser',
            elasticsearch: { privileges: { indices: ['auto_configure', 'create_doc', 'read'] } },
          },
          vars: {
            __ui: {
              value:
                '{"script_source":{"is_generated_script":false,"file_name":""},"is_tls_enabled":false}',
              type: 'yaml',
            },
            enabled: { value: true, type: 'bool' },
            type: { value: 'browser', type: 'text' },
            name: { value: 'Test HTTP Monitor 03', type: 'text' },
            schedule: { value: '"@every 3m"', type: 'text' },
            'service.name': { value: '', type: 'text' },
            timeout: { value: '16s', type: 'text' },
            tags: { value: '["cookie-test","browser"]', type: 'yaml' },
            'source.zip_url.url': { type: 'text' },
            'source.zip_url.username': { type: 'text' },
            'source.zip_url.folder': { type: 'text' },
            'source.zip_url.password': { type: 'password' },
            'source.inline.script': {
              value:
                '"step(\\"Visit /users api route\\", async () => {\\\\n  const response = await page.goto(\'https://nextjs-test-synthetics.vercel.app/api/users\');\\\\n  expect(response.status()).toEqual(200);\\\\n});"',
              type: 'yaml',
            },
            'source.project.content': { value: '', type: 'text' },
            params: { value: params ? JSON.stringify(params) : '', type: 'yaml' },
            playwright_options: { value: '', type: 'yaml' },
            screenshots: { value: 'on', type: 'text' },
            synthetics_args: { value: null, type: 'text' },
            ignore_https_errors: { value: false, type: 'bool' },
            'throttling.config': { value: '5d/3u/20l', type: 'text' },
            'filter_journeys.tags': { value: null, type: 'yaml' },
            'filter_journeys.match': { value: null, type: 'text' },
            'source.zip_url.ssl.certificate_authorities': { type: 'yaml' },
            'source.zip_url.ssl.certificate': { type: 'yaml' },
            'source.zip_url.ssl.key': { type: 'yaml' },
            'source.zip_url.ssl.key_passphrase': { type: 'text' },
            'source.zip_url.ssl.verification_mode': { type: 'text' },
            'source.zip_url.ssl.supported_protocols': { type: 'yaml' },
            'source.zip_url.proxy_url': { type: 'text' },
            location_name: { value: 'Test private location 0', type: 'text' },
            id: { value: id, type: 'text' },
            config_id: { value: id, type: 'text' },
            run_once: { value: false, type: 'bool' },
            origin: { value: 'ui', type: 'text' },
            'monitor.project.id': { value: null, type: 'text' },
            'monitor.project.name': { value: null, type: 'text' },
          },
          id: 'synthetics/browser-browser-abf904a4-cb9a-4b29-8c11-4d183cca289b-fe621d20-7b01-11ed-803f-475d82e1f9ca-default',
          compiled_stream: {
            __ui: {
              script_source: { is_generated_script: false, file_name: '' },
              is_tls_enabled: false,
            },
            type: 'browser',
            name: 'Test HTTP Monitor 03',
            id,
            origin: 'ui',
            'run_from.id': 'Test private location 0',
            'run_from.geo.name': 'Test private location 0',
            enabled: true,
            schedule: '@every 3m',
            timeout: '16s',
            throttling: '5d/3u/20l',
            tags: ['cookie-test', 'browser'],
            'source.inline.script':
              'step("Visit /users api route", async () => {\\n  const response = await page.goto(\'https://nextjs-test-synthetics.vercel.app/api/users\');\\n  expect(response.status()).toEqual(200);\\n});',
            ...(params ? { params } : {}),
            screenshots: 'on',
            processors: [
              {
                add_fields: {
                  target: '',
                  fields: {
                    'monitor.fleet_managed': true,
                    config_id: id,
                  },
                },
              },
            ],
          },
        },
        {
          enabled: true,
          data_stream: {
            type: 'synthetics',
            dataset: 'browser.network',
            elasticsearch: { privileges: { indices: ['auto_configure', 'create_doc', 'read'] } },
          },
          id: 'synthetics/browser-browser.network-abf904a4-cb9a-4b29-8c11-4d183cca289b-fe621d20-7b01-11ed-803f-475d82e1f9ca-default',
          compiled_stream: {
            processors: [
              { add_observer_metadata: { geo: { name: 'Fleet managed' } } },
              { add_fields: { target: '', fields: { 'monitor.fleet_managed': true } } },
            ],
          },
        },
        {
          enabled: true,
          data_stream: {
            type: 'synthetics',
            dataset: 'browser.screenshot',
            elasticsearch: { privileges: { indices: ['auto_configure', 'create_doc', 'read'] } },
          },
          id: 'synthetics/browser-browser.screenshot-abf904a4-cb9a-4b29-8c11-4d183cca289b-fe621d20-7b01-11ed-803f-475d82e1f9ca-default',
          compiled_stream: {
            processors: [
              { add_observer_metadata: { geo: { name: 'Fleet managed' } } },
              { add_fields: { target: '', fields: { 'monitor.fleet_managed': true } } },
            ],
          },
        },
      ],
    },
  ],
  is_managed: true,
  revision: 1,
  created_at: '2022-12-13T16:20:06.672Z',
  created_by: 'system',
  updated_at: '2022-12-13T16:20:06.672Z',
  updated_by: 'system',
});
