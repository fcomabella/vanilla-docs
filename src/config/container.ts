import { GetDocumentsUseCase } from '@core/documents/application/models';
import { GetDocuments } from '@core/documents/application/use-cases';
import { DocumentsRepository } from '@core/documents/domain/ports';
import { RestDocumentsRepository } from '@core/documents/infrastructure/ports';
import { fetchFromApi } from '@core/shared/infrastructure/utils';
import { GetDocumentsController } from '@ui/documents/controllers';
import { GetDocumentsController as GetDocumentsControllerResult } from '@ui/documents/models';
import * as awilix from 'awilix';

export const container = awilix.createContainer<{
  fetchFn: (url: string) => Promise<unknown>;
  documentsRepository: DocumentsRepository;
  getDocumentsUseCase: GetDocumentsUseCase;
  getDocumentsController: GetDocumentsControllerResult;
}>({ strict: true });

container.register({
  fetchFn: awilix.asValue(fetchFromApi),
  documentsRepository: awilix.asFunction(RestDocumentsRepository),
  getDocumentsUseCase: awilix.asFunction(GetDocuments),
  getDocumentsController: awilix.asFunction(GetDocumentsController),
});
