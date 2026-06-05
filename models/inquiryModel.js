const mongoose = require("mongoose");

const inquirySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phone: { type: String },
    whatsapp: { type: String },
    email: { type: String },
    property_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Property' },
    message: { type: String },
    status: { type: String, default: "Pending" },
    is_read: { type: Boolean, default: false },
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: false },
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Inquiry = mongoose.model("Inquiry", inquirySchema);

module.exports = Inquiry;
