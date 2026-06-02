const Property = require("../models/propertyModel");

const parseNumericField = (value, fieldName) => {
  if (value === "" || value === null || value === undefined) {
    return null;
  }
  
  const parsed = Number(value);
  if (isNaN(parsed)) {
    throw new Error(`${fieldName} must be a valid number`);
  }
  
  return parsed;
};

const addProperty = (req, res) => {
  try {
    if (req.body.price !== undefined) req.body.price = parseNumericField(req.body.price, "Price");
    if (req.body.offer_price !== undefined) req.body.offer_price = parseNumericField(req.body.offer_price, "Offer Price");
    if (req.body.rent_amount !== undefined) req.body.rent_amount = parseNumericField(req.body.rent_amount, "Rent Amount");
    if (req.body.deposit_amount !== undefined) req.body.deposit_amount = parseNumericField(req.body.deposit_amount, "Deposit Amount");
    if (req.body.area !== undefined) req.body.area = parseNumericField(req.body.area, "Area");
    if (req.body.bedrooms !== undefined) req.body.bedrooms = parseNumericField(req.body.bedrooms, "Bedrooms");
    if (req.body.bathrooms !== undefined) req.body.bathrooms = parseNumericField(req.body.bathrooms, "Bathrooms");
    if (req.body.parking !== undefined) req.body.parking = parseNumericField(req.body.parking, "Parking");
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message
    });
  }

  const propertyData = req.body;

  Property.addProperty(propertyData, (err, result) => {
    if (err) {
      console.error('🔴 DB Error adding property:', err);
      return res.status(500).json({
        message: "Error adding property",
        error: err.message,
      });
    }
    res.status(201).json({
      message: "Property Added Successfully",
    });
  });
};

const getAllProperties = (req, res) => {
  Property.getAllProperties((err, results) => {
    if (err) {
      console.error('🔴 DB Error fetching properties:', err);
      return res.status(500).json({
        message: "Error fetching properties",
        error: err.message,
      });
    }

    res.status(200).json(results);
  });
};

const deleteProperty = (req, res) => {
  const { id } = req.params;

  Property.deleteProperty(id, (err, result) => {
    if (err) {
      console.error('🔴 DB Error deleting property:', err);
      return res.status(500).json({
        message: "Error deleting property",
        error: err.message,
      });
    }

    res.status(200).json({
      message: "Property Deleted Successfully",
    });
  });
};

const updateProperty = (req, res) => {
  const { id } = req.params;

  try {
    if (req.body.price !== undefined) req.body.price = parseNumericField(req.body.price, "Price");
    if (req.body.offer_price !== undefined) req.body.offer_price = parseNumericField(req.body.offer_price, "Offer Price");
    if (req.body.rent_amount !== undefined) req.body.rent_amount = parseNumericField(req.body.rent_amount, "Rent Amount");
    if (req.body.deposit_amount !== undefined) req.body.deposit_amount = parseNumericField(req.body.deposit_amount, "Deposit Amount");
    if (req.body.area !== undefined) req.body.area = parseNumericField(req.body.area, "Area");
    if (req.body.bedrooms !== undefined) req.body.bedrooms = parseNumericField(req.body.bedrooms, "Bedrooms");
    if (req.body.bathrooms !== undefined) req.body.bathrooms = parseNumericField(req.body.bathrooms, "Bathrooms");
    if (req.body.parking !== undefined) req.body.parking = parseNumericField(req.body.parking, "Parking");
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message
    });
  }

  Property.updateProperty(id, req.body, (err, result) => {
    if (err) {
      console.error('🔴 DB Error updating property:', err);
      return res.status(500).json({
        message: "Error updating property",
        error: err.message,
      });
    }

    res.status(200).json({
      message: "Property Updated Successfully",
    });
  });
};

const getPropertyById = (req, res) => {
  const { id } = req.params;

  Property.getPropertyById(id, (err, result) => {
    if (err) {
      console.error('🔴 DB Error fetching property by ID:', err);
      return res.status(500).json({
        message: "Error fetching property",
        error: err.message,
      });
    }
    
    if (!result || result.length === 0) {
      return res.status(404).json({ message: "Property not found" });
    }

    res.status(200).json(result[0]);
  });
};

module.exports = {
  addProperty,
  getAllProperties,
  deleteProperty,
  updateProperty,
  getPropertyById,
};