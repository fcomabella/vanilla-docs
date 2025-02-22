import { Document } from '@core/documents/domain/models';
import { Version } from '@core/shared/domain/models';
import {
  NewDocument,
  SaveDocumentControllerFactory,
} from '@ui/documents/models';
import { v4 as uuidv4 } from 'uuid';

const mapper = (document: NewDocument): Document => {
  return {
    Attachments: document.attachments,
    Contributors: document.contributors.map((contributor) => ({
      ID: uuidv4(),
      Name: contributor,
    })),
    CreatedAt: new Date(),
    ID: uuidv4(),
    Title: document.name,
    UpdatedAt: new Date(),
    Version: document.version as Version,
  };
};

export const SaveDocumentController: SaveDocumentControllerFactory = ({
  saveDocumentUseCase,
}) => {
  return (document) => saveDocumentUseCase(mapper(document));
};
