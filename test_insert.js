const db = require("./config/db");

const data = {
  title: 'test',
  type: 'Row House',
  price: null,
  offer_price: null,
  address: 'test',
  description: 'test',
  image: 'test',
  property_type: 'For Rent',
  rent_amount: 15000,
  deposit_amount: 50000
};

const sql = `
  INSERT INTO properties 
  (title, type, price, offer_price, address, description, image, property_type, rent_amount, deposit_amount)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
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
  ],
  (err, result) => {
    if (err) {
      console.error("DB Error:", err);
    } else {
      console.log("Success:", result);
    }
    process.exit();
  }
);
