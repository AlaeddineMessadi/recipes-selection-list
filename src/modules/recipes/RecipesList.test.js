import React from 'react';
import RecipesList from './RecipesList';
// import react-testing methods
import { render, fireEvent, waitFor, screen } from '@testing-library/react';

describe('RecipesList: *****', () => {
  test('RecipesList should render without crashing', async () => {
    render(<RecipesList />);
    // container.debug();
  });

  test('RecipesList should fetch data', async () => {
    const container = render(<RecipesList />);
    await waitFor(() => expect(container.getByText('WEEK OF OCTOBER 12TH')).toBeInTheDocument());
  });
});
