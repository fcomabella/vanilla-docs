import { Router } from '@config/router/models/router';
import { WithSearchParams } from '@ui/shared/models';
import { DocumentSort, DocumentView } from '@ui/documents/models';

export interface OptionsBarProps extends WithSearchParams {
  router: Router;
  view: DocumentView;
  sort: DocumentSort;
}
