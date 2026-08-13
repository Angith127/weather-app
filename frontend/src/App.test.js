import { render, screen } from '@testing-library/react';
import App from './App';

test('renders weather app heading', () => {
  render(<App />);
  const heading = screen.getByRole('heading', { name: /weather pro/i });
  expect(heading).toBeInTheDocument();
});
