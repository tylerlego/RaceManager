export type Role = {
  _id?: string;
  name: RoleEnum;
  discordRoleId: Number;
}

export enum RoleEnum {
  TOP_STAFF = 'Top Staff',
  ACTIVE = 'Active Driver',
  EVERYONE = '@everyone',
  TEAM_1 = 'Team 1',
  TEAM_2 = 'Team 2',
  TEAM_3 = 'Team 3',
  OWNER = 'Owner',
  A_CLASS = 'A Class',
  B_CLASS = 'B Class',
  C_CLASS = 'C Class',
  D_CLASS = 'D Class',   
}
