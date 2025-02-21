import { GetDocumentsUseCase } from './get-documents-use-case';
import { DocumentsRepository } from '@core/documents/domain/ports';

export type GetDocumentsFactory = (props: {
  documentsRepository: DocumentsRepository;
}) => GetDocumentsUseCase;
