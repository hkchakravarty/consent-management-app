import styled from "styled-components";
import {
  Box,
  Button,
  TextField,
  Typography,
  FormHelperText,
} from "@mui/material";

export const ConsentFormWrapper = styled(Box)`
  display: flex;
  max-width: 800px;
  margin: 20px auto;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.1);
`;

export const FormField = styled(TextField)`
  margin-bottom: 20px;
`;

export const ConsentOptions = styled(Box)`
  border: 1px solid #ccc;
  padding: 10px;
  margin-bottom: 20px;
`;

export const ConsentLabel = styled(Typography)`
  margin-bottom: 10px;
  text-align: center;
`;

export const SubmitButton = styled(Button)`
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

export const CheckboxContainer = styled(Box)`
  display: flex;
  flex-direction: column;
`;

export const ErrorText = styled(FormHelperText)`
  color: #f44336;
  margin-bottom: 10px;
`;
