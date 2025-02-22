import { SaveDocumentUseCase } from './save-document-use-case';
import { DocumentsRepository } from '@core/documents/domain/ports';

export type SaveDocumentFactory = (props: {
  documentsRepository: DocumentsRepository;
}) => SaveDocumentUseCase;
