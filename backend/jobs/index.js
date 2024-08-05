const cron = require("node-cron");

const productJobs = require("./productJobs");

const init = () => {
  cron.schedule("*/30 * * * *", () => {
    // cron.schedule("* * * * *", () => {
    console.log("Cron job running every 30 minutes");
    productJobs.trackPrices();
  });
};

module.exports = {
  init,
};
