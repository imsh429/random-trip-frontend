import React, { useState } from 'react';
import axios from 'axios';
import DashboardHeader from '../components/dashboard/DashboardHeader';
import RandomTripButton from '../components/randomTrip/RandomTripButton';
import TripResultCard from '../components/randomTrip/TripResultCard';

type TripInfo = {
  korName: string;
  engName: string;
  latitude: number;
  longitude: number;
};

const RandomTripPage: React.FC = () => {
  const [tripInfo, setTripInfo] = useState<TripInfo | null>(null);
  const [loading, setLoading] = useState(false);

  const handleStartTrip = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://113.198.66.75:10072/trip/random");
      setTripInfo(res.data);
    } catch (err) {
      console.error("❌ 여행지 요청 실패:", err);
      alert("여행지를 불러오는 데 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-screen bg-gradient-to-br from-[#fdfbfb] to-[#ebedee] font-['Nunito']">
      <DashboardHeader />

      {/* 헤더 때문에 패딩 확보 */}
      <div className="pt-36 flex justify-center px-6">
        <div className="w-[90%] max-w-[1000px] flex flex-col items-center">

          {/* 타이틀 */}
          <h1 className="text-5xl font-black mb-16 text-gray-900 drop-shadow-sm">
            여행지부터 정해주는 여행플래너
          </h1>

          {/* 버튼 카드 */}
          <div className="bg-white rounded-[40px] shadow-[rgba(0,0,0,0.1)_8px_8px_32px] p-16 mb-16 border border-white/50 w-full flex flex-col items-center">
            <p className="text-xl font-semibold text-gray-700 mb-10">
              우리가 가게 될 여행지는?
            </p>
            <RandomTripButton loading={loading} onClick={handleStartTrip} />
          </div>

          {/* 결과 */}
          {tripInfo && (
            <TripResultCard tripInfo={tripInfo} />
          )}

        </div>
      </div>
    </div>
  );
};

export default RandomTripPage;
