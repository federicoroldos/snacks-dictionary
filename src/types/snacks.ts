export interface SnackEntry {
  id: string;
  name: string;
  nameEnglish?: string;
  brand: string;
  rating: number;
  description?: string;
  imageUrl?: string;
  imageDriveFileId?: string;
  imageMimeType?: string;
  imageName?: string;
  createdAt: string;
  updatedAt: string;
}

export interface SnackDataFile {
  version: number;
  updatedAt: string;
  entries: SnackEntry[];
}
