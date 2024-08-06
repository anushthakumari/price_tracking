const mongoose = require("mongoose");

const utils = require("../helpers/utils");
const PriceHistory = require("../models/PriceHistory");
const UserProduct = require("../models/UserProduct");
const mailer = require("../helpers/mailer");
const Product = require("../models/Product");

const trackPrices = async () => {
  try {
    //get products which has subscribers
    const products = await UserProduct.find().populate("productId").exec();

    for (const product of products) {
      const p = product.productId;

      const productResp = await utils.fethFromUrl(p.productUrl);

      if (!productResp) {
        continue;
      }

      console.log("Processing : ", productResp);

      const mongoProductId = new mongoose.Types.ObjectId(p._id);

      //finding prices that are less than current price
      const priceHistories = await PriceHistory.find({
        productId: mongoProductId,
        price: { $lte: productResp.currentPrice },
      }).exec();

      //if we couldn't found product price that is less than current price that means
      //this price is all time lesser and we can send notification.
      if (priceHistories.length === 0) {
        console.log("scraped price is lesser!");

        const userProducts = await UserProduct.find({
          productId: mongoProductId,
        })
          .populate("userId")
          .exec();

        const emails = [];

        for (const up of userProducts) {
          const email = up.userId.email;
          emails.push(email);
        }

        console.log(`subscribers for the product ${productResp.productName}`);
        console.log(emails);

        if (emails.length > 0) {
          await mailer.sendEmail(
            emails,
            "Price Tracker - We've got something",
            productResp.productName + "'s price is lower!! hurry!!"
          );
        }
      }

      const ph = new PriceHistory({
        productId: mongoProductId,
        price: productResp.currentPrice,
        timestamp: new Date(),
      });

      await ph.save();

      Product.findByIdAndUpdate(mongoProductId, {
        lastChecked: new Date(),
        currentPrice: productResp.currentPrice,
      });

      console.log(`product ${productResp.productName} added to history!`);

      utils.delay(1000);
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  trackPrices,
};
