import styled from "styled-components";
import { Box, Button, Paper } from "@mui/material";

export const PageContainer = styled(Box)`
  display: flex;
  max-width: 800px;
  margin: 20px auto;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.1);
`;

export const SidePanel = styled(Box)`
  width: 200px;
  border-right: 1px solid #ccc;
`;

export const MainContent = styled(Box)`
  flex: 1;
  padding: 20px;
`;

export const Tab = styled(Button)<{ $active?: boolean }>`
  width: 100%;
  padding: 10px;
  font-size: 16px;
  text-transform: none;
  justify-content: flex-start;
  background-color: ${(props) => (props.$active ? "#f0f0f0" : "transparent")};
  &:hover {
    background-color: #e0e0e0;
  }
`;

export const StyledPaper = styled(Paper)`
  margin-top: 20px;
`;
