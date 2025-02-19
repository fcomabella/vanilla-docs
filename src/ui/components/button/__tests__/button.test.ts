import { render } from '@__tests__/render';
import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import { Button } from '@ui/components/button/button';

describe('Button component', () => {
  const onClickMock = vi.fn();

  beforeEach(() => {
    onClickMock.mockClear();
  });

  it('Should render', () => {
    const text = 'Test button';

    render(
      Button({
        children: text,
      })
    );

    expect(screen.getByRole('button', { name: text })).toBeInTheDocument();
  });

  it('Should render the passed element', () => {
    const text = document.createElement('div');
    text.textContent = 'Test button';

    render(
      Button({
        children: text,
      })
    );

    expect(text).toBeInTheDocument();
  });

  it('Should call onclick', async () => {
    const text = 'Test button';
    const user = userEvent.setup();

    render(
      Button({
        children: text,
        onClick: onClickMock,
      })
    );

    const button = screen.getByRole('button');

    await user.click(button);

    expect(onClickMock).toHaveBeenCalled();
  });
});
