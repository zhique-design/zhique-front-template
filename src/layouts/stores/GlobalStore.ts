import { autorun, makeAutoObservable } from 'mobx';
import { extractAccessTokenFromHash, setAccessToken } from '@/utils/token';

export default class GlobalStore {
  props;

  isMobile = false;

  documentTitle = '知雀';

  locationHash = '';

  constructor(node) {
    this.setProps(node.props);
    makeAutoObservable(this);
    autorun(() => {
      this.setAccessToken();
    });
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
