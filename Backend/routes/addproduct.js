const express = require('express');
const router = express.Router();
const multer = require('multer');
const cloudinary = require('../cloudinary');

const Product = require('../Model/ProductsSchema');
const Sells = require('../Model/SellsSchema');

const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post('/', upload.fields([
  { name: 'Product_img1', maxCount: 1 },
  { name: 'Product_img2', maxCount: 1 },
  { name: 'Product_img3', maxCount: 1 },
]), async (req, res) => {
  try {
    const { sellerId, productName, price, storedQuantity, district, division, description, category, color} = req.body;
    // const size = JSON.parse(req.body.size);
    // const color = req.body.color.split(','); // Assuming colors are provided as a comma-separated string
    // const sizesDimensions = JSON.parse(req.body.sizesDimensions); 
    // const sizesOther = req.body.sizesOther.split(','); 
    const Img1 = req.files['Product_img1'][0];
    const Img2 = req.files['Product_img2'][0];
    const Img3 = req.files['Product_img3'][0];

    let img1_url, img2_url, img3_url;

    async function run(img) {
      try {
        const response = await cloudinary.uploader.upload(img);
        return response.url;
      } catch (error) {
        console.error('Error uploading to Cloudinary:', error);
        return null;
      }
    }

    Promise.all([run(Img1.path), run(Img2.path), run(Img3.path)])
      .then((results) => {
        img1_url = results[0];
        img2_url = results[1];
        img3_url = results[2];

        const newProduct = new Product({
          productName,
          price,
          storedQuantity,
          district,
          division,
          description,
          category,
          // size: {
          //   dimension: sizesDimensions,
          //   other: sizesOther,
          // },
          // size,
          color,
          Product_img1: img1_url,
          Product_img2: img2_url,
          Product_img3: img3_url,
        });

        console.log(newProduct);

        return newProduct.save();
      })

      .then((savedProduct) => {
        const productId = savedProduct._id; // Access the product ID
        console.log('New product saved with ID:', productId);

        const sellsRecord = new Sells({
          sellerId,
          productId: productId, // Add the product ID to the Sells record
        });

        return sellsRecord.save();
      })

      .then(() => {
          console.log('Data saved successfully');
      })
      .catch((error) => {
          console.error('Error:', error);
      });

    res.status(200).json({ message: 'Data saved successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
