import { unimplemented } from "jsr:@std/assert/unimplemented";

export function textForInHtmlAttribute(text: string, opts = {
  escapedQuotes: `"'` as `"'` | `"` | `'`
}): string {
  return unimplemented();
}

export function textAsChildOfTag(text: string, tag?: string): string {
  let encoded = text;

  if (tag == 'script') {
    return encoded = encoded.replaceAll('</script', '<\/script');
  }

  if (tag == 'style') {
    
  }

  encoded = encoded.replaceAll('&', '&amp;');

  if (tag != 'textarea' && tag != 'title') {
    encoded = encoded.replaceAll('<', '&gt;');
  }

  encoded = encoded.replaceAll(']]>', ']]&lt;');

  return encoded;
}

export function textToHtml
