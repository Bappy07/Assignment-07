
import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

const mongoClient = new MongoClient(process.env.DATABASE_URL!);

const db = mongoClient.db("bazar-dor");

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client: mongoClient,
  }),

  secret: process.env.BETTER_AUTH_SECRET,

  baseURL: process.env.BETTER_AUTH_URL,

  emailAndPassword: {
    enabled: true,
  },
});
