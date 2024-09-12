/**
 * Custom hook for managing form state and validation.
 *
 * @param {ConsentFormData} initialState - The initial state of the form
 * @returns {Object} An object containing form state and management functions
 * @property {ConsentFormData} formData - The current form data
 * @property {ConsentFormErrors} errors - Any validation errors in the form
 * @property {function} handleInputChange - Function to handle input changes
 * @property {function} handleConsentChange - Function to handle consent checkbox changes
 * @property {function} validateForm - Function to validate the entire form
 */
import { useState, ChangeEvent } from "react";
import { ConsentFormData, ConsentFormErrors } from "../types";
import { validateConsentForm, isFormValid } from "../utils/validateConsentForm";

export const useForm = (initialState: ConsentFormData) => {
  const [formData, setFormData] = useState<ConsentFormData>(initialState);
  const [errors, setErrors] = useState<ConsentFormErrors>({
    name: "",
    email: "",
    consents: "",
  });

  /**
   * Handles changes to input fields.
   *
   * @param {React.ChangeEvent<HTMLInputElement>} e - The input change event
   */
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  /**
   * Handles changes to consent checkboxes.
   *
   * @param {string} consentName - The name of the consent being changed
   * @param {boolean} checked - The new checked state of the consent
   */
  const handleConsentChange = (consentName: string, checked: boolean) => {
    setFormData((prevData) => ({
      ...prevData,
      consents: {
        ...prevData.consents,
        [consentName]: checked,
      },
    }));
  };

  /**
   * Validates the entire form.
   *
   * @returns {boolean} True if the form is valid, false otherwise
   */

  const validateForm = () => {
    const formErrors = validateConsentForm(formData);
    setErrors(formErrors);
    return isFormValid(formErrors);
  };

  return {
    formData,
    errors,
    handleInputChange,
    handleConsentChange,
    validateForm,
  };
};

export default useForm;
