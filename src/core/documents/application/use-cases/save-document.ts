import { SaveDocumentFactory } from '@core/documents/application/models';

export const SaveDocument: SaveDocumentFactory = ({ documentsRepository }) => {
  return (document) => documentsRepository.saveDocument(document);
};
