import axios from 'axios';
import React, { useState, useEffect } from 'react';

const NAVER_CLIENT_ID = import.meta.env.VITE_NAVER_CLIENT_ID;
const NAVER_CLIENT_SECRET = import.meta.env.VITE_NAVER_CLIENT_SECRET;

type TripSpot = {
  name: string;
  latitude: number;
  longitude: number;
};

const RandomTripPlanPage: React.FC = () => {
  const [region, setRegion] = useState('');
  const [mood, setMood] = useState('healing');
  const [_spots, setSpots] = useState<TripSpot[]>([]);
  const [map, setMap] = useState<naver.maps.Map | null>(null);

  useEffect(() => {
    const mapInstance = new naver.maps.Map('map', {
      center: new naver.maps.LatLng(37.5665, 126.9780), // 초기 서울 중심
      zoom: 13,
    });
    setMap(mapInstance);
  }, []);

  const handlePlan = async () => {
    try {
      const res = await axios.post('http://113.198.66.75:10072/trip/plan', {
        mood,
        region,
      });

      const names: string[] = res.data.route.map((spot: any) => spot.name);

      // 장소 이름 → 위경도로 변환 (Geocoding)
      const geoResults: TripSpot[] = await Promise.all(
        names.map(async (name) => {
          const geoRes = await axios.get(
            'https://naveropenapi.apigw.ntruss.com/map-geocode/v2/geocode',
            {
              params: { query: `${region} ${name}` },
              headers: {
                'X-NCP-APIGW-API-KEY-ID': NAVER_CLIENT_ID,
                'X-NCP-APIGW-API-KEY': NAVER_CLIENT_SECRET,
              },
            }
          );

          const addr = geoRes.data.addresses[0];
          return {
            name,
            latitude: parseFloat(addr.y),
            longitude: parseFloat(addr.x),
          };
        })
      );

      setSpots(geoResults);

      // 지도 위에 경로 표시
      if (map && geoResults.length >= 2) {
        const path = geoResults.map(
          (spot) => new naver.maps.LatLng(spot.latitude, spot.longitude)
        );

        new naver.maps.Polyline({
          path,
          strokeColor: '#FF0000',
          strokeWeight: 4,
          map,
        });

        map.setCenter(path[0]);
      }
    } catch (err) {
      console.error('경로 생성 실패:', err);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">여행 경로 생성</h2>

      <div className="mb-4">
        <label className="block mb-1">지역:</label>
        <input
          type="text"
          value={region}
          onChange={(e) => setRegion(e.target.value)}
          className="border p-2 w-full"
          placeholder="예: 장성군"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1">분위기 (mood):</label>
        <select
          value={mood}
          onChange={(e) => setMood(e.target.value)}
          className="border p-2 w-full"
        >
          <option value="healing">힐링</option>
          <option value="adventure">모험</option>
          <option value="food">맛집</option>
        </select>
      </div>

      <button
        onClick={handlePlan}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        여행 경로 생성
      </button>

      <div id="map" className="w-full h-[500px] mt-6" />
    </div>
  );
};

export default RandomTripPlanPage;
