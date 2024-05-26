Basic Web Scraping API (w/ Hono)
======================

This is a basic web scraping API that uses Hono to scrape a website and return the results in HTML and Markdown.

Using puppeteeer the API will also provide a screenshot of the website.

## Installation

```
npm install
npm run dev
```

```
open http://localhost:3000
```


## Usage


Basic usage:
```
curl http://localhost:3000/scrape?url=https://www.google.com
```


With Browser:
```
curl http://localhost:3000/scrape?url=https://www.google.com&use_browser=true
```


With Browser and Screenshot:
```
curl http://localhost:3000/scrape?url=https://www.google.com&use_browser=true&take_screenshot=true
```
