import { MenuTheme } from 'antd';
import { makeAutoObservable, runInAction } from 'mobx';

import { queryMenuList } from '@/services/console';
import { getResponseList } from '@/utils/utils';
import GlobalStore from './GlobalStore';

export default class MenuStore {
  props;

  isCollapsed = false;

  theme: MenuTheme = 'dark';

  mode?: 'horizontal' | 'vertical' | 'inline' = 'vertical';

  menuData: Array<any> = [];

  constructor(node) {
    makeAutoObservable(this);
    this.setProps(node.props);
  }

  get globalStore(): GlobalStore {
    return this.props.globalStore;
  }

  get isTop(): boolean {
    return this.globalStore.isTop;
  }

  get isMobile(): boolean {
    return this.globalStore.isMobile;
  }

  get pathname(): string {
    return this.props.location.pathname;
  }

  get flatMenuKeys() {
    return this.getFlatMenuKeys(this.menuData);
  }

  getFlatMenuKeys = (menus: Array<any>) => {
    let keys: Array<any> = [];
    menus.forEach((item) => {
      if (item.children) {
        keys = keys.concat(this.getFlatMenuKeys(item.children));
      }
      keys.push({ path: item.path, tree: item.tree });
    });
    return keys;
  };

  get selectedMenuKeys() {
    const selectedMenu = this.flatMenuKeys.find(
      (item) => item.path === this.pathname
    );
    return selectedMenu?.tree || [];
  }

  setProps = (props) => {
    this.props = props;
  };

  setCollapsed = (collapsed: boolean) => {
    this.isCollapsed = collapsed;
  };

  setTheme = (theme: MenuTheme) => {
    this.theme = theme;
  };

  setMenuData = async () => {
    const data = await queryMenuList({
      level: 1,
    });
    runInAction(() => {
      this.menuData = getResponseList(data);
    });
  };
}
