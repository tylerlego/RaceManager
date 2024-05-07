import { useEffect, useState } from "react";
import { UserService } from "../Services/UserService";
import { Avatar } from "@mantine/core";

export default function ProfileComponent() {
  const [user, setUser] = useState({} as any);
    const userService = new UserService();

    useEffect(() => {
      userService.getAuthUser().then((user) => {
        setUser(user.data);
      });
    }, []);
    return (
      <div>
        <Avatar src={user.discordAvatar} alt="no image here" />
        <p>{user.discordUsername}</p>
      </div>
    );
  }