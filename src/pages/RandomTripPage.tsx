// src/pages/RandomTripPage.tsx
import React, { useState } from 'react';
import axios from 'axios';

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
      const res = await axios.get("http://localhost:8080/trip/random");
      setTripInfo(res.data);
    } catch (err) {
      console.error("❌ 여행지 요청 실패:", err);
      alert("여행지를 불러오는 데 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 text-center">
      <h1 className="text-2xl font-bold mb-4">랜덤 여행지 뽑기</h1>
      <button
        onClick={handleStartTrip}
        className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded"
      >
        {loading ? "추천 중..." : "여행지 추천 받기"}
      </button>

      {tripInfo && (
        <div className="mt-6 p-4 border rounded shadow bg-white">
          <h2 className="text-xl font-semibold mb-2">{tripInfo.korName}</h2>
          <p>영문명: {tripInfo.engName}</p>
          <p>위도: {tripInfo.latitude}</p>
          <p>경도: {tripInfo.longitude}</p>
        </div>
      )}
    </div>
  );
};

export default RandomTripPage;
