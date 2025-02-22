import { render, RenderResult } from '@__tests__/render';
import { Form } from '@ui/shared/components/form';

export const renderInForm = (
  element: HTMLElement,
  id = 'test-form-id',
  onSubmit = (): void => {}
): RenderResult =>
  render(
    Form({
      children: element,
      id,
      onSubmit,
    })
  );
