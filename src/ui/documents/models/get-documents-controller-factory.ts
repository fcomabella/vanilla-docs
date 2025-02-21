import { GetDocumentsUseCase } from '@core/documents/application/models';
import { GetDocumentsController } from './get-documents-controller';

export type GetDocumentsControllerFactory = (props: {
  getDocumentsUseCase: GetDocumentsUseCase;
}) => GetDocumentsController;
