const Review = require('../models/reviewModel');

exports.createReview = async (req, res) => {
  try {
    const { name, rating, message } = req.body;
    console.log("➡️ [reviews] CREATE request payload received:", name);
    if (!name || !rating || !message) {
      return res.status(400).json({ message: "Name, rating, and message are required" });
    }

    const review = await Review.create({ name, rating, message });
    console.log(`🟢 [reviews] Document successfully inserted into MongoDB! ID: ${review._id}`);
    res.status(201).json({ message: "Review submitted successfully" });
  } catch (error) {
    console.error('🔴 DB Error creating review:', error);
    res.status(500).json({ message: "Error submitting review" });
  }
};

exports.getReviews = async (req, res) => {
  try {
    console.log("➡️ [reviews] READ request for all reviews");
    const reviews = await Review.find().sort({ created_at: -1 });
    console.log(`🟢 [reviews] Found ${reviews.length} reviews in MongoDB`);
    res.status(200).json(reviews);
  } catch (error) {
    console.error('🔴 DB Error fetching reviews:', error);
    res.status(500).json({ message: "Error fetching reviews" });
  }
};

exports.getApprovedReviews = async (req, res) => {
  try {
    console.log("➡️ [reviews] READ request for approved reviews");
    const reviews = await Review.find({ status: "Approved" }).sort({ created_at: -1 });
    console.log(`🟢 [reviews] Found ${reviews.length} approved reviews in MongoDB`);
    res.status(200).json(reviews);
  } catch (error) {
    console.error('🔴 DB Error fetching approved reviews:', error);
    res.status(500).json({ message: "Error fetching reviews" });
  }
};

exports.deleteReview = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(`➡️ [reviews] DELETE request for ID: ${id}`);
    const deleted = await Review.findByIdAndDelete(id);
    if (deleted) {
      console.log(`🟢 [reviews] Document successfully deleted! ID: ${id}`);
    } else {
      console.log(`⚠️ [reviews] Document to delete not found: ID: ${id}`);
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
    console.log(`➡️ [reviews] UPDATE status request for ID: ${id} to status: ${status}`);
    const updated = await Review.findByIdAndUpdate(id, { status }, { new: true });
    if (updated) {
      console.log(`🟢 [reviews] Document status successfully updated! ID: ${id}`);
    } else {
      console.log(`⚠️ [reviews] Document to update status not found: ID: ${id}`);
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
    console.log(`➡️ [reviews] UPDATE details request for ID: ${id}`);
    const updated = await Review.findByIdAndUpdate(id, { name, rating, message }, { new: true });
    if (updated) {
      console.log(`🟢 [reviews] Document successfully updated! ID: ${id}`);
    } else {
      console.log(`⚠️ [reviews] Document to update not found: ID: ${id}`);
    }
    res.status(200).json({ message: "Review updated successfully" });
  } catch (error) {
    console.error('🔴 DB Error updating review details:', error);
    res.status(500).json({ message: "Error updating review" });
  }
};
