import React, { useEffect, useRef } from "react";

interface Spot {
  name: string;
  lat: number;
  lng: number;
}

interface Props {
  spots: Spot[];
  start?: Spot | null;
}

const SpotMap: React.FC<Props> = ({ spots, start }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<kakao.maps.Map | null>(null);

  useEffect(() => {
    const observer = new ResizeObserver(() => {
      if (mapInstance.current) {
        window.kakao.maps.event.trigger(mapInstance.current, "resize");
      }
    });

    if (mapRef.current) {
      observer.observe(mapRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!window.kakao || !window.kakao.maps || !mapRef.current) return;

    const initialize = () => {
      const center = spots.length > 0
        ? new window.kakao.maps.LatLng(spots[0].lat, spots[0].lng)
        : new window.kakao.maps.LatLng(37.5665, 126.9780); // 서울 fallback

      const map = new window.kakao.maps.Map(mapRef.current!, {
        center,
        level: 6,
      });

      mapInstance.current = map;

      spots.forEach((spot) => {
        new window.kakao.maps.Marker({
          map,
          position: new window.kakao.maps.LatLng(spot.lat, spot.lng),
          title: spot.name,
        });
      });

      setTimeout(() => {
        window.kakao.maps.event.trigger(map, "resize");
      }, 300);
    };

    if (window.kakao.maps.load) {
      window.kakao.maps.load(initialize);
    } else {
      initialize();
    }
  }, [spots]);

  useEffect(() => {
    if (!start || !mapInstance.current) return;

    const map = mapInstance.current;
    const latlng = new window.kakao.maps.LatLng(start.lat, start.lng);

    map.setCenter(latlng);

    new window.kakao.maps.Marker({
      map,
      position: latlng,
      title: `출발지: ${start.name}`,
      image: new window.kakao.maps.MarkerImage(
        "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png",
        new window.kakao.maps.Size(24, 35)
      ),
    });

    setTimeout(() => {
      window.kakao.maps.event.trigger(map, "resize");
    }, 300);
  }, [start]);

  useEffect(() => {
    const handleResize = () => {
      if (mapInstance.current) {
        window.kakao.maps.event.trigger(mapInstance.current, "resize");
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      ref={mapRef}
      className="w-full h-full min-h-[600px] rounded-[30px] bg-gray-100"
    />
  );
};

export default SpotMap;
