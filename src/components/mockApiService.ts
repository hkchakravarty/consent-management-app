import { Consent } from "./types";

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
  getConsents: async (page: number, itemsPerPage: number) => {
    await delay(500); // Simulate network delay
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedConsents = consents.slice(startIndex, endIndex);
    return {
      consents: paginatedConsents,
      totalPages: Math.ceil(consents.length / itemsPerPage),
    };
  },

  addConsent: async (newConsent: Omit<Consent, "id">) => {
    await delay(500); // Simulate network delay
    const id = consents.length + 1;
    const consentWithId = { ...newConsent, id };
    consents.push(consentWithId);
    return consentWithId;
  },
};
