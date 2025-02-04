/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import React, { Component } from 'react';
import { i18n } from '@kbn/i18n';
import { Redirect } from 'react-router-dom';
import { EmbeddableStateTransfer } from '@kbn/embeddable-plugin/public';
import { ScopedHistory } from '@kbn/core/public';
import { getToasts } from '../../kibana_services';
import { MapsListView } from './maps_list_view';
import { APP_ID } from '../../../common/constants';
import { mapsClient } from '../../content_management';

interface Props {
  history: ScopedHistory;
  stateTransfer: EmbeddableStateTransfer;
}

export class LoadListAndRender extends Component<Props> {
  _isMounted: boolean = false;
  state = {
    mapsLoaded: false,
    hasSavedMaps: null,
  };

  componentDidMount() {
    this._isMounted = true;
    this.props.stateTransfer.clearEditorState(APP_ID);
    this._loadMapsList();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  async _loadMapsList() {
    try {
      const results = await mapsClient.search({ limit: 1 });
      if (this._isMounted) {
        this.setState({ mapsLoaded: true, hasSavedMaps: !!results.hits.length });
      }
    } catch (err) {
      if (this._isMounted) {
        this.setState({ mapsLoaded: true, hasSavedMaps: false });
        getToasts().addDanger({
          title: i18n.translate('xpack.maps.mapListing.errorAttemptingToLoadSavedMaps', {
            defaultMessage: `Unable to load maps`,
          }),
          text: `${err}`,
        });
      }
    }
  }

  render() {
    const { mapsLoaded, hasSavedMaps } = this.state;

    if (mapsLoaded) {
      return hasSavedMaps ? <MapsListView history={this.props.history} /> : <Redirect to="/map" />;
    } else {
      return null;
    }
  }
}
