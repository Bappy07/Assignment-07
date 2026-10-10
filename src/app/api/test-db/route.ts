
import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";

export async function GET() {
  const client = new MongoClient(process.env.DATABASE_URL!);

  try {
        await client.connect();
        await client.db("admin").command({ ping: 1 });

        return NextResponse.json({
        success: true,
        message: "MongoDB connected successfully!",
        });
    } catch (error) {
        console.error("MongoDB connection failed:", error);

        return NextResponse.json(
        { success: false, message: "MongoDB connection failed" },
        { status: 500 }
        );
  } finally {
    await client.close();
  }
}
