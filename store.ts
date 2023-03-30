import create from "zustand";
import { IState } from "./types";

export const useStore = create<IState>((set) => ({
  initHomeMap: {
    center: { lat: 34.0, lng: -118.24235 }, // los angeles
    zoom: 12,
  },
  setInitHomeMap: (initHomeMap) => set(() => ({ initHomeMap })),
  homeMapLocations: [],
  setHomeMapLocations: (homeMapLocations) => set(() => ({ homeMapLocations })),
  homeMapLocationsWithJobs: [],
  setHomeMapLocationsWithJobs: (homeMapLocationsWithJobs) =>
    set(() => ({ homeMapLocationsWithJobs })),
  homeMapLocationsWithoutJobs: [],
  setHomeMapLocationsWithoutJobs: (homeMapLocationsWithoutJobs) =>
    set(() => ({ homeMapLocationsWithoutJobs })),
  map: undefined,
  setMap: (map) => set(() => ({ map })),
  mapBounds: undefined,
  setMapBounds: (mapBounds) => set(() => ({ mapBounds })),
  homePageView: "both",
  setHomePageView: (homePageView) => set(() => ({ homePageView })),
}));
