import { Consent } from "../types";
import { GetConsentsResponse, AddConsentResponse } from "../types/api";
import config from "../config";

const consents: Consent[] = [
  {
    id: 1,
    name: "Bojack Horseman",
    email: "bojack@horseman.com",
    consents: ["newsletter", "ads"],
  },
  {
    id: 2,
    name: "Princess Carolyn",
    email: "princess@manager.com",
    consents: ["newsletter"],
  },
  {
    id: 3,
    name: "Mr. Peanutbutter",
    email: "peanutbutter@dog.com",
    consents: ["ads", "statistics"],
  },
  {
    id: 4,
    name: "Todd Chavez",
    email: "todd@chavez.com",
    consents: ["newsletter", "statistics"],
  },
];

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const mockApiService = {
  getConsents: async (
    page: number,
    itemsPerPage: number
  ): Promise<GetConsentsResponse> => {
    await delay(500);
    // Simulate API call using config.API_URL
    console.log(`Fetching consents from ${config.API_URL}/consents`);
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedConsents = consents.slice(startIndex, endIndex);
    return {
      consents: paginatedConsents,
      totalPages: Math.ceil(consents.length / itemsPerPage),
    };
  },

  addConsent: async (
    newConsent: Omit<Consent, "id">
  ): Promise<AddConsentResponse> => {
    await delay(500);
    // Simulate API call using config.API_URL
    console.log(`Adding consent to ${config.API_URL}/consents`);
    const id = consents.length + 1;
    const consentWithId: Consent = { ...newConsent, id };
    consents.push(consentWithId);
    return consentWithId;
  },
};
