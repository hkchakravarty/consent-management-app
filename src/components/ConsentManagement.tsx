import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Box,
} from "@mui/material";
import styled from "styled-components";

import { mockApiService } from "./mockApiService";
import { Consent } from "./types";

const PageContainer = styled(Box)`
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

const StyledPaper = styled(Paper)`
  margin-top: 20px;
`;

const TableHeader = styled(TableCell)`
  font-weight: bold;
`;

const PaginationContainer = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
`;

const PageNumbers = styled(Box)`
  display: flex;
  gap: 10px;
`;

const PageButton = styled(Button)`
  min-width: 30px;
  padding: 5px;
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

const ConsentManagement: React.FC = () => {
  const [consents, setConsents] = useState<Consent[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 2;
  const navigate = useNavigate();

  useEffect(() => {
    fetchConsents();
  }, [currentPage]);

  const fetchConsents = async () => {
    try {
      const result = await mockApiService.getConsents(
        currentPage,
        itemsPerPage
      );
      setConsents(result.consents);
      setTotalPages(result.totalPages);
    } catch (error) {
      console.error("Error fetching consents:", error);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <PageContainer>
      <SidePanel>
        <Tab onClick={() => navigate("/give-consent")}>Give consent</Tab>
        <Tab className="active">Collected consents</Tab>
      </SidePanel>
      <MainContent>
        <StyledPaper>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableHeader>Name</TableHeader>
                  <TableHeader>Email</TableHeader>
                  <TableHeader>Consent given for</TableHeader>
                </TableRow>
              </TableHead>
              <TableBody>
                {consents.map((consent) => (
                  <TableRow key={consent.id}>
                    <TableCell>{consent.name}</TableCell>
                    <TableCell>{consent.email}</TableCell>
                    <TableCell>{consent.consents.join(", ")}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </StyledPaper>
        <PaginationContainer>
          <Button
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            Previous page
          </Button>
          <PageNumbers>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <PageButton
                key={page}
                variant={currentPage === page ? "contained" : "outlined"}
                onClick={() => handlePageChange(page)}
              >
                {page}
              </PageButton>
            ))}
          </PageNumbers>
          <Button
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            Next page
          </Button>
        </PaginationContainer>
      </MainContent>
    </PageContainer>
  );
};

export default ConsentManagement;
