import React, { useEffect, useState } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';

const WeatherWidget: React.FC = () => {
  const [weather, setWeather] = useState<any>(null);
  const [location, setLocation] = useState<string>('위치 불러오는 중...');
  const [lat, setLat] = useState<number | null>(null);
  const [lon, setLon] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchResults, setSearchResults] = useState<any[]>([]);

  const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLat(pos.coords.latitude);
        setLon(pos.coords.longitude);
      },
      () => {
        setLat(37.5665);
        setLon(126.9780);
      }
    );
  }, []);

  useEffect(() => {
    if (lat === null || lon === null) return;
    const fetchWeather = async () => {
      try {
        const weatherRes = await axios.get(
          `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=minutely,alerts&units=metric&appid=${API_KEY}`
        );
        setWeather(weatherRes.data);

        const geoRes = await axios.get(
          `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${API_KEY}`
        );
        setLocation(geoRes.data[0]?.name || '알 수 없는 위치');
      } catch (error) {
        console.error("날씨 데이터 호출 실패:", error);
      }
    };

    fetchWeather();
  }, [lat, lon]);

  const handleSearch = async () => {
    if (!searchTerm.trim()) return;
    try {
      const res = await axios.get(
        `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(searchTerm)}&limit=5&appid=${API_KEY}`
      );
      setSearchResults(res.data);
    } catch (e) {
      console.error("검색 실패", e);
    }
  };

  const handleSelectLocation = (selected: any) => {
    setLat(selected.lat);
    setLon(selected.lon);
    setSearchResults([]);
    setSearchTerm("");
  };

  if (!weather) {
    return <div className="p-4 bg-white rounded-3xl shadow-lg text-center">날씨 불러오는 중...</div>;
  }

  const current = weather.current;
  const daily = weather.daily.slice(0, 5);

  return (
    <div className="p-8 bg-white rounded-[40px] shadow-[rgba(0,0,0,0.1)_8px_8px_32px] border border-white/50 text-center">

      {/* 검색창 */}
      <div className="mb-6 flex justify-center gap-4">
        <input
          type="text"
          placeholder="도시 이름 입력"
          className="bg-[#f9f9f9] border border-white rounded-xl px-4 py-3 w-2/3 shadow-[inset_4px_4px_10px_rgba(0,0,0,0.05)] text-lg text-gray-900 placeholder-gray-400"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
        />
        <button 
          onClick={handleSearch} 
          className="bg-yellow-300 hover:bg-yellow-400 text-black rounded-xl px-6 py-3 font-bold shadow-md text-lg"
        >
          검색
        </button>
      </div>

      {searchResults.length > 0 && (
        <div className="bg-[#f9f9f9] rounded-xl shadow p-3 mb-6 border border-gray-200">
          {searchResults.map((item, index) => (
            <div 
              key={index} 
              className="p-2 cursor-pointer hover:bg-yellow-200 rounded-xl text-gray-900"
              onClick={() => handleSelectLocation(item)}
            >
              {item.name}, {item.country}
            </div>
          ))}
        </div>
      )}

      {/* 현재 날씨 */}
      <h2 className="text-3xl font-extrabold mb-6 text-gray-900">{location} 현재 날씨</h2>

      <div className="flex justify-center items-center gap-6 mb-4">
        <img src={`https://openweathermap.org/img/wn/${current.weather[0].icon}@4x.png`} alt="날씨 아이콘" />
        <div className="text-5xl font-bold text-gray-900">{current.temp.toFixed(1)}°C</div>
      </div>

      <p className="mb-4 text-gray-600 text-lg">
        {current.weather[0].description.charAt(0).toUpperCase() + current.weather[0].description.slice(1)}
      </p>

      <div className="flex justify-center gap-10 text-md mb-8 text-gray-500">
        <div>체감 {current.feels_like.toFixed(1)}°C</div>
        <div>풍속 {current.wind_speed} m/s</div>
        <div>습도 {current.humidity}%</div>
      </div>

      {/* 주간 예보 */}
      <h3 className="text-2xl font-bold mb-4 text-gray-900">주간 예보</h3>

      <div className="flex overflow-x-auto gap-6 justify-start pb-4">
        {daily.map((day: any, index: number) => (
          <div key={index} className="flex-shrink-0 text-center bg-yellow-100 rounded-3xl p-5 shadow-lg w-28">
            <div className="text-md font-extrabold text-gray-900 mb-2">
              {index === 0 ? "오늘" : dayjs.unix(day.dt).format("MM/DD")}
            </div>
            <img src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`} alt="icon" />
            <div className="text-md font-semibold text-gray-800">
              {Math.round(day.temp.max)}° / {Math.round(day.temp.min)}°
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default WeatherWidget;
