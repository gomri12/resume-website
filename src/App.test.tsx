import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

test('renders navigation links', () => {
  render(<App />);
  const aboutLink = screen.getByText(/about/i);
  const experienceLink = screen.getByText(/experience/i);
  const skillsLink = screen.getByText(/skills/i);
  const contactLink = screen.getByText(/contact/i);

  expect(aboutLink).toBeInTheDocument();
  expect(experienceLink).toBeInTheDocument();
  expect(skillsLink).toBeInTheDocument();
  expect(contactLink).toBeInTheDocument();
});
