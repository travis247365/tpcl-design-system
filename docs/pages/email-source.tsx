import { renderEmail } from '../../src/email';
import { emailerExample } from './templates';

/**
 * Hidden route used by `npm run export`: renders the example emailer to
 * paste-ready HTML in the browser. The logo URL comes from ?logo=… (the export
 * script passes TPCL_LOGO_URL), because email clients need a hosted https URL.
 */
export function EmailSourcePage() {
  const query = new URLSearchParams(window.location.hash.split('?')[1] ?? '');
  const logoUrl = query.get('logo') ?? 'https://example.com/tpcl/tpc_white.png';
  let html: string;
  try {
    html = renderEmail({ logoUrl, ...emailerExample });
  } catch (e) {
    html = String(e);
  }
  return <pre id="email-source" style={{ whiteSpace: 'pre-wrap', fontSize: 12, padding: 16, margin: 0 }}>{html}</pre>;
}
