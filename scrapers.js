const puppeteer = require("puppeteer");

async function scrapeProduct(url) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);

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

    return { title, price, imageSrc };
  });

  console.log(productData);
}

scrapeProduct(
  "https://www.amazon.com/Portable-Stroller-12000mAh-Operated-Flexible/dp/B08ZNBTVSG/ref=sr_1_1?dib=eyJ2IjoiMSJ9.4n1QfFNXvbnKRxds-Zo190HqCBSKsnjVMRfUixKCwk4lWqDgESgWa-_G_qRQ7Sr_Mirv6GDaWuCAizpfOwVER7w7r26-kr8ZsZxv76lkbyQ.aD0alT1ANX8q-OyRyy6SqmfVou8Xr5o2J0A6LsKXM5A&dib_tag=se&keywords=stroller%2Bfan%2Bfrizcol&qid=1720139460&refinements=p_123%3A956916&rnid=85457740011&s=baby-products&sr=1-1&th=1"
);
