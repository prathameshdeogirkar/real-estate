const mongoose = require("mongoose");

const completedProjectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    image: { type: String },
    year: { type: String },
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: false },
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const CompletedProject = mongoose.model("CompletedProject", completedProjectSchema);

module.exports = CompletedProject;