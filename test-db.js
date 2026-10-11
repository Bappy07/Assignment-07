process.loadEnvFile(".env.local");

const { MongoClient } = require("mongodb");

async function testConnection() {
 const client = new MongoClient(process.env.DATABASE_URL, {
  serverSelectionTimeoutMS: 10000,
  tls: true,
});

  try {
    await client.connect();
    console.log("MongoDB connected successfully!");

    const db = client.db("bazar-dor");
    console.log("Database:", db.databaseName);
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
  } finally {
    await client.close();
  }
}

testConnection();