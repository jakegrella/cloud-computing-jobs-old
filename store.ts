import create from "zustand";
import { IState } from "./utils";

export const useStore = create<IState>((set) => ({
  isMenuVisible: false,
  setIsMenuVisible: (isMenuVisible) => set(() => ({ isMenuVisible })),
  jobs: [],
  setJobs: (jobs) => set(() => ({ jobs })),
  initMap: {
    center: { lat: 34.0, lng: -118.24235 }, // los angeles
    zoom: 12,
  },
  setInitMap: (initMap) => set(() => ({ initMap })),
  map: undefined,
  setMap: (map) => set(() => ({ map })),
  mapBounds: undefined,
  setMapBounds: (mapBounds) => set(() => ({ mapBounds })),
  mapMarkers: [],
  setMapMarkers: (mapMarkers) => set(() => ({ mapMarkers })),
  homePageView: "map",
  setHomePageView: (homePageView) => set(() => ({ homePageView })),
}));
