import React from "react";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { addConsent } from "../store/consentSlice";
import { PageContainer, MainContent } from "../styles/shared-styles";
import {
  FormField,
  ConsentOptions,
  ConsentLabel,
  SubmitButton,
  ErrorText,
} from "../styles/consent-form-styles";
import TabNavigation from "../components/TabNavigation";
import ConsentCheckbox from "../components/ConsentCheckbox";
import useForm from "../hooks/useForm";

const initialFormState = {
  name: "",
  email: "",
  consents: {
    newsletter: false,
    targetedAds: false,
    statistics: false,
  },
};

/**
 * ConsentForm component for collecting user consent.
 *
 * This component renders a form that allows users to provide their name,
 * email, and consent preferences. It uses the useForm hook for form state
 * management and validation.
 *
 * @component
 * @example
 * return (
 *   <ConsentForm />
 * )
 */
const ConsentForm: React.FC = () => {
  const {
    formData,
    errors,
    handleInputChange,
    handleConsentChange,
    validateForm,
  } = useForm(initialFormState);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  /**
   * Handles form submission.
   *
   * Validates the form, and if valid, dispatches the addConsent action
   * and navigates to the collected consents page.
   *
   * @param {React.FormEvent} e - The form submission event
   */

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      const consentArray = Object.entries(formData.consents)
        .filter(([, value]) => value)
        .map(([key]) => key);

      try {
        await dispatch(
          addConsent({
            name: formData.name,
            email: formData.email,
            consents: consentArray,
          })
        ).unwrap();
        navigate("/collected-consents");
      } catch (error) {
        console.error("Error submitting consent:", error);
      }
    }
  };

  return (
    <PageContainer>
      <TabNavigation activeTab="give-consent" />
      <MainContent>
        <form onSubmit={handleSubmit} aria-labelledby="consent-form-title">
          <h1 id="consent-form-title" className="visually-hidden">
            Give Consent Form
          </h1>
          <Box display="flex" gap={2}>
            <FormField
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              fullWidth
              variant="outlined"
              error={!!errors.name}
              helperText={errors.name}
              aria-required="true"
              aria-invalid={!!errors.name}
            />
            <FormField
              label="Email address"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              fullWidth
              variant="outlined"
              error={!!errors.email}
              helperText={errors.email}
              aria-required="true"
              aria-invalid={!!errors.email}
            />
          </Box>
          <ConsentLabel id="consent-options-label">I agree to:</ConsentLabel>
          <ConsentOptions role="group" aria-labelledby="consent-options-label">
            <ConsentCheckbox
              label="Receive newsletter"
              checked={formData.consents.newsletter}
              onChange={(checked) => handleConsentChange("newsletter", checked)}
              id="newsletter-consent"
            />
            <ConsentCheckbox
              label="Be shown targeted ads"
              checked={formData.consents.targetedAds}
              onChange={(checked) =>
                handleConsentChange("targetedAds", checked)
              }
              id="targeted-ads-consent"
            />
            <ConsentCheckbox
              label="Contribute to anonymous visit statistics"
              checked={formData.consents.statistics}
              onChange={(checked) => handleConsentChange("statistics", checked)}
              id="statistics-consent"
            />
            {errors.consents && (
              <ErrorText id="consent-error" role="alert">
                {errors.consents}
              </ErrorText>
            )}
          </ConsentOptions>
          <Box display="flex" justifyContent="center">
            <SubmitButton type="submit">Give consent</SubmitButton>
          </Box>
        </form>
      </MainContent>
    </PageContainer>
  );
};

export default ConsentForm;
