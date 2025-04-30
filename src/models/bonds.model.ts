import { Schema, model } from "mongoose";

const bondSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  name: { type: String, require: true },
  quantity: { type: Number, require: true },
  faceValue: { type: Number, require: true },
  purchasePrice: { type: Number, require: true },
  paymentsPerYear: { type: Number, require: true },
  couponAmount: { type: Number },
  couponRate: { type: Number },
  currentYield: { type: Number },
  yieldToMaturity: { type: Number, require: true },
  maturityDate: { type: Date },
  total: { type: Number, require: true },
});

export const bondModel = model("Bond", bondSchema);
