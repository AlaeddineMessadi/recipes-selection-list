import React from 'react';
import RecipesList from './RecipesList';
// import react-testing methods
import { render, fireEvent, waitFor, screen } from '@testing-library/react';

describe('RecipesList: *****', () => {
  test('RecipesList should render without crashing', async () => {
    render(<RecipesList />);
  });

  test('RecipesList should fetch data', async () => {
    const container = render(<RecipesList />);
    await waitFor(() => expect(container.getByText('WEEK OF OCTOBER 12TH')).toBeInTheDocument());
  });

  test('RecipesList should render list of 21 recipes', async () => {
    const { container, getByText, debug } = render(<RecipesList />);

    // wait untill fetched and render data
    await waitFor(() => expect(getByText('WEEK OF OCTOBER 12TH')).toBeInTheDocument());

    const listRecipes = await container.querySelectorAll(
      '[data-name="col-sm-12 col-md-6 col-xl-4"]'
    );
    expect(listRecipes.length).toBe(21);
  });
});
