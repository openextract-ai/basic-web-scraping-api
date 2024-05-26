
export interface SingleScrapeData {
  url: String;
  screenshot: String;
  content: String;
  markdown: String;
}

export interface SingleScrapeResult {
  status: String;
  data: SingleScrapeData
}