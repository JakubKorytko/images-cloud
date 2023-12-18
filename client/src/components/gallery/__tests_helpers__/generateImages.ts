import type { Image } from 'components/images/ImageObject.type';

const pseudoRandom = (i: number, j: number): number => {
  if (i % 2) return Math.round((1 / (i + 1)) * j);
  return Math.round((i + 1) * j);
};

export default (amount: number): Image[] => {
  const images: Image[] = [];

  for (let i = 0; i < amount; i += 1) {
    const width = pseudoRandom(i, 400);
    const height = pseudoRandom(i, 200);

    const imageSize = `${width}x${height}?text=${width}%20x%20${height}`;

    const image = {
      imageId: i,
      name: `image${i}.png`,
      path: `https://via.placeholder.com/${imageSize}`,
      size: pseudoRandom(i, 10 ** 3),
      width,
      height,
      date: pseudoRandom(i, 10 ** 6),
      ratioY: height / width,
    };

    images.push(image);
  }

  return images;
};
