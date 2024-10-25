import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async () => {
  mongoose.set("strictQuery", true);

  if (isConnected) {
    console.log("MongoDB is already connected");
    return;
  }

  try {
    // First, check if MONGODB_URI exists
    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI is not defined in environment variables");
    }

    // Remove deprecated options
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "share_prompt",
    });

    isConnected = true;
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", {
      name: error.name,
      message: error.message,
      code: error.code,
      // If it's an Atlas error, log additional details
      ...(error.errorResponse && {
        errorResponse: error.errorResponse,
      }),
    });

    throw error; // Re-throw the error to handle it in the calling function
  }
};
