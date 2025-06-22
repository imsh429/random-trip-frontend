import React from 'react';
import DashboardHeader from '../components/dashboard/DashboardHeader';
import WeatherWidget from '../components/dashboard/WeatherWidget';
import RecentTrip from '../components/dashboard/RecentTrip';

const Dashboard: React.FC = () => {
  return (
    <div className="min-h-screen w-screen bg-gradient-to-br from-[#fdfbfb] to-[#ebedee] flex flex-col items-center font-['Nunito']">

      <div className="w-full max-w-[1400px] px-8 py-16">
        <DashboardHeader />

        <div className="flex flex-col lg:flex-row gap-10 mt-16">

          {/* 날씨 위젯 (왼쪽 박스) */}
          <div className="flex-1 bg-white rounded-[40px] shadow-[rgba(0,0,0,0.1)_8px_8px_32px] p-10 border border-white/50">
            <WeatherWidget />
          </div>

          {/* 여행 경로/방문 기록 (오른쪽 박스) */}
          <div className="flex-1 bg-white rounded-[40px] shadow-[rgba(0,0,0,0.1)_8px_8px_32px] p-10 border border-white/50">
            <RecentTrip />
          </div>

        </div>
      </div>

    </div>
  );
};

export default Dashboard;
