import React, { useEffect, useRef } from "react";

interface Spot {
  name: string;
  lat: number;
  lng: number;
}

interface Props {
  start: Spot | null;
  spots: Spot[];
  preview?: Spot | null;
  polyline?: { lat: number; lng: number }[];
}

const SpotMap: React.FC<Props> = ({ start, spots, preview, polyline }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<kakao.maps.Map | null>(null);
  const markersRef = useRef<kakao.maps.Marker[]>([]);
  const polylineRef = useRef<kakao.maps.Polyline | null>(null);

  useEffect(() => {
    if (!window.kakao || !window.kakao.maps || !mapRef.current) return;

    const defaultCenter = new window.kakao.maps.LatLng(37.5665, 126.9780);
    const map = new window.kakao.maps.Map(mapRef.current, {
      center: defaultCenter,
      level: 6,
    });

    mapInstance.current = map;

    setTimeout(() => {
      window.kakao.maps.event.trigger(map, "resize");
    }, 300);
  }, []);

  useEffect(() => {
    const map = mapInstance.current;
    if (!map) return;

    markersRef.current.forEach((marker) => marker.setMap(null));
    markersRef.current = [];

    const bounds = new window.kakao.maps.LatLngBounds();

    // 출발지 마커 + hover 라벨
    if (start) {
      const startLatLng = new window.kakao.maps.LatLng(start.lat, start.lng);
      const startMarker = new window.kakao.maps.Marker({
        map,
        position: startLatLng,
        title: `출발지: ${start.name}`,
        image: new window.kakao.maps.MarkerImage(
          "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png",
          new window.kakao.maps.Size(24, 35)
        ),
      });
      markersRef.current.push(startMarker);
      bounds.extend(startLatLng);

      const startOverlay = new window.kakao.maps.CustomOverlay({
        map: null,
        position: startLatLng,
        content: `<div style="
          background:white;
          padding:4px 10px;
          border-radius:8px;
          font-size:13px;
          font-weight:600;
          color:#333;
          box-shadow:0 2px 4px rgba(0, 0, 0, 0.15);
          white-space:nowrap;
          pointer-events:none;
          transform: translateY(-40px);">
          출발지: ${start.name}
        </div>`,
        yAnchor: 0,
      });

      window.kakao.maps.event.addListener(startMarker, "mouseover", () => {
        startOverlay.setMap(map);
      });

      window.kakao.maps.event.addListener(startMarker, "mouseout", () => {
        startOverlay.setMap(null);
      });
    }

    // 여행지 마커 + hover 라벨
    spots.forEach((spot, idx) => {
      const position = new window.kakao.maps.LatLng(spot.lat, spot.lng);

      const marker = new window.kakao.maps.Marker({
        map,
        position,
        title: `여행지 ${idx + 1}: ${spot.name}`,
      });

      markersRef.current.push(marker);
      bounds.extend(position);

      const overlay = new window.kakao.maps.CustomOverlay({
        map: null,
        position,
        content: `<div style="
          background:white;
          padding:4px 10px;
          border-radius:8px;
          font-size:13px;
          font-weight:600;
          color:#333;
          box-shadow:0 2px 4px rgba(0, 0, 0, 0.15);
          white-space:nowrap;
          pointer-events:none;
          transform: translateY(-40px);">
          ${idx + 1}. ${spot.name}
        </div>`,
        yAnchor: 0,
      });

      window.kakao.maps.event.addListener(marker, "mouseover", () => {
        overlay.setMap(map);
      });
      window.kakao.maps.event.addListener(marker, "mouseout", () => {
        overlay.setMap(null);
      });
    });

    // 미리보기 마커 + hover 라벨
    if (preview) {
      const latlng = new window.kakao.maps.LatLng(preview.lat, preview.lng);
      const previewMarker = new window.kakao.maps.Marker({
        map,
        position: latlng,
        title: `선택 중: ${preview.name}`,
        opacity: 0.6,
      });
      markersRef.current.push(previewMarker);
      bounds.extend(latlng);

      const previewOverlay = new window.kakao.maps.CustomOverlay({
        map: null,
        position: latlng,
        content: `<div style="
          background:white;
          padding:4px 10px;
          border-radius:8px;
          font-size:13px;
          font-weight:600;
          color:#333;
          box-shadow:0 2px 4px rgba(0, 0, 0, 0.15);
          white-space:nowrap;
          pointer-events:none;
          transform: translateY(-40px);">
          선택 중: ${preview.name}
        </div>`,
        yAnchor: 0,
      });

      window.kakao.maps.event.addListener(previewMarker, "mouseover", () => {
        previewOverlay.setMap(map);
      });
      window.kakao.maps.event.addListener(previewMarker, "mouseout", () => {
        previewOverlay.setMap(null);
      });
    }

    if (!bounds.isEmpty()) {
      map.setBounds(bounds);
    }

    setTimeout(() => {
      window.kakao.maps.event.trigger(map, "resize");
    }, 300);
  }, [start, spots, preview]);

  useEffect(() => {
    const map = mapInstance.current;
    if (!map || !polyline || polyline.length === 0) return;

    if (polylineRef.current) {
      polylineRef.current.setMap(null);
    }

    const path = polyline.map(
      (p) => new window.kakao.maps.LatLng(p.lat, p.lng)
    );

    const newLine = new window.kakao.maps.Polyline({
      path,
      strokeWeight: 5,
      strokeColor: "#007BFF",
      strokeOpacity: 0.8,
      strokeStyle: "solid",
    });

    newLine.setMap(map);
    polylineRef.current = newLine;

    const bounds = new window.kakao.maps.LatLngBounds();
    path.forEach((latlng) => bounds.extend(latlng));
    map.setBounds(bounds);
  }, [polyline]);

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
