// Write your tests here
import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import AppFunctional from './AppFunctional';

beforeEach(()=>{
  render(<AppFunctional />);
});

test('Başlangıç kooradinatı doğrulama', () => {
  
  const coordinatesElement = screen.getByText('Koordinatlar (2, 2)');
  expect(coordinatesElement).toBeInTheDocument();
});

test('Başlangıç adım sayısı doğrulama', () => {
  const stepsElement = screen.getByText('0 kere ilerlediniz');
  expect(stepsElement).toBeInTheDocument();
});

