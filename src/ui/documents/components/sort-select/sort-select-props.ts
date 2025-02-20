import { DocumentSort } from '@ui/documents/models';
import { WithSearchParams } from '@ui/shared/models';
import { WithRouter } from '@ui/shared/models/with-router';

export interface SortSelectProps extends WithRouter, WithSearchParams {
  sort: DocumentSort;
}
