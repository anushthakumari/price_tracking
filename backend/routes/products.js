const express = require("express");
const mongoose = require("mongoose");
const { check, validationResult } = require("express-validator");

const Product = require("../models/Product");
const UserProduct = require("../models/UserProduct");
const PriceHistory = require("../models/PriceHistory");
const authMiddleware = require("../middleware/authMiddleware");
const utils = require("../helpers/utils");

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  [check("productUrl").isURL().withMessage("Invalid URL format").trim()],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { productUrl } = req.body;

    const productResp = await utils.fethFromUrl(productUrl);

    console.log(productResp);

    if (!productResp) {
      return res.status(400).json({
        errors: [
          { email: "we couldnt fetch data the url. Please check the url." },
        ],
      });
    }

    try {
      const mongoUserId = new mongoose.Types.ObjectId(req.user.id);

      const pr = await Product.findOne({
        productName: productResp.productName,
      });

      if (pr) {
        const userProductEntry = await UserProduct.findOne({
          userId: mongoUserId,
          productId: new mongoose.Types.ObjectId(pr._id),
        });

        if (userProductEntry) {
          return res.send({ message: "Product is already in monitoring!" });
        }

        const up = UserProduct({
          userId: mongoUserId,
          productId: new mongoose.Types.ObjectId(pr._id),
        });

        await up.save();

        return res.send({ message: "Product added for monitoring!" });
      }

      const product = new Product({
        productUrl: productResp.scrapeUrl,
        productName: productResp.productName,
        productSource: productResp.productSource,
        currentPrice: productResp.currentPrice,
        imageSrc: productResp.imageSrc,
        currencySymbol: productResp.currencySymbol,
        lastChecked: new Date(),
        status: true,
      });

      const savedPro = await product.save();
      const mongoProductId = new mongoose.Types.ObjectId(savedPro._id);

      const up = UserProduct({
        userId: mongoUserId,
        productId: mongoProductId,
      });

      await up.save();

      const ph = new PriceHistory({
        productId: mongoProductId,
        price: productResp.currentPrice,
        timestamp: new Date(),
      });

      await ph.save();

      return res.send({ message: "Product added for monitoring!" });
    } catch (error) {
      console.error(error.message);
      res.status(500).send({ message: "Something went wrong!" });
    }
  }
);

router.get("/", authMiddleware, async (req, res) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.user.id);

    const userProducts = await UserProduct.find({ userId }).populate(
      "productId"
    );

    return res.send(userProducts);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Something went wrong!" });
  }
});

router.delete("/:productId", authMiddleware, async (req, res, next) => {
  const userId = new mongoose.Types.ObjectId(req.user.id);
  const productId = new mongoose.Types.ObjectId(req.params.productId);

  await UserProduct.deleteOne({ userId, productId });

  res.send({ message: "product removed!" });
});

router.get("/:productId/prices", authMiddleware, async (req, res, next) => {
  try {
    const productId = new mongoose.Types.ObjectId(req.params.productId);

    const productDetails = await Product.findById(productId);
    const products = await PriceHistory.find({ productId });

    return res.send({
      productDetails,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Something went wrong!" });
  }
});

module.exports = router;
