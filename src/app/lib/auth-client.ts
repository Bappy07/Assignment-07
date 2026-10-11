import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: "https://assignment-07-rosy-iota.vercel.app",
  // baseURL: "http://localhost:3000",
});