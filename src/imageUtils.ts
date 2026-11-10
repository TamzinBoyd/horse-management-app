// Photos are stored inside the Firestore document as data URLs, so they must stay
// well under Firestore's 1 MiB document limit. Resize and recompress before saving.
const MAX_DATA_URL_CHARS = 700_000;

export async function imageFileToDataUrl(file: File): Promise<string> {
  const bitmap = await createImageBitmap(file);
  try {
    for (const maxSide of [1280, 960, 720, 480]) {
      const scale = Math.min(1, maxSide / Math.max(bitmap.width, bitmap.height));
      const width = Math.round(bitmap.width * scale);
      const height = Math.round(bitmap.height * scale);

      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error('Could not process this image.');
      ctx.drawImage(bitmap, 0, 0, width, height);

      for (const quality of [0.85, 0.7, 0.5]) {
        const url = canvas.toDataURL('image/jpeg', quality);
        if (url.length <= MAX_DATA_URL_CHARS) return url;
      }
    }
    throw new Error('This photo is too large, even after compressing. Try a smaller one.');
  } finally {
    bitmap.close();
  }
}
