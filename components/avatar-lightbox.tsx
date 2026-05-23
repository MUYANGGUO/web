'use client';

import * as Dialog from '@radix-ui/react-dialog';
import Image from 'next/image';
import { X } from 'lucide-react';
import { site } from '@/lib/site';

interface Props {
  size?: 'sm' | 'lg';
}

export function AvatarLightbox({ size = 'lg' }: Props) {
  const dim = size === 'lg' ? 'h-20 w-20 md:h-28 md:w-28' : 'h-20 w-20';
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button
          aria-label="Open profile picture"
          className={`group relative ${dim} shrink-0 overflow-hidden border border-border outline-none transition focus-visible:ring-2 focus-visible:ring-accent`}
        >
          <Image
            src={site.avatar}
            alt={site.name}
            fill
            sizes="112px"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-bg/85 backdrop-blur-sm animate-fade-in" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-[88vw] max-w-[480px] -translate-x-1/2 -translate-y-1/2 border border-border bg-card p-4 animate-fade-in">
          <Dialog.Title className="sr-only">{site.name}</Dialog.Title>
          <div className="relative aspect-square w-full overflow-hidden border border-border">
            <Image
              src={site.avatar}
              alt={site.name}
              fill
              sizes="480px"
              className="object-cover"
              priority
            />
          </div>
          <div className="mt-3 flex items-center justify-between">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">{site.name}</p>
            <Dialog.Close asChild>
              <button
                aria-label="Close"
                className="inline-flex h-7 w-7 items-center justify-center border border-border text-muted transition hover:text-fg"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
