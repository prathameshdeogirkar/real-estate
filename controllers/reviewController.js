const Review = require('../models/reviewModel');

exports.createReview = (req, res) => {
  const { name, rating, message } = req.body;
  if (!name || !rating || !message) {
    return res.status(400).json({ message: "Name, rating, and message are required" });
  }

  Review.create({ name, rating, message }, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Error submitting review" });
    }
    res.status(201).json({ message: "Review submitted successfully" });
  });
};

exports.getReviews = (req, res) => {
  Review.getAll((err, reviews) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Error fetching reviews" });
    }
    res.status(200).json(reviews);
  });
};

exports.getApprovedReviews = (req, res) => {
  Review.getApproved((err, reviews) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Error fetching reviews" });
    }
    res.status(200).json(reviews);
  });
};

exports.deleteReview = (req, res) => {
  Review.delete(req.params.id, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Error deleting review" });
    }
    res.status(200).json({ message: "Review deleted successfully" });
  });
};

exports.updateReviewStatus = (req, res) => {
  const { status } = req.body;
  Review.updateStatus(req.params.id, status, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Error updating status" });
    }
    res.status(200).json({ message: "Status updated" });
  });
};

exports.updateReview = (req, res) => {
  const { name, rating, message } = req.body;
  Review.update(req.params.id, { name, rating, message }, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Error updating review" });
    }
    res.status(200).json({ message: "Review updated successfully" });
  });
};
