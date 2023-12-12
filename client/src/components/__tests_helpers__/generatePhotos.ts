import { Photo } from '../../types/photoObject';

const pseudoRandom = (i: number, j: number): number => {
  if (i % 2) return Math.round(1 / ++i * j);
  return Math.round(++i * j);
};

const testImages = (amount: number): Photo[] => {
  const images: Photo[] = [];

  for (let i = 0; i < amount; i++) {
    const width = pseudoRandom(i, 400);
    const height = pseudoRandom(i, 200);

    const imageSize = `${width}x${height}?text=${width}%20x%20${height}`;

    const photo = {
      imageId: i,
      name: `image${i}.png`,
      path: `https://via.placeholder.com/${imageSize}`,
      size: pseudoRandom(i, 10 ** 3),
      width,
      height,
      date: pseudoRandom(i, 10 ** 6),
      ratioY: height / width,
    };

    images.push(photo);
  }

  return images;
};

module.exports = testImages;
