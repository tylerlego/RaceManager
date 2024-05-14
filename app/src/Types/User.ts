import { Role } from "./Role";

export type User = {
  _id: number;
  email: string;
  discordId: string;
  discordUsername: string;
  discordAvatar: string;
  accessToken: string;
  refreshToken: string;
  guildNickname: string;
  guildJoinedAt: number;
  roles: Role[];
};