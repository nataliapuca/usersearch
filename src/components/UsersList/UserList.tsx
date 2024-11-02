import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../../redux/thunks/usersThunk";
import type { AppDispatch, RootState } from "../../redux/store";
import { StyledList, StyledListItem } from "./UsersList.styles";
import { UserCard } from "../UserCard/UserCard";
import LinearProgress from "@mui/material/LinearProgress";
import { Link } from "react-router-dom";

const UserList = () => {
  const dispatch: AppDispatch = useDispatch();
  const { users, loading, error, currentPage, totalUsers } = useSelector(
    (state: RootState) => state.users
  );
  const formData = useSelector((state: RootState) => state.form.formData);

  useEffect(() => {
    if (formData && Object.keys(formData).length > 0) {
      dispatch(fetchUsers({ params: formData, page: 1 })); // Fetch the first page
    }
  }, [dispatch, formData]);

  useEffect(() => {
    const handleScroll = () => {
      const bottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight;
      const hasMoreUsers = users.length < totalUsers; // Check if there are more users to fetch

      if (bottom && !loading && hasMoreUsers) {
        dispatch(fetchUsers({ params: formData!, page: currentPage }));
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [dispatch, loading, currentPage, formData, totalUsers, users.length]);

  if (loading && users.length === 0) {
    return <LinearProgress />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <StyledList>
        {users?.map((user) => (
          <StyledListItem key={user.id}>
            <Link to={`/user/${user.id}`} style={{ textDecoration: "none" }}>
              <UserCard user={user} />
            </Link>
          </StyledListItem>
        ))}
      </StyledList>
      {loading && <LinearProgress />}
      {!loading && totalUsers > 0 && users.length >= totalUsers && (
        <div style={{ textAlign: "center", margin: "20px" }}>
          No more pages to fetch.
        </div>
      )}
    </div>
  );
};

export default UserList;
