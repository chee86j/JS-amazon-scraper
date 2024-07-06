const puppeteer = require("puppeteer");

async function scrapeProduct(url) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: "domcontentloaded" });

  /* page.evaluate() method is used to run a script in the context of the page instead of the more complicated 'page.$x'
     requiring XPath expressions. This method can be used to extract data from the page, but it can't return DOM elements.
     The choice between using page.evaluate() and page.$x() depends on the complexity of the script you want to run. For most
     cases, page.evaluate() is the best choice. However, if you need to extract a single element, page.$x() is more suitable.
  */
  const productData = await page.evaluate(() => {
    const title = document.getElementById("productTitle")
      ? document.getElementById("productTitle").innerText.trim()
      : "Title not found";
    const price = document.querySelector(".a-price")
      ? document.querySelector(".a-price").innerText.trim()
      : "Price not found";
    const imageSrc = document.getElementById("landingImage")
      ? document.getElementById("landingImage").src
      : "Image source not found";
    const averageRating = document.getElementById("acrPopover")
      ? document.getElementById("acrPopover").title
      : "Rating not found";
    const reviewCount = document.getElementById("acrCustomerReviewText")
      ? document.getElementById("acrCustomerReviewText").innerText.trim()
      : "Review count not found";

    return { title, price, imageSrc, averageRating, reviewCount };
  });

  console.log(productData);

  await browser.close();
}

// URL of the product
const productURL =
  "https://www.amazon.com/Portable-Stroller-12000mAh-Operated-Flexible/dp/B08ZNBTVSG";
scrapeProduct(productURL);
