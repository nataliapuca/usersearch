import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../../redux/userSlice";
import type { AppDispatch, RootState } from "../../redux/store";
import { StyledList, StyledListItem } from "./UsersList.styles";
import { UserCard } from "../UserCard/UserCard";
import LinearProgress from "@mui/material/LinearProgress";

const UserList = () => {
  const dispatch: AppDispatch = useDispatch();

  // Access users slice and formData slice from Redux store
  const { users, loading, error } = useSelector(
    (state: RootState) => state.users
  );
  const formData = useSelector((state: RootState) => state.form.formData);

  useEffect(() => {
    // Check if formData has any values and then call fetchUsers
    if (formData && Object.keys(formData).length > 0) {
      dispatch(fetchUsers(formData)); // Use formData values as parameters
    }
  }, [dispatch, formData]);

  if (loading) {
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
            <UserCard user={user} />
          </StyledListItem>
        ))}
      </StyledList>
    </div>
  );
};

export default UserList;
