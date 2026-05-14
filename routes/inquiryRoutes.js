const express = require('express');
const router = express.Router();
const inquiryController = require('../controllers/inquiryController');
const protect = require('../middleware/authMiddleware');

// Public route to submit inquiry
router.post('/', inquiryController.createInquiry);

// Protected routes for admin
router.get('/', protect, inquiryController.getInquiries);
router.delete('/:id', protect, inquiryController.deleteInquiry);
router.put('/:id/status', protect, inquiryController.updateInquiryStatus);
router.put('/:id/read', protect, inquiryController.markInquiryAsRead);

module.exports = router;
