import styled from "styled-components";
import { Box, Button, Table } from "@mui/material";

export const PaginationContainer = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
`;

export const PageNumbers = styled(Box)`
  display: flex;
  align-items: center;
  gap: 0;
`;

export const PageButton = styled(Button)<{ $active?: boolean }>`
  min-width: 24px;
  height: 24px;
  padding: 0;
  margin: 0 -1px;
  font-size: 14px;
  line-height: 1;
  color: ${(props) => (props.$active ? "white" : "#1976d2")};
  background-color: ${(props) => (props.$active ? "#1976d2" : "transparent")};
  border: 1px solid #1976d2;
  border-radius: 0;
  &:hover {
    background-color: ${(props) => (props.$active ? "#1565c0" : "#e3f2fd")};
  }
`;

export const StyledTable = styled(Table)`
  border-collapse: collapse;
  & th,
  & td {
    padding: 8px 16px;
    border: 2px solid #000;
  }
  & th {
    font-weight: bold;
    background-color: #f5f5f5;
  }
`;
