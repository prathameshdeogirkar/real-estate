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

const addProperty = async (req, res) => {
  try {
    if (req.body.price !== undefined) req.body.price = parseNumericField(req.body.price, "Price");
    if (req.body.offer_price !== undefined) req.body.offer_price = parseNumericField(req.body.offer_price, "Offer Price");
    if (req.body.rent_amount !== undefined) req.body.rent_amount = parseNumericField(req.body.rent_amount, "Rent Amount");
    if (req.body.deposit_amount !== undefined) req.body.deposit_amount = parseNumericField(req.body.deposit_amount, "Deposit Amount");
    if (req.body.area !== undefined) req.body.area = parseNumericField(req.body.area, "Area");
    if (req.body.bedrooms !== undefined) req.body.bedrooms = parseNumericField(req.body.bedrooms, "Bedrooms");
    if (req.body.bathrooms !== undefined) req.body.bathrooms = parseNumericField(req.body.bathrooms, "Bathrooms");

    const property = await Property.create(req.body);
    res.status(201).json({
      message: "Property Added Successfully",
      property
    });
  } catch (error) {
    console.error('🔴 DB Error adding property:', error);
    res.status(500).json({
      message: "Error adding property",
      error: error.message,
    });
  }
};

const getAllProperties = async (req, res) => {
  try {
    const properties = await Property.find();
    res.status(200).json(properties);
  } catch (error) {
    console.error('🔴 DB Error fetching properties:', error);
    res.status(500).json({
      message: "Error fetching properties",
      error: error.message,
    });
  }
};

const deleteProperty = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Property.findByIdAndDelete(id);
    if (deleted) {
    } else {
    }
    res.status(200).json({
      message: "Property Deleted Successfully",
    });
  } catch (error) {
    console.error('🔴 DB Error deleting property:', error);
    res.status(500).json({
      message: "Error deleting property",
      error: error.message,
    });
  }
};

const updateProperty = async (req, res) => {
  try {
    const { id } = req.params;

    if (req.body.price !== undefined) req.body.price = parseNumericField(req.body.price, "Price");
    if (req.body.offer_price !== undefined) req.body.offer_price = parseNumericField(req.body.offer_price, "Offer Price");
    if (req.body.rent_amount !== undefined) req.body.rent_amount = parseNumericField(req.body.rent_amount, "Rent Amount");
    if (req.body.deposit_amount !== undefined) req.body.deposit_amount = parseNumericField(req.body.deposit_amount, "Deposit Amount");
    if (req.body.area !== undefined) req.body.area = parseNumericField(req.body.area, "Area");
    if (req.body.bedrooms !== undefined) req.body.bedrooms = parseNumericField(req.body.bedrooms, "Bedrooms");
    if (req.body.bathrooms !== undefined) req.body.bathrooms = parseNumericField(req.body.bathrooms, "Bathrooms");

    const updated = await Property.findByIdAndUpdate(id, req.body, { new: true });
    if (updated) {
    } else {
    }
    res.status(200).json({
      message: "Property Updated Successfully",
    });
  } catch (error) {
    console.error('🔴 DB Error updating property:', error);
    res.status(500).json({
      message: "Error updating property",
      error: error.message,
    });
  }
};

const getPropertyById = async (req, res) => {
  try {
    const { id } = req.params;
    const property = await Property.findById(id);
    
    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    res.status(200).json(property);
  } catch (error) {
    console.error('🔴 DB Error fetching property by ID:', error);
    res.status(500).json({
      message: "Error fetching property",
      error: error.message,
    });
  }
};

module.exports = {
  addProperty,
  getAllProperties,
  deleteProperty,
  updateProperty,
  getPropertyById,
};