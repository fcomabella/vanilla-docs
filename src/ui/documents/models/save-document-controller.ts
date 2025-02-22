import { NewDocument } from '@ui/documents/models/new-document';

export type SaveDocumentController = (document: NewDocument) => Promise<void>;
