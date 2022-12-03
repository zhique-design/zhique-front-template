import React, { Component } from 'react';
import Debounce from 'lodash-decorators/debounce';
import { Link } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { Icon } from '@/components';
import { MenuStore } from '@/stores';
import logo from '@/assets/logo.svg';
import styles from './index.module.less';

interface GlobalHeaderProps {
  menuStore?: MenuStore;
}

@inject(...['menuStore'])
@observer
export default class GlobalHeader extends Component<GlobalHeaderProps> {
  componentWillUnmount() {
    // @ts-ignore
    this.triggerResizeEvent.cancel();
  }

  toggle = () => {
    const { menuStore } = this.props;
    if (menuStore) {
      const { isCollapsed, setCollapsed } = menuStore;
      setCollapsed(!isCollapsed);
      this.triggerResizeEvent();
    }
  };

  // eslint-disable-next-line class-methods-use-this
  @Debounce(600)
  // eslint-disable-next-line class-methods-use-this
  triggerResizeEvent() {
    const event = document.createEvent('HTMLEvents');
    event.initEvent('resize', true, false);
    window.dispatchEvent(event);
  }

  render() {
    const { menuStore } = this.props;
    if (!menuStore) return null;
    const { isCollapsed, isMobile } = menuStore;
    return (
      <div className={styles.header}>
        {isMobile && (
          <Link to="/" className={styles.logo} key="logo">
            <img alt="logo" src={logo} width="64" />
          </Link>
        )}
        <Icon
          type={isCollapsed ? 'indent' : 'outdent'}
          className={styles.trigger}
          onClick={this.toggle}
        />
      </div>
    );
  }
}
