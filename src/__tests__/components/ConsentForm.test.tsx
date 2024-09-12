import { render, screen, fireEvent } from "@testing-library/react";
import ConsentForm from "../../pages/ConsentForm";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import configureMockStore from "redux-mock-store";
import { I18nextProvider } from "react-i18next";
import i18n from "../../i18n";

import "@testing-library/jest-dom";

const mockStore = configureMockStore([]);

describe("ConsentForm", () => {
  it("renders form fields and submit button", () => {
    const store = mockStore({});
    render(
      <I18nextProvider i18n={i18n}>
        <Provider store={store}>
          <Router>
            <ConsentForm />
          </Router>
        </Provider>
      </I18nextProvider>
    );

    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByText(/I agree to:/i)).toBeInTheDocument();
    expect(screen.getByText(/Give consent/i)).toBeInTheDocument();
  });

  it("displays error messages for invalid form submission", async () => {
    const store = mockStore({});
    render(
      <I18nextProvider i18n={i18n}>
        <Provider store={store}>
          <Router>
            <ConsentForm />
          </Router>
        </Provider>
      </I18nextProvider>
    );

    fireEvent.click(screen.getByText(/Give consent/i));

    expect(await screen.findByText(/name is required/i)).toBeInTheDocument();
    expect(await screen.findByText(/email is required/i)).toBeInTheDocument();
    expect(
      await screen.findByText(/At least one consent option must be selected/i)
    ).toBeInTheDocument();
  });
});
