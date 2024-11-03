import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../redux/store";
import { StyledList, StyledListItem } from "./List.styles";
import { UserCard } from "../UserCard/UserCard";
import LinearProgress from "@mui/material/LinearProgress";
import { Link } from "react-router-dom";
import { FormData } from "../Form/Form.types";
import { AsyncThunkAction } from "@reduxjs/toolkit";

type FetchDataType = {
  page: number;
  params: FormData;
};

type ListProps = {
  items: Array<any>; // Replace 'any' with your User type if available
  loading: boolean;
  error: string | null;
  currentPage: number;
  totalItems: number;
  fetchData: (args: FetchDataType) => AsyncThunkAction<any, FetchDataType, any>; // Updated prop type
  formData: FormData | null;
};

const List = ({
  items,
  loading,
  error,
  currentPage,
  totalItems,
  fetchData,
  formData,
}: ListProps) => {
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    if (formData && Object.keys(formData).length > 0) {
      dispatch(fetchData({ params: formData, page: 1 })); // Fetch the first page
    }
  }, [dispatch, fetchData, formData]);

  useEffect(() => {
    const handleScroll = () => {
      const bottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight;
      const hasMoreUsers = items.length < totalItems; // Check if there are more users to fetch

      if (bottom && !loading && hasMoreUsers) {
        dispatch(fetchData({ params: formData!, page: currentPage }));
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [
    dispatch,
    loading,
    currentPage,
    formData,
    totalItems,
    items.length,
    fetchData,
  ]);

  if (loading && items.length === 0) {
    return <LinearProgress />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <StyledList>
        {items?.map((item) => (
          <StyledListItem key={item.id}>
            <Link to={`/user/${item.id}`} style={{ textDecoration: "none" }}>
              <UserCard user={item} />
            </Link>
          </StyledListItem>
        ))}
      </StyledList>
      {loading && <LinearProgress />}
      {!loading && totalItems > 0 && items.length >= totalItems && (
        <div style={{ textAlign: "center", margin: "20px" }}>
          No more pages to fetch.
        </div>
      )}
    </div>
  );
};

export default List;
