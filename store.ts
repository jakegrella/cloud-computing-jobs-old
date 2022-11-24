import create from "zustand";
import { IJob, IMapMarker } from "./utils";

interface IState {
  isMenuVisible: boolean;
  setIsMenuVisible: (isVisible: boolean) => void;
  jobs: IJob[];
  setJobs: (jobs: IJob[]) => void;
  map: any;
  setMap: (map: any) => void;
  mapBounds: any;
  setMapBounds: (mapBounds: any) => void;
  mapMarkers: IMapMarker[];
  setMapMarkers: (mapMarkers: IMapMarker[]) => void;
}

export const useStore = create<IState>((set) => ({
  isMenuVisible: false,
  setIsMenuVisible: (isMenuVisible) => set(() => ({ isMenuVisible })),
  jobs: [],
  setJobs: (jobs) => set(() => ({ jobs })),
  map: {
    center: { lat: 34.0, lng: -118.24235 }, // los angeles
    zoom: 12,
  },
  setMap: (map) => set(() => ({ map })),
  mapBounds: undefined,
  setMapBounds: (mapBounds) => set(() => ({ mapBounds })),
  mapMarkers: [],
  setMapMarkers: (mapMarkers) => set(() => ({ mapMarkers })),
}));
