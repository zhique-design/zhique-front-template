import React, { DetailedHTMLProps, HTMLAttributes } from 'react';

interface IconProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> {
  type: string;
}

const Icon: React.FC<IconProps> = ({ type, className, ...rest }) => (
  <i className={className} {...rest}>
    <svg className="zhique-icon" aria-hidden="true">
      <use xlinkHref={`#zhique-icon-${type}`} />
    </svg>
  </i>
);

export default Icon;
