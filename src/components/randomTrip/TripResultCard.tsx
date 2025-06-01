import React from 'react';

type TripInfo = {
  korName: string;
  engName: string;
  latitude: number;
  longitude: number;
};

interface Props {
  tripInfo: TripInfo;
}

const TripResultCard: React.FC<Props> = ({ tripInfo }) => {
  return (
    <div className="w-full max-w-[600px] bg-white rounded-[40px] shadow-[rgba(0,0,0,0.1)_8px_8px_32px] border border-white/50 p-10 mb-10 text-center">

      <h2 className="text-4xl font-extrabold text-gray-900 mb-6">{tripInfo.korName}</h2>

      <p className="text-lg text-gray-500 mb-8">
        📍 {tripInfo.engName}
      </p>

      <div className="flex justify-center gap-12 text-gray-700 font-semibold">
        <div>
          <p className="text-md mb-1">위도</p>
          <p>{tripInfo.latitude.toFixed(5)}</p>
        </div>
        <div>
          <p className="text-md mb-1">경도</p>
          <p>{tripInfo.longitude.toFixed(5)}</p>
        </div>
      </div>

    </div>
  );
};

export default TripResultCard;
