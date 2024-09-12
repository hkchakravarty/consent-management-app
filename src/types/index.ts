// src/types/index.ts

export interface Consent {
  id: number;
  name: string;
  email: string;
  consents: string[];
}

export interface ConsentFormData {
  name: string;
  email: string;
  consents: {
    newsletter: boolean;
    targetedAds: boolean;
    statistics: boolean;
  };
}

export interface ConsentFormErrors {
  name: string;
  email: string;
  consents: string;
}
