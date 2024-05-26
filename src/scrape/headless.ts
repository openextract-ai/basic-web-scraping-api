import {SingleScrapeResult} from "../schema";
import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
import AdBlockerPlugin from "puppeteer-extra-plugin-adblocker";
import {convert_html_to_markdown} from "../parse/markdown";
import * as cheerio from 'cheerio'



export async function scrapeSingleUrlWithBrowser(url: string, take_screenshot: boolean, scroll: boolean): Promise<SingleScrapeResult> {
  puppeteer.use(StealthPlugin())
  puppeteer.use(AdBlockerPlugin())

  const browser = await puppeteer.connect({
    browserWSEndpoint: `${process.env.BROWSER_URL}`,
  });

  const page = await browser.newPage();
  await page.goto(url, { waitUntil: "networkidle2" });

  const content = await page.content();

  if (scroll) {
    await page.evaluate(async () => {
      await new Promise((resolve) => {
        let totalHeight = 0;
        const distance = 100;
        const timer = setInterval(() => {
          const scrollHeight = document.body.scrollHeight;
          window.scrollBy(0, distance);
          totalHeight += distance;
          if (totalHeight >= scrollHeight) {
            clearInterval(timer);
            resolve(null);
          }
        }, 100);
      });
    });
  }
  let img = ""

  if (take_screenshot) {
    img = await page.screenshot({ encoding: 'base64', fullPage: true });
  }
  const $ = cheerio.load(content);
  const html = $('body').html();

  let markdown = ''

  if (html) {
    markdown = await convert_html_to_markdown(html)
  }

  await browser.close();

  return {
    status: 'ok',
    data: {
      url,
      content: markdown,
      screenshot: img,
      markdown,
    }
  };
}