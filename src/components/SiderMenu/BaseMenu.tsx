import React, { Component } from 'react';
import { Menu, MenuProps } from 'antd';
import { Link } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { MenuStore } from '@/stores';
import Icon from '../Icon';

import styles from './index.module.less';

interface BaseMenuProps extends MenuProps {
  menuStore?: MenuStore;
}

const conversionPath = (path) => {
  if (path && path.indexOf('http') === 0) {
    return path;
  }
  return `/${path || ''}`.replace(/\/+/g, '/');
};

const getIcon = (icon) => {
  if (typeof icon === 'string' && icon.indexOf('http') === 0) {
    return <img src={icon} alt="icon" className={styles.icon} />;
  }
  if (typeof icon === 'string') {
    return <Icon type={icon} />;
  }
  return icon;
};

@inject(...['menuStore'])
@observer
export default class BaseMenu extends Component<BaseMenuProps> {
  /**
   * 获得菜单的子节点
   * @param menusData 菜单数据
   */
  getNavMenuItems = (menusData?: Array<any>) => {
    if (!menusData) return [];
    return menusData
      .filter((item) => item.name)
      .map((item) => this.getSubMenuOrItem(item))
      .filter((item) => item);
  };

  /**
   * 渲染子菜单或者菜单
   * @param item
   */
  getSubMenuOrItem = (item: any) => {
    if (item.children && item.children.some((child) => child.name)) {
      return (
        <Menu.SubMenu
          key={item.path}
          title={item.icon ? getIcon(item.icon) : item.name}
        >
          {this.getNavMenuItems(item.children)}
        </Menu.SubMenu>
      );
    }
    return <Menu.Item key={item.path}>{this.getMenuItemPath(item)}</Menu.Item>;
  };

  getMenuItemPath = (item) => {
    const itemPath = conversionPath(item.path);
    const { target } = item;
    const icon = getIcon(item.icon);
    // Is it a http link
    if (/^https?:\/\//.test(itemPath)) {
      return (
        <a href={itemPath} target={target}>
          {icon}
          <span>{item.name}</span>
        </a>
      );
    }
    const { menuStore } = this.props;
    if (!menuStore) return null;
    const { pathname } = menuStore;
    return (
      <Link to={itemPath} target={target} replace={itemPath === pathname}>
        {icon}
        <span>{item.name}</span>
      </Link>
    );
  };

  render() {
    const { openKeys, menuStore, ...rest } = this.props;
    if (!menuStore) return null;
    const { menuData, theme, mode, selectedMenuKeys } = menuStore;

    let props = {};
    if (openKeys) {
      props = { openKeys };
    }
    return (
      <Menu
        key="Menu"
        selectedKeys={selectedMenuKeys}
        theme={theme}
        mode={mode}
        {...props}
        {...rest}
      >
        {this.getNavMenuItems(menuData)}
      </Menu>
    );
  }
}
