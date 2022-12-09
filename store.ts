import create from "zustand";
import { IState } from "./utils";

export const useStore = create<IState>((set) => ({
  previewJob: {
    companyName: "",
    companyUsername: "",
    title: "",
    type: "Select Job Type",
    experience: "Select Experience Level",
    locations: [],
    companyMission: "",
    companyLogo: "",
    companyOverview: "",
    description: "",
    qualifications: "",
    responsibilities: "",
    posting: "",
    payRangeMin: undefined,
    payRangeMax: undefined,
    payRangeTimeFrame: "",
    equityRangeMin: undefined,
    equityRangeMax: undefined,
  },
  setPreviewJob: (previewJob) => set(() => ({ previewJob })),
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

  stripeState: {
    clientSecret: "",
    message: null,
    isLoading: false,
  },
  setStripeState: (stripeState) => set(() => ({ stripeState })),

  showPaymentForm: false,
  setShowPaymentForm: (showPaymentForm) => set(() => ({ showPaymentForm })),

  // location options from job posting form
  companyLocationOptions: [],
  setCompanyLocationOptions: (companyLocationOptions) =>
    set(() => ({ companyLocationOptions })),
}));
