/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import {
  lazyLoadReduxEmbeddablePackage,
  ReduxEmbeddablePackage,
} from '@kbn/presentation-util-plugin/public';
import { ErrorEmbeddable } from '@kbn/embeddable-plugin/public';

import { ControlOutput } from '../../types';
import { ControlGroupInput } from '../types';
import { pluginServices } from '../../services';
import { DeleteControlAction } from './delete_control_action';
import { OptionsListEmbeddableInput } from '../../options_list';
import { controlGroupInputBuilder } from '../control_group_input_builder';
import { ControlGroupContainer } from '../embeddable/control_group_container';
import { OptionsListEmbeddable } from '../../options_list/embeddable/options_list_embeddable';

let container: ControlGroupContainer;
let embeddable: OptionsListEmbeddable;
let reduxEmbeddablePackage: ReduxEmbeddablePackage;

beforeAll(async () => {
  reduxEmbeddablePackage = await lazyLoadReduxEmbeddablePackage();

  const controlGroupInput = { chainingSystem: 'NONE', panels: {} } as ControlGroupInput;
  controlGroupInputBuilder.addOptionsListControl(controlGroupInput, {
    dataViewId: 'test-data-view',
    title: 'test',
    fieldName: 'test-field',
    width: 'medium',
    grow: false,
  });
  container = new ControlGroupContainer(reduxEmbeddablePackage, controlGroupInput);
  await container.untilInitialized();

  embeddable = container.getChild(container.getChildIds()[0]);
});

test('Action is incompatible with Error Embeddables', async () => {
  const deleteControlAction = new DeleteControlAction();
  const errorEmbeddable = new ErrorEmbeddable('Wow what an awful error', { id: ' 404' });
  expect(await deleteControlAction.isCompatible({ embeddable: errorEmbeddable as any })).toBe(
    false
  );
});

test('Execute throws an error when called with an embeddable not in a parent', async () => {
  const deleteControlAction = new DeleteControlAction();
  const optionsListEmbeddable = new OptionsListEmbeddable(
    reduxEmbeddablePackage,
    {} as OptionsListEmbeddableInput,
    {} as ControlOutput
  );
  await expect(async () => {
    await deleteControlAction.execute({ embeddable: optionsListEmbeddable });
  }).rejects.toThrow(Error);
});

describe('Execute should open a confirm modal', () => {
  test('Canceling modal will keep control', async () => {
    const spyOn = jest.fn().mockResolvedValue(false);
    pluginServices.getServices().overlays.openConfirm = spyOn;

    const deleteControlAction = new DeleteControlAction();
    await deleteControlAction.execute({ embeddable });
    expect(spyOn).toHaveBeenCalled();

    expect(container.getPanelCount()).toBe(1);
  });

  test('Confirming modal will delete control', async () => {
    const spyOn = jest.fn().mockResolvedValue(true);
    pluginServices.getServices().overlays.openConfirm = spyOn;

    const deleteControlAction = new DeleteControlAction();
    await deleteControlAction.execute({ embeddable });
    expect(spyOn).toHaveBeenCalled();

    expect(container.getPanelCount()).toBe(0);
  });
});
