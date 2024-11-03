import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../redux/store";
import { StyledList, StyledListItem } from "./List.styles";
import { UserCard } from "../UserCard/UserCard";
import LinearProgress from "@mui/material/LinearProgress";
import { Link } from "react-router-dom";
import { Task, User } from "../../types/types";
import { ListProps, isUser } from "./List.types";
import { TaskCard } from "../TaskCard/TaskCard";

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
      dispatch(fetchData({ params: formData, page: 1 }));
      console.log(
        "w srodku fetch data - >itemslength",
        items.length,
        "totalitems",
        totalItems
      );
    }
  }, [dispatch, fetchData, formData]);

  useEffect(() => {
    const handleScroll = () => {
      const bottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight;
      const hasMoreUsers = items.length < totalItems; // Check if there are more users to fetch
      console.log("itemslength", items.length, "totalitems", totalItems);
      if (bottom && !loading && hasMoreUsers) {
        dispatch(fetchData({ params: formData!, page: currentPage }));
        console.log(
          "w srodku fetch data - >itemslength",
          items.length,
          "totalitems",
          totalItems
        );
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

  const renderItem = (item: User | Task) => {
    if (isUser(item)) {
      return (
        <Link to={`/user/${item.id}`} style={{ textDecoration: "none" }}>
          <UserCard user={item} />
        </Link>
      );
    } else {
      return <TaskCard task={item} />;
    }
  };

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
          <StyledListItem key={item.id}>{renderItem(item)}</StyledListItem>
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
