import React from 'react';
import { observer, inject } from 'mobx-react';
import { Layout } from 'antd';

import { TopNavHeader, GlobalHeader } from '@/components';
import { GlobalStore, MenuStore } from '@/stores';

const { Header } = Layout;

interface HeaderViewProps {
  globalStore?: GlobalStore;
  menuStore?: MenuStore;
}

const HeaderView: React.FC<HeaderViewProps> = observer(
  ({ globalStore, menuStore }) => {
    if (!globalStore || !menuStore) return null;
    const { isMobile, isTop } = globalStore;
    return (
      <Header style={{ padding: 0 }}>
        {isTop && !isMobile ? <TopNavHeader /> : <GlobalHeader />}
      </Header>
    );
  }
);
export default inject(...['globalStore', 'menuStore'])(HeaderView);
