import React from 'react'
import AppFunctional from './AppFunctional'
import { render, fireEvent, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect'

// Write your tests here
test('sanity', () => {
  expect(true).toBe(true);
})

test('Hata olmadan render ediliyor', () => {
  render(<AppFunctional />);
});

beforeEach(() => {
  render(<AppFunctional />);
});

test('Düğmelerin üzerindeki yazılar görünüyor', async () => {
  const buttons = screen.getAllByRole('button');
  expect(buttons[0]).toHaveTextContent('SOL');
  expect(buttons[1]).toHaveTextContent('YUKARI');
  expect(buttons[2]).toHaveTextContent('SAĞ');
  expect(buttons[3]).toHaveTextContent('AŞAĞI');
  expect(buttons[4]).toHaveTextContent('reset');
});

test('Doğru metinler görüntüleniyor', async () => {
  const coordinates = document.querySelector('#coordinates');
  const steps = document.querySelector('#steps');

  expect(coordinates).toHaveTextContent('Koordinatlar (2, 2)');
  expect(steps).toHaveTextContent('0 kere ilerlediniz');
});

test('Yeni metin girince inputun değeri değişiyor', async () => {
  const input = screen.getByPlaceholderText('email girin');
  userEvent.type(input, 'lady@gaga.com');
  await waitFor(() => {
    expect(input).toHaveValue('lady@gaga.com');
  });
});

test('B hareket edebildiği zaman alttaki mesaj sıfırlanıyor', async () => {
  const up = document.querySelector('#up');
  const down = document.querySelector('#down');
  const message = document.querySelector('#message');

  fireEvent.click(up);
  fireEvent.click(up);
  await waitFor(() => {
    expect(message).toHaveTextContent('Yukarıya gidemezsiniz');
  })
  fireEvent.click(down);
  await waitFor(() => {
    expect(message).not.toHaveTextContent();
  })
});

test('Email alanına sadece harfler girildiği zaman gönder düğmesi çalışmıyor', async () => {
  const email = document.querySelector('#email');
  const submit = document.querySelector('#submit');
  const message = document.querySelector('#message');

  fireEvent.change(email, { target: { value: 'asdfghj' } });
  fireEvent.click(submit);
  await waitFor(() => {
    expect(message).not.toHaveTextContent();
  })
})