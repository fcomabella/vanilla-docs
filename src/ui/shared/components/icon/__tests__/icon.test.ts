import { render } from '@__tests__/render';
import { Icon } from '../icon';
import { screen } from '@testing-library/dom';

describe('Icon component', () => {
  it('Should render', () => {
    const iconName = 'test_icon';
    render(Icon({ iconName }));

    const span = screen.getByText(iconName);
    expect(span).toBeInTheDocument();
    expect(span).toHaveClass('material-icons');
  });
});
