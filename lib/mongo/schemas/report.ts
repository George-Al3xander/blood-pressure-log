import mongoose from "mongoose";

const Schema = mongoose.Schema;

export const ReportSchema = new Schema(
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

const Report =
    mongoose.models && mongoose.models.Report
        ? mongoose.models.Report /*as any*/
        : mongoose.model("Report", ReportSchema);
export default Report;
