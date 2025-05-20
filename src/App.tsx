//앱 진입점
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { RecoilRoot } from 'recoil';

import LoginButton from './components/LoginButton';
import LoginRedirect from './pages/LoginRedirect';

const App: React.FC = () => {
  return (
    <RecoilRoot>
      <Router>
        <Routes>
          <Route path="/" element={<LoginButton />} />
          <Route path="/oauth/callback/kakao" element={<LoginRedirect />} />
          {/* 추가 라우팅은 여기에 */}
        </Routes>
      </Router>
    </RecoilRoot>
  );
};

export default App;

