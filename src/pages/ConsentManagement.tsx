import React, { useState } from "react";
import {
  PageContainer,
  MainContent,
  StyledPaper,
} from "../styles/shared-styles";
import TabNavigation from "../components/TabNavigation";
import Pagination from "../components/Pagination";
import ConsentTable from "../components/ConsentTable";
import ErrorMessage from "../components/ErrorMessage";
import { CircularProgress } from "@mui/material";
import { useConsentData } from "../hooks/useConsentData";
import { useTranslation } from "react-i18next";

/**
 * ConsentManagement component for displaying and managing collected consents.
 *
 * This component fetches and displays a paginated list of consents, handling
 * loading, error, and success states. It uses the useConsentData hook for
 * data fetching and state management.
 *
 * @component
 * @example
 * return (
 *   <ConsentManagement />
 * )
 */
const ConsentManagement: React.FC = () => {
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2;
  const { consents, totalPages, status, error } = useConsentData(
    currentPage,
    itemsPerPage
  );

  /**
   * Handles page change in pagination.
   *
   * @param {number} page - The new page number
   */
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  /**
   * Renders the appropriate content based on the current status.
   *
   * @returns {React.ReactNode} The rendered content
   */
  const renderContent = () => {
    switch (status) {
      case "loading":
        return <CircularProgress aria-label={t("loading")} />;
      case "failed":
        return <ErrorMessage message={error || t("unknownError")} />;
      case "succeeded":
        return (
          <>
            <StyledPaper>
              <ConsentTable consents={consents} />
            </StyledPaper>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <PageContainer>
      <TabNavigation activeTab="collected-consents" />
      <MainContent>
        <h1 id="consent-management-title" className="visually-hidden">
          {t("consentManagement.title")}
        </h1>
        <div aria-live="polite" aria-atomic="true">
          {renderContent()}
        </div>
      </MainContent>
    </PageContainer>
  );
};

export default ConsentManagement;
