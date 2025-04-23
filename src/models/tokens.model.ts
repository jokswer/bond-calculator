import { Schema, model } from "mongoose";

const tokenSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  refreshToken: { type: String, require: true },
});

export const tokenModel = model("Token", tokenSchema);
