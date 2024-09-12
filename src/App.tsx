import React, { Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {
  Container,
  CircularProgress,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import { Provider } from "react-redux";
import { store } from "./store";
import { useTranslation } from "react-i18next";
import "./i18n"; // Import the i18n configuration

const ConsentForm = React.lazy(() => import("./pages/ConsentForm"));
const ConsentManagement = React.lazy(() => import("./pages/ConsentManagement"));

const App: React.FC = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (event: SelectChangeEvent<string>) => {
    i18n.changeLanguage(event.target.value);
  };

  return (
    <Provider store={store}>
      <Router>
        <Container>
          <Select
            value={i18n.language}
            onChange={changeLanguage}
            style={{ position: "absolute", top: "10px", right: "10px" }}
          >
            <MenuItem value="en">English</MenuItem>
            <MenuItem value="es">Español</MenuItem>
          </Select>
          <Suspense fallback={<CircularProgress />}>
            <Routes>
              <Route path="/give-consent" element={<ConsentForm />} />
              <Route
                path="/collected-consents"
                element={<ConsentManagement />}
              />
              <Route path="/" element={<ConsentForm />} />
            </Routes>
          </Suspense>
        </Container>
      </Router>
    </Provider>
  );
};

export default App;
