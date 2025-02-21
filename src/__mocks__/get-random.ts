export const getRandom = ({
  min,
  max,
}: {
  min: number;
  max: number;
}): number => {
  if (min > max) {
    max = min;
  }
  return Math.round(Math.random() * (max - min) + min);
};
