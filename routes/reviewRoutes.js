const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');

router.post('/', reviewController.createReview);
router.get('/', reviewController.getReviews);
router.get('/approved', reviewController.getApprovedReviews);
router.delete('/:id', reviewController.deleteReview);
router.patch('/:id/status', reviewController.updateReviewStatus);
router.put('/:id', reviewController.updateReview);

module.exports = router;
