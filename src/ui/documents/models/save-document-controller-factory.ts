import { SaveDocumentUseCase } from '@core/documents/application/models';
import { SaveDocumentController } from './save-document-controller';

export type SaveDocumentControllerFactory = (props: {
  saveDocumentUseCase: SaveDocumentUseCase;
}) => SaveDocumentController;
