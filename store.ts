import { create } from "zustand";
import { IState } from "./types";

export const useStore = create<IState>((set) => ({
  homeMap: {
    center: { lat: 34.0, lng: -118.24235 }, // los angeles
    zoom: 12,
  },
  setHomeMap: (homeMap) => set(() => ({ homeMap })),
  homeMapLocations: [],
  setHomeMapLocations: (homeMapLocations) => set(() => ({ homeMapLocations })),
  map: undefined,
  setMap: (map) => set(() => ({ map })),
  mapBounds: undefined,
  setMapBounds: (mapBounds) => set(() => ({ mapBounds })),
  homePageView: "both",
  setHomePageView: (homePageView) => set(() => ({ homePageView })),
}));
