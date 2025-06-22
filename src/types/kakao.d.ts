declare global {
  interface Window {
    kakao: any;
  }

  namespace kakao {
    namespace maps {
      class Map {
        constructor(container: HTMLElement, options: any);
        setCenter(latlng: LatLng): void;
        setBounds(bounds: LatLngBounds, padding?: number): void; // ✅ 추가
      }

      class LatLng {
        constructor(lat: number, lng: number);
      }

      class LatLngBounds {
        extend(latlng: LatLng): void;
      }

      class Polyline {
        constructor(options: any);
        setMap(map: Map | null): void;
      }

      class Marker {
        constructor(options: any);
        setMap(map: Map | null): void;
      }

      class MarkerImage {
        constructor(src: string, size: Size, options?: any);
      }

      class Size {
        constructor(width: number, height: number);
      }

      namespace event {
        function trigger(target: any, type: string): void;
      }

      namespace services {
        class Places {
          keywordSearch(
            keyword: string,
            callback: (
              result: any[],
              status: string,
              pagination: any
            ) => void
          ): void;
        }

        enum Status {
          OK,
          ZERO_RESULT,
          ERROR,
        }
      }
    }
  }
}

export {};
