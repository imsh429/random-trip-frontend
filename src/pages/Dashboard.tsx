// src/pages/Dashboard.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="p-6 text-center">
      <h1 className="text-3xl font-bold mb-8">랜덤 여행 생성기 대시보드</h1>
      <div className="flex justify-center gap-4">
        <button
          onClick={() => navigate("/trip/random")}
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded"
        >
          랜덤 여행지 뽑기
        </button>
        <button
          onClick={() => navigate("/trip/plan")}
          className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-2 rounded"
        >
          여행 경로 생성
        </button>
        {/* 더 많은 버튼들 */}
      </div>
    </div>
  );
};

export default Dashboard;
