import type { SnackEntry } from '../types/snacks';

const MAX_NAME = 80;
const MAX_BRAND = 60;
const MAX_DESCRIPTION = 280;
const MAX_IMAGE_URL = 2048;
const MAX_DRIVE_FILE_ID = 256;
const MAX_IMAGE_MIME_TYPE = 100;
const MAX_IMAGE_NAME = 180;
const FALLBACK_CREATED_AT = '1970-01-01T00:00:00.000Z';

const normalizeTimestamp = (value: unknown) => {
  if (typeof value === 'string') {
    const trimmed = value.trim();
    if (!trimmed) return '';
    const parsed = Date.parse(trimmed);
    return Number.isFinite(parsed) ? new Date(parsed).toISOString() : '';
  }
  if (typeof value === 'number' && Number.isFinite(value)) {
    const milliseconds = value > 0 && value < 1_000_000_000_000 ? value * 1000 : value;
    const parsed = new Date(milliseconds).getTime();
    return Number.isFinite(parsed) ? new Date(parsed).toISOString() : '';
  }
  return '';
};

const stripControlChars = (value: string) =>
  value
    .split('')
    .filter((char) => {
      const code = char.charCodeAt(0);
      return !((code >= 0 && code <= 8) || code === 11 || code === 12 || (code >= 14 && code <= 31) || code === 127);
    })
    .join('');

const sanitizeText = (value: unknown, maxLength: number) => {
  if (typeof value !== 'string') return '';
  const cleaned = stripControlChars(value).trim();
  return cleaned.length > maxLength ? cleaned.slice(0, maxLength) : cleaned;
};

const sanitizeRating = (value: unknown) => {
  const numeric = typeof value === 'number' ? value : Number(value);
  if (!Number.isFinite(numeric)) return 3;
  return Math.min(5, Math.max(1, Math.round(numeric * 2) / 2));
};

export const sanitizeUrl = (value: unknown) => {
  if (typeof value !== 'string') return '';
  const trimmed = value.trim();
  if (!trimmed) return '';
  try {
    const url = new URL(trimmed);
    if (url.protocol !== 'https:') return '';
    return url.toString().slice(0, MAX_IMAGE_URL);
  } catch {
    return '';
  }
};

export const sanitizeEntry = (value: unknown): SnackEntry | null => {
  if (!value || typeof value !== 'object') return null;
  const entry = value as Partial<SnackEntry> & Record<string, unknown>;
  const createdAt =
    normalizeTimestamp(entry.createdAt) ||
    normalizeTimestamp(entry.created_at) ||
    normalizeTimestamp(entry.createdTime) ||
    normalizeTimestamp(entry.timestamp) ||
    normalizeTimestamp(entry.updatedAt) ||
    FALLBACK_CREATED_AT;
  const updatedAt = normalizeTimestamp(entry.updatedAt) || normalizeTimestamp(entry.timestamp) || createdAt;

  return {
    id: sanitizeText(entry.id, 80),
    name: sanitizeText(entry.name, MAX_NAME),
    nameEnglish: sanitizeText(entry.nameEnglish, MAX_NAME),
    brand: sanitizeText(entry.brand, MAX_BRAND),
    rating: sanitizeRating(entry.rating),
    description: sanitizeText(entry.description, MAX_DESCRIPTION),
    imageUrl: sanitizeUrl(entry.imageUrl),
    imageDriveFileId: sanitizeText(entry.imageDriveFileId, MAX_DRIVE_FILE_ID),
    imageMimeType: sanitizeText(entry.imageMimeType, MAX_IMAGE_MIME_TYPE),
    imageName: sanitizeText(entry.imageName, MAX_IMAGE_NAME),
    createdAt,
    updatedAt
  };
};

export const sanitizeEntries = (entries: unknown) => {
  if (!Array.isArray(entries)) return [] as SnackEntry[];
  return entries
    .map((entry, index) => {
      const sanitized = sanitizeEntry(entry);
      if (!sanitized) return null;
      if (sanitized.id) return sanitized;
      return {
        ...sanitized,
        id: `legacy-${index}`
      };
    })
    .filter((entry): entry is SnackEntry => Boolean(entry));
};
