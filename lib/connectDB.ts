import mongoose from "mongoose";

let cached = (global as any).mongoose || { conn: null, promise: null };

export const connectDB = async() => {
    const MONGODB_URI = process.env.MONGODB_URI as string;
    const MONGODB_NAME = process.env.MONGODB_NAME as string;

    if (!MONGODB_NAME || !MONGODB_URI) {
        throw Error("Failed to fetch DB configs.")
    }
    if (cached.conn) {
        return cached.conn; // ✅ already connected
    }

    if (!cached.promise) {
        cached.promise = mongoose.connect(MONGODB_URI, { dbName: MONGODB_NAME, bufferCommands: false })
        
    }

    cached.conn = await cached.promise
    .then(() => {
        console.log("DB is connected successfully");
    })
    .catch((err:any) => {
        throw Error("Error in DB connection: " + err);
    });
    return cached.conn;

}