import React from "react";
import { Alert, AlertTitle } from "@mui/material";
import { useTranslation } from "react-i18next";

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  const { t } = useTranslation();

  return (
    <Alert severity="error">
      <AlertTitle>{t("errors.title")}</AlertTitle>
      {message}
    </Alert>
  );
};

export default ErrorMessage;
