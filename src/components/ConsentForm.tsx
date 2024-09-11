import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
  Typography,
  Paper,
  Box,
} from "@mui/material";
import styled from "styled-components";

import { mockApiService } from "./mockApiService";

const ConsentFormWrapper = styled(Paper)`
  display: flex;
  max-width: 800px;
  margin: 20px auto;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.1);
`;

const SidePanel = styled(Box)`
  width: 200px;
  border-right: 1px solid #ccc;
`;

const MainContent = styled(Box)`
  flex: 1;
  padding: 20px;
`;

const FormField = styled(TextField)`
  margin-bottom: 20px;
`;

const ConsentOptions = styled(Box)`
  border: 1px solid #ccc;
  padding: 10px;
  margin-bottom: 20px;
`;

const ConsentLabel = styled(Typography)`
  margin-bottom: 10px;
  text-align: center;
`;

const SubmitButton = styled(Button)`
  && {
    min-width: 120px;
    height: 36px;
    font-size: 14px;
    text-transform: none;
    background-color: #2196f3;
    color: white;
    padding: 6px 16px;
    border-radius: 4px;
    &:hover {
      background-color: #1976d2;
    }
    &.Mui-disabled {
      background-color: #2196f3;
      opacity: 0.7;
      color: white;
    }
  }
`;

const Tab = styled(Button)`
  width: 100%;
  padding: 10px;
  font-size: 16px;
  text-transform: none;
  border-radius: 0;
  justify-content: flex-start;
  &.active {
    background-color: #f0f0f0;
  }
`;

const CheckboxContainer = styled(Box)`
  display: flex;
  flex-direction: column;
`;

const ConsentForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [consents, setConsents] = useState({
    newsletter: false,
    targetedAds: false,
    statistics: false,
  });
  const navigate = useNavigate();

  const isFormValid = () => {
    return (
      name.trim() !== "" &&
      email.trim() !== "" &&
      (consents.newsletter || consents.targetedAds || consents.statistics)
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormValid()) {
      const consentArray = Object.entries(consents)
        .filter(([_, value]) => value)
        .map(([key]) => key);

      try {
        await mockApiService.addConsent({
          name,
          email,
          consents: consentArray,
        });
        navigate("/collected-consents");
      } catch (error) {
        console.error("Error submitting consent:", error);
      }
    }
  };

  return (
    <ConsentFormWrapper elevation={1}>
      <SidePanel>
        <Tab className="active">Give consent</Tab>
        <Tab onClick={() => navigate("/collected-consents")}>
          Collected consents
        </Tab>
      </SidePanel>
      <MainContent>
        <form onSubmit={handleSubmit}>
          <Box display="flex" gap={2}>
            <FormField
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              fullWidth
              variant="outlined"
            />
            <FormField
              label="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              variant="outlined"
            />
          </Box>
          <ConsentLabel>I agree to:</ConsentLabel>
          <ConsentOptions>
            <CheckboxContainer>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={consents.newsletter}
                    onChange={(e) =>
                      setConsents({ ...consents, newsletter: e.target.checked })
                    }
                  />
                }
                label="Receive newsletter"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={consents.targetedAds}
                    onChange={(e) =>
                      setConsents({
                        ...consents,
                        targetedAds: e.target.checked,
                      })
                    }
                  />
                }
                label="Be shown targeted ads"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={consents.statistics}
                    onChange={(e) =>
                      setConsents({ ...consents, statistics: e.target.checked })
                    }
                  />
                }
                label="Contribute to anonymous visit statistics"
              />
            </CheckboxContainer>
          </ConsentOptions>
          <Box display="flex" justifyContent="center">
            <SubmitButton type="submit" disabled={!isFormValid()}>
              Give consent
            </SubmitButton>
          </Box>
        </form>
      </MainContent>
    </ConsentFormWrapper>
  );
};

export default ConsentForm;
