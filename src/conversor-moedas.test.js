import { render, screen } from '@testing-library/react';
import ConversorMoedas from './conversor-moedas';


test('renders learn react link', () => {
  render(<ConversorMoedas />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
