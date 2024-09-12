import { ConsentFormData, ConsentFormErrors } from "../types";

export const validateConsentForm = (
  formData: ConsentFormData
): ConsentFormErrors => {
  const errors: ConsentFormErrors = {
    name: "",
    email: "",
    consents: "",
  };

  if (formData.name.trim() === "") {
    errors.name = "Name is required";
  }

  if (formData.email.trim() === "") {
    errors.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    errors.email = "Email is invalid";
  }

  if (!Object.values(formData.consents).some(Boolean)) {
    errors.consents = "At least one consent option must be selected";
  }

  return errors;
};

export const isFormValid = (errors: ConsentFormErrors): boolean => {
  return Object.values(errors).every((error) => error === "");
};
