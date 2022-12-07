import React, { Component } from 'react';
import { inject, observer, Provider } from 'mobx-react';
import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';

import { GlobalStore, MenuStore } from '@/stores';
import { withRouter, SiderMenu } from '@/components';

import Header from './Header';

const { Content, Footer } = Layout;

interface ConsoleLayoutProps extends RouterComponentProps {
  globalStore: GlobalStore;
}

@inject(...['globalStore'])
@withRouter
@observer
export default class ConsoleLayout extends Component<ConsoleLayoutProps> {
  menuStore: MenuStore;

  constructor(props) {
    super(props);
    this.menuStore = new MenuStore(this);
  }

  async componentDidMount() {
    const {
      globalStore: { setDocumentTitle },
    } = this.props;
    setDocumentTitle('知雀-控制台');
    const { getMenuData } = this.menuStore;
    await getMenuData();
  }

  render() {
    const {
      globalStore: { isMobile, isTop },
    } = this.props;

    return (
      <Layout>
        <Provider menuStore={this.menuStore}>
          {isTop && !isMobile ? null : <SiderMenu />}
          <Layout style={{ minHeight: '100vh' }}>
            <Header />
            <Content style={{ margin: 24 }}>
              <Outlet />
            </Content>
            <Footer />
          </Layout>
        </Provider>
      </Layout>
    );
  }
}
