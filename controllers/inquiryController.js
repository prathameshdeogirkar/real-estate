const Inquiry = require('../models/inquiryModel');

exports.createInquiry = async (req, res) => {
  try {
    const { name, email, phone, whatsapp, property_id, message } = req.body;
    console.log("➡️ [inquiries] CREATE request payload received:", name);
    
    if (!name || !message) {
      return res.status(400).json({ message: "Name and message are required" });
    }

    const inquiry = await Inquiry.create({ name, email, phone, whatsapp, property_id, message });
    console.log(`🟢 [inquiries] Document successfully inserted into MongoDB! ID: ${inquiry._id}`);
    res.status(201).json({ message: "Inquiry submitted successfully" });
  } catch (error) {
    console.error('🔴 DB Error creating inquiry:', error);
    res.status(500).json({ message: "Error submitting inquiry" });
  }
};

exports.getInquiries = async (req, res) => {
  try {
    console.log("➡️ [inquiries] READ request for all inquiries (with population)");
    const inquiries = await Inquiry.find().populate('property_id', 'title').sort({ created_at: -1 });
    console.log(`🟢 [inquiries] Found ${inquiries.length} inquiries in MongoDB`);
    
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
    console.log(`➡️ [inquiries] DELETE request for ID: ${id}`);
    const deleted = await Inquiry.findByIdAndDelete(id);
    if (deleted) {
      console.log(`🟢 [inquiries] Document successfully deleted! ID: ${id}`);
    } else {
      console.log(`⚠️ [inquiries] Document to delete not found: ID: ${id}`);
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
    console.log(`➡️ [inquiries] UPDATE status request for ID: ${id} to status: ${status}`);
    const updated = await Inquiry.findByIdAndUpdate(id, { status }, { new: true });
    if (updated) {
      console.log(`🟢 [inquiries] Document status successfully updated! ID: ${id}`);
    } else {
      console.log(`⚠️ [inquiries] Document to update status not found: ID: ${id}`);
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
    console.log(`➡️ [inquiries] UPDATE is_read: true request for ID: ${id}`);
    const updated = await Inquiry.findByIdAndUpdate(id, { is_read: true }, { new: true });
    if (updated) {
      console.log(`🟢 [inquiries] Document marked as read! ID: ${id}`);
    } else {
      console.log(`⚠️ [inquiries] Document to mark as read not found: ID: ${id}`);
    }
    res.status(200).json({ message: "Marked as read" });
  } catch (error) {
    console.error('🔴 DB Error marking inquiry as read:', error);
    res.status(500).json({ message: "Error marking as read" });
  }
};
