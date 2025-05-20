//앱 진입점
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { RecoilRoot } from 'recoil';

import LoginButton from './components/LoginButton';
import LoginRedirect from './pages/LoginRedirect';
import Dashboard from './pages/Dashboard'; // ✅ 메인 대시보드
import RandomTripPage from './pages/RandomTripPage'; // ✅ 여행지 추천 페이지

const App: React.FC = () => {
  return (
    <RecoilRoot>
      <Router>
        <Routes>
          <Route path="/" element={<LoginButton />} />
          <Route path="/oauth/callback/kakao" element={<LoginRedirect />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/trip/random" element={<RandomTripPage />} />
        </Routes>
      </Router>
    </RecoilRoot>
  );
};

export default App;


