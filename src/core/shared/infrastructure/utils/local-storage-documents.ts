import { LOCAL_STORAGE_DOCUMENTS_KEY } from '@core/documents/infrastructure/constants/local-storage-documents-key';
import { DocumentResponse } from '@core/documents/infrastructure/models';
import { isDocumentsResponse } from '@core/documents/infrastructure/type-guards/is-documents-response';

export const fetchDocumentsFromLocalStorage = async (): Promise<
  Array<unknown>
> => {
  const stored = localStorage.getItem(LOCAL_STORAGE_DOCUMENTS_KEY);

  if (stored === null) {
    return [];
  }

  return JSON.parse(stored);
};

export const saveDocument = async (
  document: DocumentResponse
): Promise<void> => {
  const documents = await fetchDocumentsFromLocalStorage();

  if (!isDocumentsResponse(documents)) {
    throw new Error('Localstorage holds invalid data');
  }

  documents.push(document);

  localStorage.setItem(LOCAL_STORAGE_DOCUMENTS_KEY, JSON.stringify(documents));
};
