import TurndownService from 'turndown'

export async function convert_html_to_markdown(html: string): Promise<string> {
  const turnDownService = new TurndownService()
  return turnDownService.turndown(html)
}