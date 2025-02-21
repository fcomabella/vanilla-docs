import { Document } from '@core/documents/domain/models';
import { VERSION_REGEX } from '@core/documents/infrastructure/constants';

export const sortDocumentsByVersion = (a: Document, b: Document): number => {
  const aVersion = VERSION_REGEX.exec(a.Version);
  const bVersion = VERSION_REGEX.exec(b.Version);

  if (aVersion === null || bVersion === null) {
    return 0;
  }

  const [, aMajor, aMinor, aPatch] = aVersion;
  const [, bMajor, bMinor, bPatch] = bVersion;

  const majorDiff = Number(aMajor) - Number(bMajor);

  if (majorDiff !== 0) {
    return majorDiff;
  }

  const minorDiff = Number(aMinor) - Number(bMinor);

  if (minorDiff !== 0) {
    return minorDiff;
  }

  const patchDiff = Number(aPatch) - Number(bPatch);

  return patchDiff;
};
