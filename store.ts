import create from "zustand";
import { IJob, IMap, IMapMarker } from "./utils";

interface IState {
  isMenuVisible: boolean;
  setIsMenuVisible: (isVisible: boolean) => void;
  jobs: IJob[];
  setJobs: (jobs: IJob[]) => void;
  map: IMap;
  setMap: (map: IMap) => void;
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

  mapMarkers: [],
  setMapMarkers: (mapMarkers) => set(() => ({ mapMarkers })),
}));
