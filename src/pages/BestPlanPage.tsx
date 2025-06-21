import { useState } from "react";
import { useLocation } from "react-router-dom";
import SpotMap from "../components/bestplan/SpotMap";
import StartLocationSelector from "../components/bestplan/StartLocationSelector";

interface Spot {
  name: string;
  lat: number;
  lng: number;
}

const BestPlanPage = () => {
  const location = useLocation();
  const spots: Spot[] = location.state?.spots || [];
  const [selectedStart, setSelectedStart] = useState<Spot | null>(null);

  return (
    <div className="min-h-screen w-screen bg-gradient-to-br from-[#fdfbfb] to-[#ebedee] flex justify-center font-['Nunito']">
      <div className="w-full max-w-[1400px] px-8 py-16">
        <h1 className="text-3xl font-bold text-gray-800 mb-10">🗺 여행 경로 지도</h1>

        <div className="flex flex-col lg:flex-row gap-10">
          {/* 출발지 선택 영역 */}
          <div className="flex-1 bg-white rounded-[40px] shadow-[rgba(0,0,0,0.1)_8px_8px_32px] p-10 border border-white/50">
            <StartLocationSelector spots={spots} onStartSelect={setSelectedStart} />
          </div>

          {/* 지도 영역 - 높이 보장! */}
          <div className="flex-1 min-h-[600px] bg-white rounded-[40px] shadow-[rgba(0,0,0,0.1)_8px_8px_32px] p-10 border border-white/50 min-h-[600px]">
            <SpotMap spots={spots} start={selectedStart} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BestPlanPage;
