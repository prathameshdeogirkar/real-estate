const Review = require('../models/reviewModel');

exports.createReview = async (req, res) => {
  try {
    const { name, rating, message } = req.body;
    if (!name || !rating || !message) {
      return res.status(400).json({ message: "Name, rating, and message are required" });
    }

    const review = await Review.create({ name, rating, message });
    res.status(201).json({ message: "Review submitted successfully" });
  } catch (error) {
    console.error('🔴 DB Error creating review:', error);
    res.status(500).json({ message: "Error submitting review" });
  }
};

exports.getReviews = async (req, res) => {
  try {
    const reviews = await Review.find().sort({ created_at: -1 });
    res.status(200).json(reviews);
  } catch (error) {
    console.error('🔴 DB Error fetching reviews:', error);
    res.status(500).json({ message: "Error fetching reviews" });
  }
};

exports.getApprovedReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ status: "Approved" }).sort({ created_at: -1 });
    res.status(200).json(reviews);
  } catch (error) {
    console.error('🔴 DB Error fetching approved reviews:', error);
    res.status(500).json({ message: "Error fetching reviews" });
  }
};

exports.deleteReview = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Review.findByIdAndDelete(id);
    if (deleted) {
    } else {
    }
    res.status(200).json({ message: "Review deleted successfully" });
  } catch (error) {
    console.error('🔴 DB Error deleting review:', error);
    res.status(500).json({ message: "Error deleting review" });
  }
};

exports.updateReviewStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const updated = await Review.findByIdAndUpdate(id, { status }, { new: true });
    if (updated) {
    } else {
    }
    res.status(200).json({ message: "Status updated" });
  } catch (error) {
    console.error('🔴 DB Error updating review status:', error);
    res.status(500).json({ message: "Error updating status" });
  }
};

exports.updateReview = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, rating, message } = req.body;
    const updated = await Review.findByIdAndUpdate(id, { name, rating, message }, { new: true });
    if (updated) {
    } else {
    }
    res.status(200).json({ message: "Review updated successfully" });
  } catch (error) {
    console.error('🔴 DB Error updating review details:', error);
    res.status(500).json({ message: "Error updating review" });
  }
};
