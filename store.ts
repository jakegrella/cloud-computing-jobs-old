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
  previewJob: {
    id: 0,
    title: "",
    posting: "",
    type: "Full Time",
    experience: "Entry",
    description: "",
    qualifications: "",
    responsibilities: "",
    payRangeMin: undefined,
    payRangeMax: undefined,
    payRangeTimeFrame: "Hour",
    equityRangeMin: undefined,
    equityRangeMax: undefined,
    company: {
      id: 0,
      name: "",
      username: "",
      logo: "",
      mission: "",
      overview: "",
    },
    locations: [],
  },
  setPreviewJob: (previewJob) => set(() => ({ previewJob })),
  isMenuVisible: false,
  setIsMenuVisible: (isMenuVisible) => set(() => ({ isMenuVisible })),
  jobs: [],
  setJobs: (jobs) => set(() => ({ jobs })),
  map: undefined,
  setMap: (map) => set(() => ({ map })),
  mapBounds: undefined,
  setMapBounds: (mapBounds) => set(() => ({ mapBounds })),
  homePageView: "both",
  setHomePageView: (homePageView) => set(() => ({ homePageView })),
  stripeState: {
    clientSecret: "",
    message: null,
    isLoading: false,
  },
  setStripeState: (stripeState) => set(() => ({ stripeState })),
  showPaymentForm: false,
  setShowPaymentForm: (showPaymentForm) => set(() => ({ showPaymentForm })),
  companyLocationOptions: [],
  setCompanyLocationOptions: (companyLocationOptions) =>
    set(() => ({ companyLocationOptions })),
}));
