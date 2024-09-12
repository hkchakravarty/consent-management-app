import React from "react";
import {
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Consent } from "../types";
import { StyledTable } from "../styles/consent-management-styles";
import { useTranslation } from "react-i18next";

interface ConsentTableProps {
  consents: Consent[];
}

const ConsentTable: React.FC<ConsentTableProps> = ({ consents }) => {
  const { t } = useTranslation();

  return (
    <TableContainer>
      <StyledTable>
        <TableHead>
          <TableRow>
            <TableCell>{t("consentManagement.tableHeaders.name")}</TableCell>
            <TableCell>{t("consentManagement.tableHeaders.email")}</TableCell>
            <TableCell>
              {t("consentManagement.tableHeaders.consents")}
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {consents.map((consent) => (
            <TableRow key={consent.id}>
              <TableCell>{consent.name}</TableCell>
              <TableCell>{consent.email}</TableCell>
              <TableCell>
                {consent.consents.map((c) => t(`consentForm.${c}`)).join(", ")}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </StyledTable>
    </TableContainer>
  );
};

export default React.memo(ConsentTable);
