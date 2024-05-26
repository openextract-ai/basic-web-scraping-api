import 'dotenv/config'
import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import {scrapeSingleUrl} from "./scrape/basic";
import {scrapeSingleUrlWithBrowser} from "./scrape/headless";

const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.get('/scrape', async (c) => {
  const { url, take_screenshot, scroll, use_browser } = c.req.query();

  if (!url) {
    return c.text('url is required');
  }

  if (!use_browser && take_screenshot || !use_browser && scroll) {
    return c.text('Cannot use take_screenshot or scroll without use_browser');
  }

  if (use_browser) {
    const take_screenshot_bool = take_screenshot === 'true'
    const scroll_bool = scroll === 'true'
    const result = await scrapeSingleUrlWithBrowser(url, take_screenshot_bool, scroll_bool)
    return c.json(result)
  }
  const result = await scrapeSingleUrl(url)
  return c.json(result)
})

const port = 3000
console.log(`Server is running on port ${port}`)

serve({
  fetch: app.fetch,
  port
})
