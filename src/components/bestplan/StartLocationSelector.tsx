import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

interface Spot {
  name: string;
  lat: number;
  lng: number;
}

interface KakaoPlace {
  place_name: string;
  address_name: string;
  road_address_name: string;
  x: string;
  y: string;
}

interface Props {
  spots: Spot[];
  tempSelectedSpot: Spot | null;
  setTempSelectedSpot: (spot: Spot | null) => void;
  onConfirmStart: (spot: Spot) => void;
  onConfirmSpot: (spot: Spot) => void;
}

const StartLocationSelector: React.FC<Props> = ({
  spots,
  tempSelectedSpot,
  setTempSelectedSpot,
  onConfirmStart,
  onConfirmSpot,
}) => {
  const [searchInput, setSearchInput] = useState<string>("");
  const [searchResults, setSearchResults] = useState<KakaoPlace[]>([]);

  const handleSearch = () => {
    if (!searchInput.trim()) return;

    const ps = new window.kakao.maps.services.Places();

    ps.keywordSearch(searchInput, (data: KakaoPlace[], status: string) => {
      if (status === window.kakao.maps.services.Status.OK) {
        setSearchResults(data);
      } else {
        setSearchResults([]);
      }
    });
  };

  const handleSpotClick = (name: string) => {
    setSearchInput(name);
    setSearchResults([]);
    setTimeout(handleSearch, 100);
  };

  const handleResultClick = (place: KakaoPlace) => {
    const selected: Spot = {
      name: place.place_name,
      lat: parseFloat(place.y),
      lng: parseFloat(place.x),
    };
    setTempSelectedSpot(selected);
  };

  const handleConfirmStart = () => {
    if (tempSelectedSpot) {
      onConfirmStart(tempSelectedSpot);
      setTempSelectedSpot(null);
      setSearchInput("");
      setSearchResults([]);
    }
  };

  const handleConfirmSpot = () => {
    if (tempSelectedSpot) {
      onConfirmSpot(tempSelectedSpot);
      setTempSelectedSpot(null);
      setSearchInput("");
      setSearchResults([]);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">🚩 출발지 & 여행지 선택</h2>

      {/* 검색창 */}
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="장소를 입력하세요"
          className="w-full px-5 py-3 text-lg border border-gray-300 rounded-[20px] shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-[20px] font-bold"
        >
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </div>

      {/* 선택 여행지 리스트 */}
      <div className="space-y-2 mb-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-2">📝 선택한 여행지</h3>
        {spots.map((spot, idx) => (
          <div
            key={idx}
            onClick={() => handleSpotClick(spot.name)}
            className="cursor-pointer px-4 py-3 bg-gray-100 hover:bg-gray-200 rounded-[16px] shadow-sm text-gray-800 transition-all"
          >
            {spot.name}
          </div>
        ))}
      </div>

      {/* 검색 결과 */}
      {searchResults.length > 0 && (
        <div className="mt-4">
          <h4 className="text-md font-semibold mb-2 text-gray-700">🔍 검색 결과</h4>
          <ul className="space-y-2">
            {searchResults.map((result, idx) => (
              <li
                key={idx}
                onClick={() => handleResultClick(result)}
                className="cursor-pointer bg-white border border-gray-200 rounded-[12px] px-4 py-3 hover:bg-blue-50 transition"
              >
                <div className="font-bold text-gray-900">{result.place_name}</div>
                <div className="text-sm text-gray-600">{result.address_name}</div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* 확정 버튼 (선택된 장소가 있을 때만 표시) */}
      {tempSelectedSpot && (
        <div className="mt-6 space-x-4">
          <p className="text-gray-800 font-semibold mb-2">선택된 장소: {tempSelectedSpot.name}</p>
          <button
            onClick={handleConfirmStart}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-[20px] font-bold"
          >
            출발지로 확정
          </button>
          <button
            onClick={handleConfirmSpot}
            className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-[20px] font-bold"
          >
            여행지로 확정
          </button>
        </div>
      )}
    </div>
  );
};

export default StartLocationSelector;
