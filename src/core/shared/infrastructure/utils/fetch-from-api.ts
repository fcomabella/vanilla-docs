import { HttpError } from '@core/shared/infrastructure/exceptions';

export const fetchFromApi = async (url: string): Promise<unknown> => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new HttpError(response.status, response.statusText);
  }

  return await response.json();
};
