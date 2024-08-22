export interface QueryData {
  limit: number;
  offset: number;
  length: number;
  prefix: string;
  lang: string;
  sort: string;
  countryCode?: string;
}
