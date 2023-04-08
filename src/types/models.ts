export type UserSession = {
  user: { email: string; name: string };
  permission: { role: string; permissions: string[] };
};
