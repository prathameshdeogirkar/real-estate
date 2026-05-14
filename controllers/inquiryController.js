const Inquiry = require('../models/inquiryModel');

exports.createInquiry = (req, res) => {
  const { name, email, phone, whatsapp, property_id, message } = req.body;
  
  if (!name || !message) {
    return res.status(400).json({ message: "Name and message are required" });
  }

  Inquiry.create({ name, email, phone, whatsapp, property_id, message }, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Error submitting inquiry" });
    }
    res.status(201).json({ message: "Inquiry submitted successfully" });
  });
};

exports.getInquiries = (req, res) => {
  Inquiry.getAll((err, inquiries) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Error fetching inquiries" });
    }
    res.status(200).json(inquiries);
  });
};

exports.deleteInquiry = (req, res) => {
  Inquiry.delete(req.params.id, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Error deleting inquiry" });
    }
    res.status(200).json({ message: "Inquiry deleted successfully" });
  });
};

exports.updateInquiryStatus = (req, res) => {
  const { status } = req.body;
  Inquiry.updateStatus(req.params.id, status, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Error updating status" });
    }
    res.status(200).json({ message: "Status updated" });
  });
};

exports.markInquiryAsRead = (req, res) => {
  Inquiry.markAsRead(req.params.id, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Error marking as read" });
    }
    res.status(200).json({ message: "Marked as read" });
  });
};

