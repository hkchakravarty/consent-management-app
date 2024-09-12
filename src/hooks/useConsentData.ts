import { useEffect } from "react";
import { useAppDispatch } from "./useAppDispatch";
import { useAppSelector } from "./useAppSelector";
import { fetchConsents } from "../store/consentSlice";

export const useConsentData = (page: number, itemsPerPage: number) => {
  const dispatch = useAppDispatch();
  const { consents, totalPages, status, error } = useAppSelector(
    (state) => state.consent
  );

  useEffect(() => {
    dispatch(fetchConsents({ page, itemsPerPage }));
  }, [dispatch, page, itemsPerPage]);

  return { consents, totalPages, status, error };
};
