// lib/mongoose.ts
import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI || "";

if (!MONGO_URI) {
  console.error("MONGO_URI not set in environment");
  throw new Error("MONGO_URI not set");
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  var _mongoose: { conn: any; promise: any } | undefined;
}

let cached = global._mongoose;

if (!cached) {
  cached = global._mongoose = { conn: null, promise: null };
}

export default async function connect() {
  if (cached!.conn) {
    // already connected
    return cached!.conn;
  }

  if (!cached!.promise) {
    console.log("MONGO: creating connection promise...");
    cached!.promise = mongoose
      .connect(MONGO_URI)
      .then((m) => {
        console.log("MONGO: connected");
        return m.connection;
      })
      .catch((err) => {
        console.error("MONGO: connection error", err);
        throw err;
      });
  }

  cached!.conn = await cached!.promise;
  return cached!.conn;
}
