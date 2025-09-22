import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders login form', () => {
  render(<App />);
  const loginButton = screen.getByRole('button', { name: /로그인/i });
  expect(loginButton).toBeInTheDocument();
});
