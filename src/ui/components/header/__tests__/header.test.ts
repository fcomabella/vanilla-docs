import { render } from '@__tests__/render';
import { Header } from '../header';
import { screen } from '@testing-library/dom';

describe('Header component', () => {
  const headings: Array<'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'> = [
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
  ];

  headings.forEach((headingType, level) => {
    it(`Should render an ${headingType} header`, () => {
      const children = `Test heading ${headingType}`;

      render(
        Header({
          type: headingType,
          children,
        })
      );

      const headingElem = screen.getByRole('heading', { level: level + 1 });

      expect(headingElem).toBeInTheDocument();
      expect(headingElem).toHaveTextContent(children);
    });
  });

  it('Should apply the className', () => {
    const children = 'Test heading';
    const className = 'test-class';
    render(Header({ type: 'h1', children, className }));

    const headingElem = screen.getByRole('heading');

    expect(headingElem).toHaveClass(className);
  });
});
