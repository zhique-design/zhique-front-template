import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';

import { GlobalStore } from '../stores';

const { Header, Content, Footer } = Layout;

interface ConsoleLayoutProps {
  globalStore: GlobalStore;
}
@inject(...['globalStore'])
@observer
export default class ConsoleLayout extends Component<ConsoleLayoutProps> {
  componentDidMount() {
    const {
      globalStore: { setDocumentTitle },
    } = this.props;
    setDocumentTitle('知雀-控制台');
  }

  render() {
    return (
      <>
        <Header />
        <Content>
          <Outlet />
        </Content>
        <Footer />
      </>
    );
  }
}
