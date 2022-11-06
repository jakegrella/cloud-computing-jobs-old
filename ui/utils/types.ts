export interface ICompany {
  id: number;
  name: string;
  username: string;
  logo: string;
  mission: string;
  overview: string;
  headquarters: ILocation;
  locations: ILocation[];
  jobs: IJob[];
}

export interface IJob {
  id: number;
  title: string;
  company: ICompany;
  companyId: number;
  datePublished?: Date;
  description: string;
  open: boolean;
  posting: string;
  published: boolean;
  qualifications: string;
  responsibilities: string;
  type: "Full Time" | "Part Time" | "Internship" | "Contract";
  experience: "Entry" | "Mid" | "Senior";
  payRangeMin: number;
  payRangeMax: number;
  payRangeTimeFrame: "Year" | "Hour";
  equityRangeMax: number;
  equityRangeMin: number;
  locations: ILocation[];
}

export interface ILocation {
  id: number;
  city: string;
  country: string;
  state: string;
  jobs: IJob[];
  companies: ICompany[];
  headquarters: ICompany[];
}
