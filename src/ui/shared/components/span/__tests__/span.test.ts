import { render } from '@__tests__/render';
import { Span } from '../span';
import { screen } from '@testing-library/dom';

describe('Span component', () => {
  it('Should render', () => {
    const text = 'Test span';

    render(
      Span({
        children: text,
      })
    );

    expect(screen.getByText(text)).toBeInTheDocument();
  });
});
