import mongoose from "mongoose";

async function connectToDatabase(uri: string) {
  try {
    await mongoose.connect(uri);
  } catch (error) {
    console.log(error);
  }
}

export default connectToDatabase;
