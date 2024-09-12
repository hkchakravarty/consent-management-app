import React from "react";
import { Button } from "@mui/material";
import {
  PaginationContainer,
  PageNumbers,
  PageButton,
} from "../styles/consent-management-styles";
import { useTranslation } from "react-i18next";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const { t } = useTranslation();

  const getPageNumbers = () => {
    const pageNumbers = [];
    const totalPageNumbers = 5;
    const leftOffset = Math.floor(totalPageNumbers / 2);

    if (totalPages <= totalPageNumbers) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    if (currentPage <= leftOffset) {
      for (let i = 1; i <= totalPageNumbers - 1; i++) {
        pageNumbers.push(i);
      }
      pageNumbers.push("...");
      pageNumbers.push(totalPages);
    } else if (currentPage > totalPages - leftOffset) {
      pageNumbers.push(1);
      pageNumbers.push("...");
      for (let i = totalPages - totalPageNumbers + 2; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      pageNumbers.push(1);
      pageNumbers.push("...");
      for (let i = currentPage - 1; i <= currentPage + 1; i++) {
        pageNumbers.push(i);
      }
      pageNumbers.push("...");
      pageNumbers.push(totalPages);
    }

    return pageNumbers;
  };

  return (
    <PaginationContainer role="navigation" aria-label="Pagination">
      <Button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        aria-label={t("pagination.previous")}
      >
        &lt;&lt; {t("pagination.previous")}
      </Button>
      <PageNumbers>
        {getPageNumbers().map((page, index) => (
          <PageButton
            key={index}
            $active={currentPage === page}
            onClick={() => typeof page === "number" && onPageChange(page)}
            disabled={typeof page !== "number"}
            aria-label={
              typeof page === "number"
                ? t("pagination.page", { page })
                : t("pagination.morePage")
            }
            aria-current={currentPage === page ? "page" : undefined}
          >
            {page}
          </PageButton>
        ))}
      </PageNumbers>
      <Button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        aria-label={t("pagination.next")}
      >
        {t("pagination.next")} &gt;&gt;
      </Button>
    </PaginationContainer>
  );
};

export default React.memo(Pagination);
