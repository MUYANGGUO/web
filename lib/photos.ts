import fs from 'node:fs';
import path from 'node:path';
import exifr from 'exifr';

export interface Photo {
  src: string;
  filename: string;
  width?: number;
  height?: number;
  camera?: string;
  lens?: string;
  date?: string;
  focalLength?: number;
  aperture?: number;
  shutterSpeed?: string;
  iso?: number;
}

const DIR = path.join(process.cwd(), 'public', 'img', 'photography');
const EXIF_PICK = [
  'Make',
  'Model',
  'LensModel',
  'DateTimeOriginal',
  'CreateDate',
  'FocalLength',
  'FNumber',
  'ExposureTime',
  'ISO',
  'ExifImageWidth',
  'ExifImageHeight',
  'ImageWidth',
  'ImageHeight',
];

let _cache: Photo[] | null = null;
const isDev = process.env.NODE_ENV !== 'production';

export async function getAllPhotos(): Promise<Photo[]> {
  if (!isDev && _cache) return _cache;
  if (!fs.existsSync(DIR)) return [];
  const files = fs.readdirSync(DIR).filter((f) => /\.(jpe?g|png|webp|avif)$/i.test(f));
  const out: Photo[] = [];
  for (const file of files) {
    const fp = path.join(DIR, file);
    let exif: Record<string, unknown> | null = null;
    try {
      exif = (await exifr.parse(fp, { pick: EXIF_PICK })) as Record<string, unknown> | null;
    } catch {
      exif = null;
    }
    const dt = (exif?.DateTimeOriginal ?? exif?.CreateDate) as Date | string | undefined;
    const date = dt ? new Date(dt).toISOString().slice(0, 10) : undefined;
    const expRaw = exif?.ExposureTime as number | undefined;
    const shutterSpeed =
      typeof expRaw === 'number' ? (expRaw >= 1 ? `${expRaw}s` : `1/${Math.round(1 / expRaw)}s`) : undefined;
    const make = (exif?.Make as string | undefined)?.trim();
    const model = (exif?.Model as string | undefined)?.trim();
    const camera = model
      ? make && !model.toLowerCase().includes(make.toLowerCase())
        ? `${make} ${model}`
        : model
      : undefined;
    out.push({
      src: `/img/photography/${file}`,
      filename: file,
      camera,
      lens: (exif?.LensModel as string | undefined)?.trim(),
      date,
      focalLength: exif?.FocalLength as number | undefined,
      aperture: exif?.FNumber as number | undefined,
      shutterSpeed,
      iso: exif?.ISO as number | undefined,
      width: (exif?.ExifImageWidth ?? exif?.ImageWidth) as number | undefined,
      height: (exif?.ExifImageHeight ?? exif?.ImageHeight) as number | undefined,
    });
  }
  out.sort((a, b) => {
    if (a.date && b.date) return a.date < b.date ? 1 : -1;
    return a.filename < b.filename ? 1 : -1;
  });
  if (!isDev) _cache = out;
  return out;
}
