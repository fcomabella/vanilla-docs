import { Router } from '@config/router/models/router';
import { WithSearchParams } from '@ui/components/models';
import { DocumentView } from '@ui/documents/models';

export interface OptionsBarProps extends WithSearchParams {
  router: Router;
  view: DocumentView;
}
