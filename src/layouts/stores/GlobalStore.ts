import { makeAutoObservable } from 'mobx';

export default class GlobalStore {
  props: any;

  isMobile = false;

  documentTitle = '知雀';

  constructor(node) {
    this.setProps(node.props);
    makeAutoObservable(this);
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
}
