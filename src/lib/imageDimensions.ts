export type ImageDimensions = {
  width: number;
  height: number;
};

import { GENERATED_IMAGE_DIMENSIONS } from "./generatedImageDimensions";

const IMAGE_DIMENSIONS: Record<string, ImageDimensions> = {
  "/images/hero.webp": { width: 1600, height: 900 },
  ...GENERATED_IMAGE_DIMENSIONS,
};

export const getImageDimensions = (src: string): ImageDimensions => {
  const dimensions = IMAGE_DIMENSIONS[src];

  if (!dimensions) {
    throw new Error(`Missing image dimensions for: ${src}`);
  }

  return dimensions;
};
