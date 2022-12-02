import React from 'react';
import { Outlet } from 'react-router-dom';

const Welcome: React.FC = () => {
  return (
    <div>
      知雀
      <Outlet />
    </div>
  );
};

export default Welcome;
