import { Contributor } from './contributor';
import { Attachment } from './attachment';
import { Version } from '@core/shared/domain/models';

export interface Document {
  Attachments: Array<Attachment>;
  Contributors: Array<Contributor>;
  CreatedAt: Date;
  ID: string;
  Title: string;
  UpdatedAt: Date;
  Version: Version;
}
