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

// Virtual property 'name' mapping to 'title' for compatibility with frontend Home page templates
completedProjectSchema.virtual("name").get(function () {
  return this.title;
});

const CompletedProject = mongoose.model("CompletedProject", completedProjectSchema);

module.exports = CompletedProject;