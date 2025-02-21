import { Document } from '@core/documents/domain/models';
import {
  Document as DocumentViewModel,
  GetDocumentsControllerFactory,
} from '@ui/documents/models';

const mapper = (document: Document): DocumentViewModel => {
  return {
    name: document.Title,
    attachments: document.Attachments,
    contributors: document.Contributors.map((contributor) => contributor.Name),
    version: document.Version,
  };
};

export const GetDocumentsController: GetDocumentsControllerFactory = ({
  getDocumentsUseCase,
}) => {
  return async (sort) => {
    return (await getDocumentsUseCase(sort)).map((document) =>
      mapper(document)
    );
  };
};
