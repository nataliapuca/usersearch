import React from "react";
import useFormattedDate from "../../hooks/useFormattedDate";
import { UserCardPorops } from "./UserCard.types";
import Avatar from "@mui/material/Avatar";
import {
  AvatarContainer,
  DateContainer,
  UserContainer,
  StyledCard,
} from "./UserCard.styles";

export const UserCard = ({ user }: UserCardPorops) => {
  const formattedDate = useFormattedDate(user.createdDate);

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
