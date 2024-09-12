import configureStore from "redux-mock-store";
import thunk, { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import consentReducer, {
  fetchConsents,
  addConsent,
  ConsentState,
} from "../../store/consentSlice";
import "@testing-library/jest-dom";

// Define RootState
interface RootState {
  consent: ConsentState;
}

// Setup store with correct typing
const middlewares = [
  thunk as unknown as ThunkDispatch<RootState, unknown, AnyAction>,
];
const mockStore = configureStore<
  RootState,
  ThunkDispatch<RootState, unknown, AnyAction>
>(middlewares);

describe("consentSlice", () => {
  describe("reducer", () => {
    it("should handle initial state", () => {
      expect(consentReducer(undefined, { type: "unknown" })).toEqual({
        consents: [],
        currentPage: 1,
        totalPages: 1,
        status: "idle",
        error: null,
      });
    });

    it("should handle fetchConsents.fulfilled", () => {
      const previousState: ConsentState = {
        consents: [],
        currentPage: 1,
        totalPages: 1,
        status: "loading",
        error: null,
      };
      expect(
        consentReducer(
          previousState,
          fetchConsents.fulfilled(
            {
              consents: [
                {
                  id: 1,
                  name: "Test",
                  email: "test@example.com",
                  consents: ["newsletter"],
                },
              ],
              totalPages: 1,
            },
            "requestId",
            { page: 1, itemsPerPage: 2 }
          )
        )
      ).toEqual({
        consents: [
          {
            id: 1,
            name: "Test",
            email: "test@example.com",
            consents: ["newsletter"],
          },
        ],
        currentPage: 1,
        totalPages: 1,
        status: "succeeded",
        error: null,
      });
    });
  });

  describe("actions", () => {
    it("should create an action to fetch consents", () => {
      const store = mockStore({
        consent: consentReducer(undefined, { type: "unknown" }),
      });
      const expectedActions = [
        { type: fetchConsents.pending.type },
        {
          type: fetchConsents.fulfilled.type,
          payload: { consents: [], totalPages: 0 },
        },
      ];

      return store
        .dispatch(fetchConsents({ page: 1, itemsPerPage: 2 }))
        .then(() => {
          const actions = store.getActions();
          expect(actions).toEqual(expect.arrayContaining(expectedActions));
        });
    });

    it("should create an action to add consent", () => {
      const store = mockStore({
        consent: consentReducer(undefined, { type: "unknown" }),
      });
      const newConsent = {
        name: "Test",
        email: "test@example.com",
        consents: ["newsletter"],
      };
      const expectedActions = [
        { type: addConsent.pending.type },
        {
          type: addConsent.fulfilled.type,
          payload: expect.objectContaining(newConsent),
        },
      ];

      return store.dispatch(addConsent(newConsent)).then(() => {
        const actions = store.getActions();
        expect(actions).toEqual(expect.arrayContaining(expectedActions));
      });
    });
  });
});
