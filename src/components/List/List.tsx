import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../redux/store";
import { ListItemComponent } from "../ListItem/ListItem";
import { ListProps } from "./List.types";
import { InfoBar, StyledList, StyledListItem } from "./List.styles";
import LinearProgress from "@mui/material/LinearProgress";
import { useDataSelector } from "../../hooks/useDataSelector";
import { Alert } from "@mui/material";

const List = ({ source, fetchData, formData, collectionId }: ListProps) => {
  const dispatch: AppDispatch = useDispatch();

  const { items, loading, error, currentPage, totalItems } =
    useDataSelector(source);

  const noResults = totalItems === -1;

  useEffect(() => {
    if (
      formData &&
      Object.keys(formData).length > 0 &&
      items.length === 0 &&
      !noResults
    ) {
      dispatch(fetchData({ params: formData, page: 1, id: collectionId }));
    }
  }, [formData, dispatch]);

  useEffect(() => {
    const handleScroll = () => {
      const bottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight;
      const hasMoreUsers = items.length < totalItems;
      if (bottom && !loading && hasMoreUsers) {
        dispatch(
          fetchData({ params: formData!, page: currentPage, id: collectionId })
        );
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [
    loading,
    currentPage,
    formData,
    totalItems,
    items.length,
    dispatch,
    collectionId,
  ]);

  if (loading && items.length === 0) {
    return <LinearProgress />;
  }

  if (error) {
    return <Alert severity="error"> {error}</Alert>;
  }
  if (noResults) {
    return <Alert severity="info"> No items to display</Alert>;
  }

  return (
    <div>
      <StyledList>
        {items?.map((item) => (
          <StyledListItem key={item.id}>
            <ListItemComponent item={item} collectionId={collectionId} />
          </StyledListItem>
        ))}
      </StyledList>
      <InfoBar>
        {loading && <LinearProgress />}
        {!loading && totalItems > 0 && items.length >= totalItems && (
          <div> No more results to show.</div>
        )}
      </InfoBar>
    </div>
  );
};

export default List;
