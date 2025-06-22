import React from 'react';
import DashboardHeader from '../components/dashboard/DashboardHeader';
import TripPlannerChatBot from '../components/chatbot/TripPlannerChatBot';

const RandomTripPlanPage: React.FC = () => {
  return (
    <div className="min-h-screen w-screen bg-gradient-to-br from-[#fdfbfb] to-[#ebedee] font-['Nunito']">
      <DashboardHeader />
      <div className="pt-36 flex justify-center px-6">
        <div className="w-[90%] max-w-[1000px] flex flex-col items-center">
          <h1 className="text-5xl font-black mb-12 text-gray-900 drop-shadow-sm">AI 여행 플래너</h1>
          <TripPlannerChatBot />
        </div>
      </div>
    </div>
  );
};

export default RandomTripPlanPage;
