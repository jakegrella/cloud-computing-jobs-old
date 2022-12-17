export interface ICompany {
  id: number;
  name: string;
  username: string;
  logo: string;
  mission: string;
  overview: string;
  jobs?: IJob[];
  locations?: ILocation[];
}

export type JobType = "Full Time" | "Part Time" | "Internship" | "Contract";
export type JobExperience = "Entry" | "Mid" | "Senior" | "";
export type JobPayRangeTimeFrame = "Year" | "Hour" | undefined;

export interface IJob {
  id: number;
  title: string;
  posting: string;
  description: string;
  responsibilities: string;
  qualifications: string;
  type: JobType;
  experience: JobExperience;
  open?: boolean; // db default = true
  published?: boolean; // db default = false
  datePublished?: Date;
  payRangeMin?: number;
  payRangeMax?: number;
  payRangeTimeFrame?: JobPayRangeTimeFrame;
  equityRangeMax?: number;
  equityRangeMin?: number;
  company?: ICompany;
  companyId?: number; // used by prisma for relation
  locations?: ILocation[];
}

export interface ILocation {
  id: number;
  headquarters: boolean;
  country: string;
  administrativeArea: string;
  locality: string;
  latitude: number;
  longitude: number;
  companyId: number;
  company?: ICompany;
  jobs?: IJob[];
  postalCode?: string;
  thoroughfare?: string;
  premise?: string;
  neighborhood?: string;
}

export interface IMapMarker {
  center: { lat: number; lng: number };
  job: IJob;
  id: string;
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

  previewJob: IJob;
  setPreviewJob: (previewJob: IJob) => void;
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
