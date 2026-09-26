import { renderToStaticMarkup } from 'react-dom/server';
import { Emailer, type EmailerProps } from './templates/Emailer';
import { color } from './tokens';

export { Emailer };
export type { EmailerProps };

export interface RenderEmailOptions {
  /** Wrap in a full HTML document (default) or return the bare 600px table. */
  document?: boolean;
  /** <title> for the document wrapper. */
  title?: string;
}

/**
 * Render the emailer to paste-ready HTML for an ESP. Everything is inline;
 * there is no stylesheet to lose. Throws on a data: logo URL because Gmail
 * and Outlook will not display it.
 */
export function renderEmail(props: EmailerProps, options: RenderEmailOptions = {}): string {
  if (/^data:/i.test(props.logoUrl)) {
    throw new Error('[tpcl] renderEmail: logoUrl is a data: URI — Gmail and Outlook will not render it. Host the logo and pass an https URL.');
  }
  if (!/^https:\/\//i.test(props.logoUrl)) {
    console.warn('[tpcl] renderEmail: logoUrl should be an absolute https URL for email clients.');
  }
  const table = renderToStaticMarkup(<Emailer {...props} />);
  if (options.document === false) return table;
  const title = escapeHtml(options.title ?? 'Travis Paul Consulting');
  return `<!doctype html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="x-apple-disable-message-reformatting">
<title>${title}</title>
</head>
<body style="margin:0;padding:0;background:${color.white};">
<center>
${table}
</center>
</body>
</html>
`;
}

function escapeHtml(s: string): string {
  return s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]!);
}
