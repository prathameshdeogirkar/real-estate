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
    console.log("➡️ [properties] CREATE request payload received:", req.body.title);
    if (req.body.price !== undefined) req.body.price = parseNumericField(req.body.price, "Price");
    if (req.body.offer_price !== undefined) req.body.offer_price = parseNumericField(req.body.offer_price, "Offer Price");
    if (req.body.rent_amount !== undefined) req.body.rent_amount = parseNumericField(req.body.rent_amount, "Rent Amount");
    if (req.body.deposit_amount !== undefined) req.body.deposit_amount = parseNumericField(req.body.deposit_amount, "Deposit Amount");
    if (req.body.area !== undefined) req.body.area = parseNumericField(req.body.area, "Area");
    if (req.body.bedrooms !== undefined) req.body.bedrooms = parseNumericField(req.body.bedrooms, "Bedrooms");
    if (req.body.bathrooms !== undefined) req.body.bathrooms = parseNumericField(req.body.bathrooms, "Bathrooms");

    const property = await Property.create(req.body);
    console.log(`🟢 [properties] Document successfully inserted into MongoDB! ID: ${property._id}`);
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
    console.log("➡️ [properties] READ request for all documents");
    const properties = await Property.find();
    console.log(`🟢 [properties] Found ${properties.length} documents in MongoDB`);
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
    console.log(`➡️ [properties] DELETE request for ID: ${id}`);
    const deleted = await Property.findByIdAndDelete(id);
    if (deleted) {
      console.log(`🟢 [properties] Document successfully deleted! ID: ${id}`);
    } else {
      console.log(`⚠️ [properties] Document to delete not found: ID: ${id}`);
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
    console.log(`➡️ [properties] UPDATE request for ID: ${id}`);

    if (req.body.price !== undefined) req.body.price = parseNumericField(req.body.price, "Price");
    if (req.body.offer_price !== undefined) req.body.offer_price = parseNumericField(req.body.offer_price, "Offer Price");
    if (req.body.rent_amount !== undefined) req.body.rent_amount = parseNumericField(req.body.rent_amount, "Rent Amount");
    if (req.body.deposit_amount !== undefined) req.body.deposit_amount = parseNumericField(req.body.deposit_amount, "Deposit Amount");
    if (req.body.area !== undefined) req.body.area = parseNumericField(req.body.area, "Area");
    if (req.body.bedrooms !== undefined) req.body.bedrooms = parseNumericField(req.body.bedrooms, "Bedrooms");
    if (req.body.bathrooms !== undefined) req.body.bathrooms = parseNumericField(req.body.bathrooms, "Bathrooms");

    const updated = await Property.findByIdAndUpdate(id, req.body, { new: true });
    if (updated) {
      console.log(`🟢 [properties] Document successfully updated! ID: ${id}`);
    } else {
      console.log(`⚠️ [properties] Document to update not found: ID: ${id}`);
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
    console.log(`➡️ [properties] READ request for single document ID: ${id}`);
    const property = await Property.findById(id);
    
    if (!property) {
      console.log(`⚠️ [properties] Document not found: ID: ${id}`);
      return res.status(404).json({ message: "Property not found" });
    }

    console.log(`🟢 [properties] Found document for ID: ${id}`);
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