import { Document } from '@core/documents/domain/models';

export type SaveDocumentUseCase = (document: Document) => Promise<void>;
