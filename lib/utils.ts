import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

export function readingTime(text: string, wpm = 200): number {
  const words = text.replace(/[`*_#>\[\]\(\)!]/g, ' ').split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / wpm));
}
