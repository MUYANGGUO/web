import Script from 'next/script';
import { site } from '@/lib/site';

/**
 * Preserves the exact tracking code from the legacy Jekyll site:
 *  - Google Analytics gtag (UA-157817052-1)
 *  - Google AdSense (ca-pub-1032547897605308)
 */
export function Analytics() {
  const ga = site.analytics.gtagId;
  const ad = site.analytics.adsenseClient;
  return (
    <>
      <Script async src={`https://www.googletagmanager.com/gtag/js?id=${ga}`} strategy="afterInteractive" />
      <Script id="gtag-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${ga}');`}
      </Script>
      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
        data-ad-client={ad}
        strategy="afterInteractive"
      />
    </>
  );
}
