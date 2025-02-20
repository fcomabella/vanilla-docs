import { render } from '@__tests__/render';
import { Main } from '../main';
import { screen } from '@testing-library/dom';

describe('Main component', () => {
  it('Should render', () => {
    const children = 'Test main component';
    const className = 'test-class-name';

    render(Main({ children, className }));

    const mainElem = screen.getByRole('main');

    expect(mainElem).toBeInTheDocument();
    expect(mainElem).toHaveTextContent(children);
    expect(mainElem).toHaveClass(className);
  });
});
