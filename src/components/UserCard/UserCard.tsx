import React from "react";
import { User } from "../../types/types";
import Avatar from "@mui/material/Avatar";
import {
  AvatarContainer,
  DateContainer,
  UserContainer,
  StyledCard,
} from "./UserCard.styles";

export type UserCardPorops = {
  user: User;
};

export const UserCard = ({ user }: UserCardPorops) => {
  const date = new Date(
    user.createdDate._seconds * 1000 + user.createdDate._nanoseconds / 1000000
  );

  const formattedDate = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "2-digit",
  });

  return (
    <StyledCard variant="outlined">
      <UserContainer>
        <AvatarContainer>
          <Avatar alt={user.name} src={user.avatar_url} />
          {user.name} {user.surename}
        </AvatarContainer>
        <DateContainer>{formattedDate}</DateContainer>
      </UserContainer>
    </StyledCard>
  );
};
