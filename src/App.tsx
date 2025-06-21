import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { AnimatePresence, motion } from 'framer-motion';

import LoginPage from './pages/LoginPage';
import LoginRedirect from './pages/LoginRedirect';
import Dashboard from './pages/Dashboard';
import RandomTripPage from './pages/RandomTripPage';
import RandomTripPlanPage from './pages/RandomTripPlanPage';
import BestPlanPage from './pages/BestPlanPage';
const AnimatedRoutes: React.FC = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><LoginPage /></PageTransition>} />
        <Route path="/oauth/callback/kakao" element={<PageTransition><LoginRedirect /></PageTransition>} />
        <Route path="/dashboard" element={<PageTransition><Dashboard /></PageTransition>} />
        <Route path="/trip/random" element={<PageTransition><RandomTripPage /></PageTransition>} />
        <Route path="/trip/plan" element={<PageTransition><RandomTripPlanPage /></PageTransition>} />
        <Route path="/trip/bestplan" element={<PageTransition><BestPlanPage></BestPlanPage></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
};

const PageTransition: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.6, ease: "easeOut" }}
  >
    {children}
  </motion.div>
);

const App: React.FC = () => {
  return (
    <RecoilRoot>
      <Router>
        <AnimatedRoutes />
      </Router>
    </RecoilRoot>
  );
};

export default App;
