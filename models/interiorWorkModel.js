const mongoose = require("mongoose");

const interiorWorkSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    interior_type: { type: String },
    description: { type: String },
    location: { type: String },
    room_type: { type: String },
    design_style: { type: String },
    budget: { type: String },
    duration: { type: String },
    materials: { type: String },
    furniture_included: { type: String },
    lighting_details: { type: String },
    image: { type: String },
    images: { type: [String] },
    before_after_images: { type: [String] },
    contact_number: { type: String },
    is_featured: { type: Boolean, default: false },
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: false },
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const InteriorWork = mongoose.model("InteriorWork", interiorWorkSchema);

module.exports = InteriorWork;
