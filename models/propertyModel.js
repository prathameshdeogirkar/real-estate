const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    type: { type: String },
    price: { type: Number },
    offer_price: { type: Number },
    address: { type: String },
    description: { type: String },
    image: { type: String },
    property_type: { type: String, default: "For Sale" },
    rent_amount: { type: Number },
    deposit_amount: { type: Number },
    images: { type: [String] },
    area: { type: Number },
    bedrooms: { type: Number },
    bathrooms: { type: Number },
    parking: { type: String },
    amenities: { type: [String] },
    nearby_places: { type: [mongoose.Schema.Types.Mixed] },
    map_location: { type: String },
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: false },
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Property = mongoose.model("Property", propertySchema);

module.exports = Property;