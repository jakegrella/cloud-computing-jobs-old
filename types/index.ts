import { Prisma } from "@prisma/client";
import mapboxgl from "mapbox-gl";

export interface IState {
  homeMap: IInitMap;
  setHomeMap: (initMap: IInitMap) => void;
  homeMapLocations: ILocation[];
  setHomeMapLocations: (homeMapLocations: ILocation[]) => void;
  map: any;
  setMap: (map: any) => void;
  mapBounds: mapboxgl.LngLatBounds;
  setMapBounds: (mapBounds: mapboxgl.LngLatBounds) => void;
  homePageView: "map" | "list" | "both";
  setHomePageView: (homePageView: "map" | "list" | "both") => void;
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
  workplaceType: "in-office" | "hybrid" | "remote" | string;
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

export interface IMapBounds {
  latMin: string;
  latMax: string;
  lngMin: string;
  lngMax: string;
}
