export interface ICompany {
  id: number;
  name: string;
  username: string;
  logo: string;
  mission: string;
  overview: string;
  jobs: IJob[];
  locations: ILocation[];
}

export interface IJob {
  id: number;
  title: string;
  posting: string;
  open: boolean;
  published: boolean;
  datePublished?: Date;
  company: ICompany;
  companyId: number;
  locations: ILocation[];
  description: string;
  responsibilities: string;
  qualifications: string;
  type: "Full Time" | "Part Time" | "Internship" | "Contract";
  experience: "Entry" | "Mid" | "Senior";
  payRangeMin: number;
  payRangeMax: number;
  payRangeTimeFrame: "Year" | "Hour";
  equityRangeMax: number;
  equityRangeMin: number;
}

export interface ILocation {
  id: number;
  company: ICompany;
  companyId: number;
  headquarters: boolean;
  jobs: IJob[];
  country: string;
  administrativeArea: string;
  locality: string;
  postalCode: number;
  thoroughfare: string;
  premise: string;
  latitude: number;
  longitude: number;
}

export interface IMapMarker {
  center: { lat: number; lng: number };
  job: IJob;
}

interface IInitMap {
  center: { lat: number; lng: number };
  zoom: number;
}

interface IStripeState {
  clientSecret: string;
  isLoading: boolean;
  message: string | null;
}

export interface IState {
  stripeState: IStripeState;
  setStripeState: (stripe: IStripeState) => void;

  previewJob: any;
  setPreviewJob: (previewJob: any) => void;
  isMenuVisible: boolean;
  setIsMenuVisible: (isVisible: boolean) => void;
  jobs: IJob[];
  setJobs: (jobs: IJob[]) => void;
  initMap: IInitMap;
  setInitMap: (initMap: IInitMap) => void;
  map: any;
  setMap: (map: any) => void;
  mapBounds: any;
  setMapBounds: (mapBounds: any) => void;
  mapMarkers: IMapMarker[];
  setMapMarkers: (mapMarkers: IMapMarker[]) => void;
  homePageView: "map" | "list" | "both";
  setHomePageView: (homePageView: "map" | "list" | "both") => void;

  showPaymentForm: boolean;
  setShowPaymentForm: (showPaymentForm: boolean) => void;

  // location options from job posting form
  companyLocationOptions: any[];
  setCompanyLocationOptions: (companyLocationOptions) => void;
}
