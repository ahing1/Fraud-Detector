import mongoose from "mongoose";

const FraudFlagSchema = new mongoose.Schema({
    transactionID: { type: String, required: true },
    fraudScore: { type: Number, required: true }, // Probability score
    flaggedBy: { type: String, enum: ['model', 'manual'], default: 'model' },
    comments: { type: String },
  });

export const fraudFlag = mongoose.model("FraudFlag", FraudFlagSchema);