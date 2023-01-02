import { Prisma } from "@prisma/client";

export interface IState {
  initHomeMap: IInitMap;
  setInitHomeMap: (initMap: IInitMap) => void;
  homeMapLocations: ILocation[];
  setHomeMapLocations: (homeMapLocations: ILocation[]) => void;
  homeMapLocationsWithJobs: ILocation[];
  setHomeMapLocationsWithJobs: (homeMapLocationsWithJobs: ILocation[]) => void;
  homeMapLocationsWithoutJobs: ILocation[];
  setHomeMapLocationsWithoutJobs: (
    homeMapLocationsWithoutJobs: ILocation[]
  ) => void;
  stripeState: IStripeState;
  setStripeState: (stripe: IStripeState) => void;
  previewJob: IJob;
  setPreviewJob: (previewJob: IJob) => void;
  isMenuVisible: boolean;
  setIsMenuVisible: (isVisible: boolean) => void;
  jobs: IJob[];
  setJobs: (jobs: IJob[]) => void;
  map: any;
  setMap: (map: any) => void;
  mapBounds: any;
  setMapBounds: (mapBounds: any) => void;
  homePageView: "map" | "list" | "both";
  setHomePageView: (homePageView: "map" | "list" | "both") => void;
  showPaymentForm: boolean;
  setShowPaymentForm: (showPaymentForm: boolean) => void;
  companyLocationOptions: any[];
  setCompanyLocationOptions: (companyLocationOptions) => void;
}

export interface ICompany {
  id: number;
  name: string;
  username: string;
  logo: string;
  mission: string;
  overview: string;
  twitter?: string;
  jobs?: IJob[];
  locations?: ILocation[];
}

export type JobType =
  | "Full Time"
  | "Part Time"
  | "Internship"
  | "Contract"
  | string;
export type JobExperience = "Entry" | "Mid" | "Senior" | "" | string;
export type JobPayRangeTimeFrame = "Year" | "Hour" | undefined | string;

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
  payRangeMin?: Prisma.Decimal;
  payRangeMax?: Prisma.Decimal;
  payRangeTimeFrame?: JobPayRangeTimeFrame;
  equityRangeMax?: Prisma.Decimal;
  equityRangeMin?: Prisma.Decimal;
  company?: ICompany;
  companyId?: number; // used by prisma for relation
  locations?: ILocation[];
}

export interface ILocation {
  id: number;
  headquarters: boolean;
  country: string;
  administrativeArea: string; // state, province, region (ISO code where available)
  locality: string; // city, town
  latitude: number;
  longitude: number;
  postalCode?: string;
  thoroughfare?: string; // street address
  premise?: string; // apartment, suite, po box, etc
  neighborhood?: string;
  companyId: number;
  company?: ICompany;
  jobs?: IJob[];
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

export interface IMapBounds {
  latMin: string;
  latMax: string;
  lngMin: string;
  lngMax: string;
}
