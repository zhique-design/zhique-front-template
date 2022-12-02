import React, { Component } from 'react';
import { enquireScreen, unenquireScreen } from 'enquire-js';
import { ContainerQuery } from 'react-container-query';
import DocumentTitle from 'react-document-title';
import classNames from 'classnames';
import { observer, Provider } from 'mobx-react';
import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';

import { GlobalStore } from '../stores';

const query = {
  'screen-xs': {
    maxWidth: 575,
  },
  'screen-sm': {
    minWidth: 576,
    maxWidth: 767,
  },
  'screen-md': {
    minWidth: 768,
    maxWidth: 991,
  },
  'screen-lg': {
    minWidth: 992,
    maxWidth: 1199,
  },
  'screen-xl': {
    minWidth: 1200,
    maxWidth: 1599,
  },
  'screen-xxl': {
    minWidth: 1600,
  },
};

@observer
export default class GlobalLayout extends Component {
  globalStore: GlobalStore;

  enquireHandler: any;

  constructor(props) {
    super(props);
    this.globalStore = new GlobalStore(this);
  }

  componentDidMount() {
    this.enquireHandler = enquireScreen((mobile) => {
      const { isMobile, setMobile } = this.globalStore;
      if (isMobile !== mobile) {
        setMobile(mobile);
      }
    });
  }

  componentWillUnmount() {
    unenquireScreen(this.enquireHandler);
  }

  render() {
    const { documentTitle } = this.globalStore;
    return (
      <DocumentTitle title={documentTitle}>
        <ContainerQuery query={query}>
          {(params) => (
            <Layout
              style={{ minHeight: '100vh' }}
              className={classNames(params)}
            >
              <Provider globalStore={this.globalStore}>
                <Outlet />
              </Provider>
            </Layout>
          )}
        </ContainerQuery>
      </DocumentTitle>
    );
  }
}
