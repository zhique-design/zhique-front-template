import { autorun, makeAutoObservable } from 'mobx';
import { extractAccessTokenFromHash, setAccessToken } from '@/utils/token';

export default class GlobalStore {
  props;

  isMobile = false;

  documentTitle = '知雀';

  locationHash = '';

  layout: 'topmenu' | 'sidemenu' = 'sidemenu';

  constructor(node) {
    makeAutoObservable(this);
    this.setProps(node.props);
    autorun(() => {
      this.setAccessToken();
    });
  }

  get isTop(): boolean {
    return this.layout === 'topmenu';
  }

  setProps = (props) => {
    this.props = props;
  };

  setMobile = (isMobile: boolean) => {
    this.isMobile = isMobile;
  };

  setDocumentTitle = (documentTitle: string) => {
    this.documentTitle = documentTitle;
  };

  setLoactionHash = (hash: string) => {
    this.locationHash = hash;
  };

  setAccessToken = () => {
    const token = extractAccessTokenFromHash(this.locationHash);
    if (token) {
      setAccessToken(token);
      const {
        location: { pathname, search },
      } = this.props;
      window.location.href = `${pathname}${search}`;
    }
  };
}
