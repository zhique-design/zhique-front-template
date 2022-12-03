import React from 'react';
import { Drawer } from 'antd';
import SiderMenu from '@/components/SiderMenu/SiderMenu';
import { observer, inject } from 'mobx-react';
import { MenuStore } from '@/stores';

interface SiderMenuWrapperProps {
  menuStore?: MenuStore;
}

const SiderMenuWrapper: React.FC<SiderMenuWrapperProps> = observer(
  ({ menuStore }) => {
    if (!menuStore) return null;
    const { isCollapsed, setCollapsed, isMobile } = menuStore;
    return isMobile ? (
      <Drawer
        open={!isCollapsed}
        placement="left"
        onClose={() => setCollapsed(true)}
        style={{
          padding: 0,
          height: '100vh',
        }}
      >
        <SiderMenu collapsed={isMobile ? false : isCollapsed} />
      </Drawer>
    ) : (
      <SiderMenu />
    );
  }
);

export default inject(...['menuStore'])(SiderMenuWrapper);
