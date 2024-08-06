const cheerio = require("cheerio");
const axios = require("axios");

const parsePrice = (amount) => parseFloat(Number(amount.replace(/,/g, "")));

const getHTML = async (url) => {
  try {
    const config = {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
      },
    };

    const { data: html } = await axios.get(url, config);
    return cheerio.load(html);
  } catch (error) {
    console.error("Error fetching the HTML");
    console.log(error.response.status);
    throw error;
  }
};

const fethFromUrl = async (url, expected_price) => {
  const source = url.includes("amazon")
    ? "amazon"
    : url.includes("flipkart")
    ? "flipkart"
    : "";

  if (source === "amazon") {
    const $_parsed_html = await getHTML(url);

    const price = $_parsed_html(
      ".reinventPricePriceToPayMargin .a-price-whole"
    ).text();
    const name = $_parsed_html("#productTitle").text().trim();

    const priceInt = parsePrice(price);

    return {
      productName: name,
      currentPrice: priceInt,
      productSource: source,
    };
  }
};

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

module.exports = {
  fethFromUrl,
  delay,
};
