import React, { useState } from 'react';
import { Layout } from 'antd';
import classNames from 'classnames';
import { observer, inject } from 'mobx-react';
import { SiderProps } from 'antd/lib/layout/Sider';
import { Link } from 'react-router-dom';
import { MenuStore } from '@/stores';
import logo from '@/assets/logo.svg';
import BaseMenu from './BaseMenu';

import styles from './index.module.less';

const { Sider } = Layout;

interface SiderMenuProps extends SiderProps {
  menuStore?: MenuStore;
}

const SiderMenu: React.FC<SiderMenuProps> = observer(
  ({ menuStore, ...rest }) => {
    if (!menuStore) return null;
    const { isCollapsed, menuData, theme, setCollapsed } = menuStore;

    const [openKeys, setOpenKeys] = useState<Array<any>>([]);

    return (
      <Sider
        trigger={null}
        collapsible
        collapsed={isCollapsed}
        breakpoint="lg"
        onCollapse={setCollapsed}
        width={256}
        theme={theme}
        className={classNames(styles.sider, {
          [styles.light]: theme === 'light',
        })}
        {...rest}
      >
        <div className={styles.logo}>
          <Link to="/">
            <img src={logo} alt="logo" />
            <h1>知雀</h1>
          </Link>
        </div>
        <BaseMenu
          key="Menu"
          mode="inline"
          style={{ padding: '16px 0', width: '100%' }}
          onOpenChange={(data) => {
            // 判断是否有多个菜单展开
            const flag =
              data.filter((openKey) =>
                menuData.some((item) => item.path === openKey)
              )?.length > 1;
            setOpenKeys(flag ? [data.pop()] : [...data]);
          }}
          openKeys={isCollapsed ? [] : openKeys}
        />
      </Sider>
    );
  }
);

export default inject(...['menuStore'])(SiderMenu);
