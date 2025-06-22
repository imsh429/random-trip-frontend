import { useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import SpotMap from "../components/bestplan/SpotMap";
import StartLocationSelector from "../components/bestplan/StartLocationSelector";
import DashboardHeader from '../components/dashboard/DashboardHeader';

interface Spot {
  name: string;
  lat: number;
  lng: number;
}

interface SectionInfo {
  sectionId: string;
  roadNames: string[];
  distance: number;
  duration: number;
}

// 연속된 중복 도로명 제거 함수
const removeConsecutiveDuplicates = (arr: string[]): string[] => {
  return arr.filter((name, idx) => idx === 0 || name !== arr[idx - 1]);
};

const BestPlanPage = () => {
  const location = useLocation();
  const initialSpots: Spot[] = location.state?.spots || [];

  const [confirmedStart, setConfirmedStart] = useState<Spot | null>(null);
  const [confirmedSpots, setConfirmedSpots] = useState<Spot[]>([]);
  const [tempSelectedSpot, setTempSelectedSpot] = useState<Spot | null>(null);
  const [polyline, setPolyline] = useState<{ lat: number; lng: number }[]>([]);
  const [sectionInfo, setSectionInfo] = useState<SectionInfo[]>([]);

  const handleSubmitPlan = async () => {
    if (!confirmedStart || confirmedSpots.length === 0) {
      alert("출발지와 최소 1개의 여행지를 설정해주세요.");
      return;
    }
    const token = localStorage.getItem("accessToken");
    try {
      const res = await axios.post(
        "http://localhost:8080/trip/confirm",
        {
          start: confirmedStart,
          spots: confirmedSpots,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("보낸 데이터:", {
        start: confirmedStart,
        spots: confirmedSpots,
      });
      console.log("경로 응답:", res.data);

      setPolyline(res.data.polyline || []);
      setSectionInfo(res.data.sections || []);
    } catch (err) {
      console.error("경로 생성 실패", err);
      alert("경로 생성 중 문제가 발생했습니다.");
    }
  };

  return (
    <div className="min-h-screen w-screen bg-gradient-to-br from-[#fdfbfb] to-[#ebedee] flex justify-center font-['Nunito']">
      <div className="w-full max-w-[1400px] px-8 py-16">
        <DashboardHeader />

        <div className="flex flex-col lg:flex-row gap-10 mt-16">
          {/* 왼쪽 패널 */}
          <div className="flex-1 bg-white rounded-[40px] shadow-[rgba(0,0,0,0.1)_8px_8px_32px] p-10 border border-white/50 space-y-6">
            <StartLocationSelector
              spots={initialSpots}
              tempSelectedSpot={tempSelectedSpot}
              setTempSelectedSpot={setTempSelectedSpot}
              onConfirmStart={setConfirmedStart}
              onConfirmSpot={(spot) => {
                setConfirmedSpots((prev) =>
                  prev.find((s) => s.name === spot.name) ? prev : [...prev, spot]
                );
              }}
            />

            {/* 요약 정보 */}
            <div className="pt-4 space-y-2 border-t border-gray-200">
              {confirmedStart && (
                <p className="text-lg font-semibold text-gray-700">
                  🚩 <span className="text-gray-900">출발지:</span> {confirmedStart.name}
                </p>
              )}
              {confirmedSpots.length > 0 && (
                <p className="text-lg font-semibold text-gray-700">
                  📍 <span className="text-gray-900">여행지:</span>{" "}
                  {confirmedSpots.map((s) => s.name).join(", ")}
                </p>
              )}
            </div>

            {/* 도로 정보 */}
            {sectionInfo.length > 0 && (
              <div className="pt-4 border-t border-gray-200">
                <h3 className="text-md font-semibold text-gray-700 mb-2">🛣 도로 정보</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  {sectionInfo.map((sec, idx) => (
                    <li key={sec.sectionId || idx}>
                      🛣{" "}
                      <span className="font-semibold text-gray-800">
                        {Array.isArray(sec.roadNames) && sec.roadNames.length > 0
                          ? removeConsecutiveDuplicates(sec.roadNames).join(" → ")
                          : "이름없는 도로"}
                      </span>{" "}
                      - {(sec.distance / 1000).toFixed(2)}km / {Math.round(sec.duration / 60)}분
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* 제출 버튼 */}
            <div className="pt-6">
              <button
                onClick={handleSubmitPlan}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-[20px] text-lg font-bold shadow-md transition"
              >
                이대로 여행하기
              </button>
            </div>
          </div>

          {/* 지도 */}
          <div className="flex-1 min-h-[600px] bg-white rounded-[40px] shadow-[rgba(0,0,0,0.1)_8px_8px_32px] p-10 border border-white/50">
            <SpotMap
              start={confirmedStart}
              spots={confirmedSpots}
              preview={tempSelectedSpot}
              polyline={polyline}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BestPlanPage;
