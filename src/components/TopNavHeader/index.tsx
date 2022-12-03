import React, { Component } from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { inject, observer } from 'mobx-react';

import { MenuStore } from '@/stores';
import BaseMenu from '../SiderMenu/BaseMenu';

import styles from './index.module.less';

interface TopNavHeaderProps {
  menuStore?: MenuStore;
}

@inject(...['menuStore'])
@observer
export default class TopNavHeader extends Component<TopNavHeaderProps> {
  render() {
    const { menuStore } = this.props;
    if (!menuStore) return null;

    const { theme } = menuStore;

    return (
      <div
        className={classNames(
          styles.head,
          theme === 'light' ? styles.light : ''
        )}
      >
        <div className={classNames(styles.main, styles.wide)}>
          <div className={styles.left}>
            <div className={styles.logo} key="logo" id="logo">
              <Link to="/">
                <h1>知雀</h1>
              </Link>
            </div>
            <div className={styles.menu}>
              <BaseMenu
                {...this.props}
                style={{ border: 'none', height: 64 }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
