const puppeteer = require('puppeteer');
const { Cluster } = require('puppeteer-cluster');

async function scrapeResults(searchTerm, pageNum) {
  try {

    // Working as of: 2020-05-27

    searchTerm = searchTerm.replace(/_/g, '+').trim();

    const cluster = await Cluster.launch({
      concurrency: Cluster.CONCURRENCY_CONTEXT,
      maxConcurrency: 2
    });

    const products = [];

    const extractProductInfo = async ({ page, data }) => {
      const { url } = data;
      await page.goto(url, {
        waitUntil: 'domcontentloaded'
      });
      const productImgUrl = await page.evaluate(() => {
        return document.getElementById('landingImage').src.trim();
      });
      const productTitle = await page.evaluate(() => {
        return document.getElementById('productTitle').innerHTML.trim();
      });
      const productPrice = await page.evaluate(() => {
        return document.getElementById('priceblock_ourprice').innerHTML.trim();
      });
      const productListPrice = await page.evaluate(() => 
        Array.from(document.getElementsByClassName('priceBlockStrikePriceString a-text-strike'), element => element.textContent.trim()));
      const productSavings = await page.evaluate(() => 
        Array.from(document.getElementsByClassName('a-span12 a-color-price a-size-base priceBlockSavingsString'), element => element.textContent.trim()));
      

      const product = {
        productUrl: url,
        productImgUrl,
        productTitle,
        productPrice,
        productListPrice: productListPrice.length > 0 ? productListPrice[0] : null,
        productSavings: productSavings.length > 0 ? productSavings[0] : null
      };
      products.push(product);
    };

    const filterLinks = (links) => {
      var seen = {};
      var filterdLinks = links.filter((link) => {
        return link.indexOf('/gp/') === -1;
      });
      return filterdLinks.filter((link) => {
        return seen.hasOwnProperty(link) ? false : (seen[link] = true);
      });
    };

    await cluster.task(async ({ page, data}) => {
      const { searchTerm, pageNum } = data;
      const url = `https://www.amazon.com/s?k=${searchTerm}&page=${pageNum}`;
      await page.goto(url, {
        waitUntil: 'domcontentloaded'
      });

      const productLinks = await page.evaluate(() => 
        Array.from(document.getElementsByClassName('a-link-normal a-text-normal'), element => element.href));
      const filterdLinks = filterLinks(productLinks);

      for (var i = 0; i < filterdLinks.length; i++) {
        var currentUrl = filterdLinks[i].trim();
        cluster.queue({
          url: currentUrl
        }, extractProductInfo);
      }
    });

    cluster.queue({
      searchTerm,
      pageNum
    });

    await cluster.idle();
    await cluster.close();

    return products;

  } catch (err) {
    console.log(err);
    return null;
  }
}

module.exports = {
  scrapeResults
};