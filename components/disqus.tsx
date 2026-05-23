'use client';

import { useEffect, useRef, useState } from 'react';
import { site } from '@/lib/site';

interface Props {
  identifier: string;
  title: string;
  url: string;
}

export function Disqus({ identifier, title, url }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting) && !loaded) {
          setLoaded(true);
          io.disconnect();
        }
      },
      { rootMargin: '300px' }
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, [loaded]);

  useEffect(() => {
    if (!loaded) return;
    (window as unknown as Record<string, unknown>).disqus_config = function (this: { page: Record<string, string> }) {
      this.page.url = url;
      this.page.identifier = identifier;
      this.page.title = title;
    };
    const s = document.createElement('script');
    s.src = `https://${site.disqus.shortname}.disqus.com/embed.js`;
    s.setAttribute('data-timestamp', String(Date.now()));
    s.async = true;
    document.body.appendChild(s);
    return () => {
      s.remove();
    };
  }, [loaded, identifier, title, url]);

  return (
    <section className="mt-16 border-t border-border pt-8">
      <h2 className="mb-4 font-display text-lg font-semibold">Comments</h2>
      <div ref={ref} id="disqus_thread" />
    </section>
  );
}
