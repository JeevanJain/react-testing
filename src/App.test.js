import { render, screen } from '@testing-library/react';
import App from './App';
import userEvent from '@testing-library/user-event';

test('can receive a new user and show it on list', async () => {
  render(<App />);

  const user = userEvent.setup();

  const nameInput = screen.getByRole('textbox', {
    name: /name/i
  });
  const emailInput = screen.getByRole('textbox', {
      name: /email/i
  });

  await user.click(nameInput);
  await user.keyboard("jeevan");

  await user.click(emailInput);
  await user.keyboard("jeevantj@altimetrik.com");

  const btn = screen.getByRole('button');

  await user.click(btn);

  // screen.debug();

  const name = screen.getByRole('cell', { name : "jeevan"});
  const email = screen.getByRole('cell', { name : "jeevantj@altimetrik.com" });

  expect(name).toBeInTheDocument();
  expect(email).toBeInTheDocument();
});
