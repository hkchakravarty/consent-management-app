import { Consent } from "./index";

export interface GetConsentsResponse {
  consents: Consent[];
  totalPages: number;
}

export type AddConsentResponse = Consent;

export interface ApiError {
  message: string;
}
