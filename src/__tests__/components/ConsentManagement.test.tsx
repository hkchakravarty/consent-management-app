import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import configureStore from "redux-mock-store";
import ConsentManagement from "../../pages/ConsentManagement";
import "@testing-library/jest-dom";

const mockStore = configureStore([]);

describe("ConsentManagement", () => {
  it("renders loading state", () => {
    const store = mockStore({
      consent: { status: "loading", consents: [], totalPages: 1, error: null },
    });
    render(
      <Provider store={store}>
        <Router>
          <ConsentManagement />
        </Router>
      </Provider>
    );

    expect(screen.getByLabelText(/Loading consents/i)).toBeInTheDocument();
  });

  it("renders error state", () => {
    const store = mockStore({
      consent: {
        status: "failed",
        consents: [],
        totalPages: 1,
        error: "Failed to fetch consents",
      },
    });
    render(
      <Provider store={store}>
        <Router>
          <ConsentManagement />
        </Router>
      </Provider>
    );

    expect(screen.getByText(/Failed to fetch consents/i)).toBeInTheDocument();
  });

  it("renders consents table when data is loaded", () => {
    const store = mockStore({
      consent: {
        status: "succeeded",
        consents: [
          {
            id: 1,
            name: "John Doe",
            email: "john@example.com",
            consents: ["newsletter"],
          },
        ],
        totalPages: 1,
        error: null,
      },
    });
    render(
      <Provider store={store}>
        <Router>
          <ConsentManagement />
        </Router>
      </Provider>
    );

    expect(screen.getByText(/John Doe/i)).toBeInTheDocument();
    expect(screen.getByText(/john@example.com/i)).toBeInTheDocument();
    expect(screen.getByText(/newsletter/i)).toBeInTheDocument();
  });
});
