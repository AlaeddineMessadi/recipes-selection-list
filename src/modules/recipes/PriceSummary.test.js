import React from 'react';
import PriceSummary from './PriceSummary';
// import react-testing methods
import { render, waitFor } from '@testing-library/react';

const mockedData = [
  { title: 'Chicken Sausage & Spinach Ravioli', price: 1798 },
  { title: 'Gouda Vibes Burgers', price: 1798 },
  { title: 'Figgy Balsamic Pork', price: 1798 },
  { title: 'Shipping', price: 1298 },
];

describe('PriceSummary: *****', () => {
  test('PriceSummary should render without crashing', async () => {
    render(<PriceSummary />);
  });

  test('PriceSummary should render recieps and total', async () => {
    const { container, getByText } = render(
      <PriceSummary summary={mockedData} totalPrice="6692" />
    );

    const rows = await container.querySelectorAll('[data-name="row"]');
    expect(rows.length).toBe(5);
    // console.log(rows[4])
    expect(getByText('$66.92')).toBeInTheDocument();
  });
});
