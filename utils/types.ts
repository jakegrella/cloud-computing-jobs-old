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
