import {gotScraping} from "got-scraping";
import {SingleScrapeResult} from "../schema";
import {convert_html_to_markdown} from "../parse/markdown";
import * as cheerio from 'cheerio'


export async function scrapeSingleUrl(url: string): Promise<SingleScrapeResult> {
  const proxyUrl = `${process.env.PROXY_URL}`
  const { body: content } = await gotScraping.get({
    url: url,
    proxyUrl,
  })

  const $ = cheerio.load(content);
  const html = $('body').html();

  let markdown = ''

  if (html) {
    markdown = await convert_html_to_markdown(html)
  }

  return {
    status: 'ok',
    data: {
      url,
      content: markdown,
      screenshot: '',
      markdown,
    }
  };
}