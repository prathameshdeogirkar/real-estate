const db = require("../config/db");

const addProperty = (data, callback) => {
  const sql = `
    INSERT INTO properties 
    (title, type, price, offer_price, address, description, image, property_type, rent_amount, deposit_amount, images, area, bedrooms, bathrooms, parking, amenities, nearby_places, map_location)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [
      data.title,
      data.type,
      data.price === "" || data.price == null ? null : data.price,
      data.offer_price === "" || data.offer_price == null ? null : data.offer_price,
      data.address,
      data.description,
      data.image,
      data.property_type || "For Sale",
      data.rent_amount === "" || data.rent_amount == null ? null : data.rent_amount,
      data.deposit_amount === "" || data.deposit_amount == null ? null : data.deposit_amount,
      data.images ? JSON.stringify(data.images) : null,
      data.area || null,
      data.bedrooms || null,
      data.bathrooms || null,
      data.parking || null,
      data.amenities ? JSON.stringify(data.amenities) : null,
      data.nearby_places ? JSON.stringify(data.nearby_places) : null,
      data.map_location || null
    ],
    callback
  );
};

const getAllProperties = (callback) => {
  const sql = "SELECT * FROM properties";

  db.query(sql, callback);
};

const deleteProperty = (id, callback) => {
  const sql = "DELETE FROM properties WHERE id = ?";

  db.query(sql, [id], callback);
};

const updateProperty = (id, data, callback) => {
  const sql = `
    UPDATE properties
    SET title=?, type=?, price=?, offer_price=?, address=?, description=?, image=?, property_type=?, rent_amount=?, deposit_amount=?, images=?, area=?, bedrooms=?, bathrooms=?, parking=?, amenities=?, nearby_places=?, map_location=?
    WHERE id=?
  `;

  db.query(
    sql,
    [
      data.title,
      data.type,
      data.price === "" || data.price == null ? null : data.price,
      data.offer_price === "" || data.offer_price == null ? null : data.offer_price,
      data.address,
      data.description,
      data.image,
      data.property_type || "For Sale",
      data.rent_amount === "" || data.rent_amount == null ? null : data.rent_amount,
      data.deposit_amount === "" || data.deposit_amount == null ? null : data.deposit_amount,
      data.images ? JSON.stringify(data.images) : null,
      data.area || null,
      data.bedrooms || null,
      data.bathrooms || null,
      data.parking || null,
      data.amenities ? JSON.stringify(data.amenities) : null,
      data.nearby_places ? JSON.stringify(data.nearby_places) : null,
      data.map_location || null,
      id,
    ],
    callback
  );
};

const getPropertyById = (id, callback) => {
  const sql = "SELECT * FROM properties WHERE id = ?";

  db.query(sql, [id], callback);
};

module.exports = {
  addProperty,
  getAllProperties,
  deleteProperty,
  updateProperty,
  getPropertyById,
};