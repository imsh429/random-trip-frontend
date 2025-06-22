import React, { useEffect, useState } from 'react';
import axios from 'axios';

type RecentTripSpot = {
  id: number;
  name: string;
  date: string;
};

const RecentTrip: React.FC = () => {
  const [spots, setSpots] = useState<RecentTripSpot[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecentTrips = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        const res = await axios.get('http://113.198.66.75:10072/trip/my', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setSpots(res.data.spots);
      } catch (err) {
        console.error('최근 여행지 불러오기 실패:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchRecentTrips();
  }, []);

  if (loading) return <div>불러오는 중...</div>;

  return (
    <div className="bg-white rounded-[40px] shadow-[rgba(0,0,0,0.1)_8px_8px_32px] p-10 border border-white/50">
      <h2 className="text-2xl font-bold mb-6 text-gray-900">🗺 최근 다녀온 여행지</h2>
      <div className="flex flex-col gap-4">
        {spots.map((spot) => (
          <div key={spot.id} className="flex justify-between items-center px-4 py-3 bg-gray-100 rounded-xl">
            <span className="text-gray-800 text-lg">{spot.name}</span>
            <span className="text-gray-500 text-sm">{spot.date}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentTrip;
