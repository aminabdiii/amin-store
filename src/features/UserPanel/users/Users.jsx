import { Skeleton } from "@mui/material";
import { useAllUser } from "../useAllUser";
import { useGetUser } from "../../../hooks/useGetUser";
import Empty from "../../../ui/Empty";

import UserBox from "./UserBox";
import UserPanelContainer from "../UserPanelContainer";

function Users() {
  const { allUsers, isLoading: gettingUsers } = useAllUser();
  const { user: signInUser, isLoading: gettingUser } = useGetUser();

  if (gettingUsers || gettingUser) {
    return (
      <UserPanelContainer>
        <div className="grid grid-cols-2 gap-3 xs:grid-cols-3 lg:grid-cols-4 lg:gap-6">
          <Skeleton variant="rounded" animation="wave" height={300} />
          <Skeleton variant="rounded" animation="wave" height={300} />
          <Skeleton variant="rounded" animation="wave" height={300} />
          <Skeleton variant="rounded" animation="wave" height={300} />
        </div>
      </UserPanelContainer>
    );
  }

  const users = allUsers.users.length
    ? allUsers.users.filter((user) => user.id !== signInUser.id)
    : [];

  return (
    <UserPanelContainer>
      <div className="grid grid-cols-1 gap-3 xxs:grid-cols-2 xs:grid-cols-3 lg:grid-cols-4 lg:gap-6">
        {users.map((user) => {
          return <UserBox key={user.id} user={user} />;
        })}

        {users.length === 0 && (
          <div className="col-span-4 flex w-full justify-center">
            <Empty
              title="users not found"
              description="Currently, no users have registered except for you"
            />
          </div>
        )}
      </div>
    </UserPanelContainer>
  );
}

export default Users;
