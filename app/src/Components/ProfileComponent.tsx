import { Avatar, Group, Text } from "@mantine/core";
import { useAppSelector } from "../Store/hooks";
import { User } from "../Types/User";
import { Role } from "../Types/Role";

export default function ProfileComponent() {
  const user: User | null = useAppSelector((state) => state.app.user);

  return (
    <div>
      {user != null && (
        <>
          <Group style={{padding: '10px 0'}}>
            <Avatar src={user.discordAvatar} alt="no image here" />
            <Text>{user.discordUsername}</Text> 
          </Group>
          <Text>Server nickname: {user.guildNickname}</ Text>
          <Text>Member since: {new Date(user.guildJoinedAt).toDateString()}</Text>
          <Text>Current roles: {user.roles.map((role: Role) => {
            return role.name;
          }).join(', ')}</Text>
        </>
      )}
    </div>
  );
}