export function getSeoImages(
  imageUrl: string,
  pageTitle: string
): { url: string; width: number; height: number; alt: string }[] {
  return [
    {
      url: imageUrl,
      width: 1200,
      height: 630,
      alt: `Prolo – ${pageTitle}`,
    },
  ];
}
