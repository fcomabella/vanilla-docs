import { Router } from '@config/router/models/router';

export interface TemplateProps {
  searchParams: URLSearchParams;
  router: Router;
}

export type Template = (props: TemplateProps) => HTMLElement;
