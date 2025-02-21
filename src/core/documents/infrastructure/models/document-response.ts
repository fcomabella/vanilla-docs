import { Version } from '@core/shared/domain/models';
import { ContributorResponse } from './contributor-response';

export interface DocumentResponse {
  Attachments: Array<string>;
  Contributors: Array<ContributorResponse>;
  CreatedAt: string;
  ID: string;
  Title: string;
  UpdatedAt: string;
  Version: Version;
}
