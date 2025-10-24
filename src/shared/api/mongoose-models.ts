import { TReport } from "@/shared/model";
import mongoose, { Model } from "mongoose";

const Schema = mongoose.Schema;

export const ReportSchema = new Schema<TReport>(
    {
        date: {
            type: Date,
            required: true,
        },
        sys: {
            type: Number,
            required: true,
        },
        dia: {
            type: Number,
            required: true,
        },
        pulse: {
            type: Number,
            required: true,
        },
        rating: {
            type: Number,
            enum: [1, 2, 3, 4, 5],
            required: true,
        },
        notes: {
            type: String,
            required: true,
        },
        userId: {
            type: String,
            required: true,
        },
    },
    { timestamps: true },
);

export const reportModel =
    (mongoose.models?.Report as Model<TReport>) ||
    mongoose.model<TReport>("Report", ReportSchema);
