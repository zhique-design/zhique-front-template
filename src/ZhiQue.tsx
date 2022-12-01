import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Welcome from '@/pages/Welcome';

import './global.less';

const ZhiQue: React.FC = () => (
  <BrowserRouter>
    <div>
      <Routes>
        <Route path="/" element={<Welcome />} />
      </Routes>
    </div>
  </BrowserRouter>
);

export default ZhiQue;
