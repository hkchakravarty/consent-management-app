import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { Container } from "@mui/material";

import ConsentForm from "./components/ConsentForm";
import ConsentManagement from "./components/ConsentManagement";

const App: React.FC = () => {
  return (
    <Router>
      <Container>
        <Routes>
          <Route path="/give-consent" element={<ConsentForm />} />
          <Route path="/collected-consents" element={<ConsentManagement />} />
          <Route path="/" element={<ConsentForm />} />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;
