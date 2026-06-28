const Inquiry = require('../models/inquiryModel');

exports.createInquiry = async (req, res) => {
  try {
    const { name, email, phone, whatsapp, property_id, message } = req.body;
    
    if (!name || !message) {
      return res.status(400).json({ message: "Name and message are required" });
    }

    const inquiry = await Inquiry.create({ name, email, phone, whatsapp, property_id, message });
    res.status(201).json({ message: "Inquiry submitted successfully" });
  } catch (error) {
    console.error('🔴 DB Error creating inquiry:', error);
    res.status(500).json({ message: "Error submitting inquiry" });
  }
};

exports.getInquiries = async (req, res) => {
  try {
    const inquiries = await Inquiry.find().populate('property_id', 'title').sort({ created_at: -1 });
    
    // Map property_title for frontend compatibility
    const formattedInquiries = inquiries.map(inq => {
      const doc = inq.toObject();
      doc.property_title = doc.property_id ? doc.property_id.title : null;
      return doc;
    });

    res.status(200).json(formattedInquiries);
  } catch (error) {
    console.error('🔴 DB Error fetching inquiries:', error);
    res.status(500).json({ message: "Error fetching inquiries" });
  }
};

exports.deleteInquiry = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Inquiry.findByIdAndDelete(id);
    if (deleted) {
    } else {
    }
    res.status(200).json({ message: "Inquiry deleted successfully" });
  } catch (error) {
    console.error('🔴 DB Error deleting inquiry:', error);
    res.status(500).json({ message: "Error deleting inquiry" });
  }
};

exports.updateInquiryStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const updated = await Inquiry.findByIdAndUpdate(id, { status }, { new: true });
    if (updated) {
    } else {
    }
    res.status(200).json({ message: "Status updated" });
  } catch (error) {
    console.error('🔴 DB Error updating inquiry status:', error);
    res.status(500).json({ message: "Error updating status" });
  }
};

exports.markInquiryAsRead = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Inquiry.findByIdAndUpdate(id, { is_read: true }, { new: true });
    if (updated) {
    } else {
    }
    res.status(200).json({ message: "Marked as read" });
  } catch (error) {
    console.error('🔴 DB Error marking inquiry as read:', error);
    res.status(500).json({ message: "Error marking as read" });
  }
};
