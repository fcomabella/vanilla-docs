import { Document } from '@core/documents/domain/models';
import { DocumentsRepositoryFactory } from '@core/documents/domain/ports';
import { DOCUMENTS_BASE_URL } from '@core/documents/infrastructure/constants';
import { DocumentResponse } from '@core/documents/infrastructure/models';
import { isDocumentsResponse } from '@core/documents/infrastructure/type-guards/is-documents-response';

export const documentMapper = (dto: DocumentResponse): Document => ({
  Attachments: dto.Attachments,
  Contributors: dto.Contributors,
  CreatedAt: new Date(dto.CreatedAt),
  ID: dto.ID,
  Title: dto.Title,
  UpdatedAt: new Date(dto.UpdatedAt),
  Version: dto.Version,
});

export const RestDocumentsRepository: DocumentsRepositoryFactory = ({
  fetchFn,
}) => {
  return {
    getDocuments: async (): Promise<Array<Document>> => {
      const response = await fetchFn(DOCUMENTS_BASE_URL);

      if (!isDocumentsResponse(response)) {
        throw new Error('Server has sent invalid data');
      }

      return response.map((dto) => documentMapper(dto));
    },
  };
};
