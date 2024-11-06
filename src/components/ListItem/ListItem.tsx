import React from "react";
import { Link } from "react-router-dom";
import { UserCard } from "../UserCard/UserCard";
import { TaskCard } from "../TaskCard/TaskCard";
import { isUser } from "../List/List.types";
import { ListItemComponentProps } from "./ListItem.types";

export const ListItemComponent = ({
  item,
  collectionId,
}: ListItemComponentProps) => {
  if (isUser(item)) {
    return (
      <Link
        to={`/user/${item.id}/${item.name}`}
        style={{ textDecoration: "none" }}
      >
        <UserCard user={item} />
      </Link>
    );
  } else {
    return <TaskCard task={item} collectionId={collectionId!} />;
  }
};
