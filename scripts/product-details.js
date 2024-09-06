import * as fs from "fs";
const productDetails = process.env.NAMI_PRODUCT_DETAILS;

fs.writeFile(
  "./examples/data/product-details.json",
  productDetails,
  function (err) {
    if (err) throw err;
    console.log('Product Details added successfully!');
  }
);
