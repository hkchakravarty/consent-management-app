import {
  createSlice,
  createAsyncThunk,
  PayloadAction,
  ActionReducerMapBuilder,
} from "@reduxjs/toolkit";
import { Consent } from "../types";
import { mockApiService } from "../services/mockApiService";
import {
  GetConsentsResponse,
  AddConsentResponse,
  ApiError,
} from "../types/api";

export interface ConsentState {
  consents: Consent[];
  currentPage: number;
  totalPages: number;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: ConsentState = {
  consents: [],
  currentPage: 1,
  totalPages: 1,
  status: "idle",
  error: null,
};

/**
 * Async thunk for fetching consents from the API.
 *
 * @param {Object} params - The parameters for fetching consents
 * @param {number} params.page - The page number to fetch
 * @param {number} params.itemsPerPage - The number of items per page
 * @returns {Promise<GetConsentsResponse>} The fetched consents and total pages
 */

export const fetchConsents = createAsyncThunk<
  GetConsentsResponse,
  { page: number; itemsPerPage: number },
  { rejectValue: ApiError }
>(
  "consent/fetchConsents",
  async ({ page, itemsPerPage }, { rejectWithValue }) => {
    try {
      return await mockApiService.getConsents(page, itemsPerPage);
    } catch (error) {
      return rejectWithValue({
        message: (error as Error).message || "Failed to fetch consents",
      });
    }
  }
);

/**
 * Async thunk for adding a new consent to the API.
 *
 * @param {Omit<Consent, "id">} newConsent - The new consent to add
 * @returns {Promise<AddConsentResponse>} The added consent
 */
export const addConsent = createAsyncThunk<
  AddConsentResponse,
  Omit<Consent, "id">,
  { rejectValue: ApiError }
>("consent/addConsent", async (newConsent, { rejectWithValue }) => {
  try {
    return await mockApiService.addConsent(newConsent);
  } catch (error) {
    return rejectWithValue({
      message: (error as Error).message || "Failed to add consent",
    });
  }
});

const consentSlice = createSlice({
  name: "consent",
  initialState,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<ConsentState>) => {
    builder
      .addCase(fetchConsents.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(
        fetchConsents.fulfilled,
        (
          state,
          action: PayloadAction<
            GetConsentsResponse,
            string,
            { arg: { page: number; itemsPerPage: number } }
          >
        ) => {
          state.status = "succeeded";
          state.consents = action.payload.consents;
          state.totalPages = action.payload.totalPages;
          state.currentPage = action.meta.arg.page;
          state.error = null;
        }
      )
      .addCase(fetchConsents.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload?.message || "An unknown error occurred";
      })
      .addCase(addConsent.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(
        addConsent.fulfilled,
        (state, action: PayloadAction<AddConsentResponse>) => {
          state.status = "succeeded";
          state.consents.push(action.payload);
          state.error = null;
        }
      )
      .addCase(addConsent.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload?.message || "An unknown error occurred";
      });
  },
});

export default consentSlice.reducer;
