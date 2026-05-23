'use client';

import * as Dialog from '@radix-ui/react-dialog';
import Image from 'next/image';
import { useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import type { Photo } from '@/lib/photos';
import { useEffect } from 'react';

interface Props {
  photos: Photo[];
}

export function PhotoGrid({ photos }: Props) {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  useEffect(() => {
    if (openIdx === null) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === 'ArrowRight') setOpenIdx((i) => (i === null ? null : Math.min(photos.length - 1, i + 1)));
      if (e.key === 'ArrowLeft') setOpenIdx((i) => (i === null ? null : Math.max(0, i - 1)));
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [openIdx, photos.length]);

  const active = openIdx === null ? null : photos[openIdx];

  return (
    <>
      <div className="grid grid-cols-2 gap-px border border-border bg-border md:grid-cols-3 lg:grid-cols-4">
        {photos.map((p, i) => (
          <button
            key={p.src}
            onClick={() => setOpenIdx(i)}
            className="group relative aspect-square overflow-hidden bg-card outline-none focus-visible:ring-1 focus-visible:ring-fg"
            aria-label={p.filename}
          >
            <Image
              src={p.src}
              alt={p.filename}
              fill
              sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
            />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-2 bg-gradient-to-t from-black/70 via-black/0 to-transparent p-3 opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/90">
                {[p.camera, p.date].filter(Boolean).join(' · ') || p.filename}
              </p>
              {p.focalLength || p.aperture || p.shutterSpeed || p.iso ? (
                <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.14em] text-white/55">
                  {[
                    p.focalLength ? `${p.focalLength}mm` : null,
                    p.aperture ? `f/${p.aperture}` : null,
                    p.shutterSpeed,
                    p.iso ? `ISO ${p.iso}` : null,
                  ]
                    .filter(Boolean)
                    .join('  ·  ')}
                </p>
              ) : null}
            </div>
          </button>
        ))}
      </div>

      <Dialog.Root open={active !== null} onOpenChange={(o) => !o && setOpenIdx(null)}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-50 bg-bg/95 backdrop-blur-sm animate-fade-in" />
          <Dialog.Content className="fixed inset-0 z-50 flex animate-fade-in flex-col items-center justify-center p-4">
            <Dialog.Title className="sr-only">{active?.filename}</Dialog.Title>
            {active ? (
              <>
                <div className="relative flex max-h-[82vh] w-full max-w-[1200px] items-center justify-center">
                  <Image
                    src={active.src}
                    alt={active.filename}
                    width={active.width ?? 2400}
                    height={active.height ?? 1600}
                    className="h-auto max-h-[82vh] w-auto max-w-full object-contain"
                    priority
                  />
                </div>
                <div className="mt-4 flex w-full max-w-[1200px] flex-wrap items-center justify-between gap-3 font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                  <div className="flex flex-wrap gap-x-4 gap-y-1">
                    {active.camera ? <span className="text-fg">{active.camera}</span> : null}
                    {active.lens ? <span>{active.lens}</span> : null}
                    {active.date ? <span>{active.date}</span> : null}
                    {active.focalLength ? <span>{active.focalLength}mm</span> : null}
                    {active.aperture ? <span>f/{active.aperture}</span> : null}
                    {active.shutterSpeed ? <span>{active.shutterSpeed}</span> : null}
                    {active.iso ? <span>ISO {active.iso}</span> : null}
                  </div>
                  <span>
                    {openIdx! + 1} / {photos.length}
                  </span>
                </div>
              </>
            ) : null}

            <div className="absolute left-4 top-1/2 -translate-y-1/2">
              <button
                onClick={() => setOpenIdx((i) => (i === null ? null : Math.max(0, i - 1)))}
                disabled={openIdx === 0}
                aria-label="Previous"
                className="inline-flex h-10 w-10 items-center justify-center border border-border bg-bg/80 text-fg transition hover:bg-fg hover:text-bg disabled:opacity-30 disabled:hover:bg-bg/80 disabled:hover:text-fg"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
            </div>
            <div className="absolute right-4 top-1/2 -translate-y-1/2">
              <button
                onClick={() => setOpenIdx((i) => (i === null ? null : Math.min(photos.length - 1, i + 1)))}
                disabled={openIdx === photos.length - 1}
                aria-label="Next"
                className="inline-flex h-10 w-10 items-center justify-center border border-border bg-bg/80 text-fg transition hover:bg-fg hover:text-bg disabled:opacity-30 disabled:hover:bg-bg/80 disabled:hover:text-fg"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
            <Dialog.Close asChild>
              <button
                aria-label="Close"
                className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center border border-border bg-bg/80 text-fg transition hover:bg-fg hover:text-bg"
              >
                <X className="h-4 w-4" />
              </button>
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}
