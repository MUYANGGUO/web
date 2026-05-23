import type { Metadata } from 'next';
import { getAllPhotos } from '@/lib/photos';
import { PhotoGrid } from '@/components/photo-grid';

export const metadata: Metadata = {
  title: 'Photos',
  description: 'Photographs.',
  alternates: { canonical: '/photos/' },
};

export default async function PhotosPage() {
  const photos = await getAllPhotos();
  return (
    <div className="space-y-6">
      <header className="flex items-baseline justify-between border-b border-border pb-3">
        <h1 className="text-3xl font-medium tracking-tight">Photos</h1>
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
          {photos.length} {photos.length === 1 ? 'frame' : 'frames'}
        </p>
      </header>
      {photos.length === 0 ? (
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
          Drop JPG/PNG files into <code className="rounded bg-subtle px-1.5 py-0.5">public/img/photography/</code> to populate.
        </p>
      ) : (
        <PhotoGrid photos={photos} />
      )}
    </div>
  );
}
