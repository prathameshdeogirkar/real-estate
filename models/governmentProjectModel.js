const mongoose = require("mongoose");

const governmentProjectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    department: { type: String },
    project_type: { type: String },
    description: { type: String },
    location: { type: String },
    budget: { type: String },
    start_date: { type: String },
    completion_date: { type: String },
    status: { type: String },
    contractor_name: { type: String },
    image: { type: String },
    images: { type: [String] },
    documents: { type: [String] },
    contact_number: { type: String },
    is_featured: { type: Boolean, default: false },
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: false },
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const GovernmentProject = mongoose.model("GovernmentProject", governmentProjectSchema);

module.exports = GovernmentProject;
