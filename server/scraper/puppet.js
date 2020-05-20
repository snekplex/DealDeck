const puppeteer = require('puppeteer');

async function scrapeResults(searchTerm, pageNum) {
  try {
    const url = `https://www.amazon.com/s?k=${searchTerm}&page=${pageNum}`;
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    // Working as of: 2020-05-18

    const productTitles = await page.evaluate(() => Array.from(document.getElementsByClassName('a-size-medium a-color-base a-text-normal'), element => element.textContent));
    const productRatings = await page.evaluate(() => Array.from(document.getElementsByClassName('a-icon-alt'), element => element.textContent));
    const productPriceWhole = await page.evaluate(() => Array.from(document.getElementsByClassName('a-price-whole'), element => element.textContent));
    const productPriceDec = await page.evaluate(() => Array.from(document.getElementsByClassName('a-price-fraction'), element => element.textContent));
    const productOldPrice = await page.evaluate(() => Array.from(document.getElementsByClassName('a-offscreen'), element => element.textContent));
    const productLinks = await page.evaluate(() => Array.from(document.getElementsByClassName('a-link-normal a-text-normal'), element => element.href));

    const filterLinks = (links) => {
      var seen = {};
      var filterdLinks = links.filter((link) => {
        return link.indexOf('/gp/') === -1;
      });
      return filterdLinks.filter((link) => {
        return seen.hasOwnProperty(link) ? false : (seen[link] = true);
      });
    };

    const filterdLinks = filterLinks(productLinks);

    const searchItems = {
      productTitles,
      productRatings,
      productPriceWhole,
      productPriceDec,
      productOldPrice,
      filterdLinks
    };

    await browser.close();

    return searchItems;

  } catch (err) {
    console.log(err);
    return null;
  }
}

module.exports = {
  scrapeResults
};