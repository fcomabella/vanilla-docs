import { DocumentResponse } from '@core/documents/infrastructure/models';
import { documentsSchema } from '@core/documents/infrastructure/schemas';

export const isDocumentsResponse = (
  dto: unknown
): dto is Array<DocumentResponse> => {
  const { success } = documentsSchema.safeParse(dto);
  return success;
};
