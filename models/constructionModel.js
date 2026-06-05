const mongoose = require("mongoose");

const constructionSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    project_type: { type: String },
    description: { type: String },
    location: { type: String },
    area: { type: String },
    budget: { type: String },
    completion_time: { type: String },
    status: { type: String },
    contractor_name: { type: String },
    materials: { type: String },
    features: { type: [String] },
    image: { type: String },
    images: { type: [String] },
    contact_number: { type: String },
    is_featured: { type: Boolean, default: false },
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: false },
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Construction = mongoose.model("Construction", constructionSchema);

module.exports = Construction;
