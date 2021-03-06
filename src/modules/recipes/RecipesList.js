import React from 'react';

import { Row, Col } from '../../components/Grid';
import Flex from '../../components/Flex';
import Box from '../../components/Box';
import RecipeCard from './RecipeCard';
import PriceInfo from './PriceInfo';
import { parseRawPrice } from './price';
import useFetchData from '../../hooks/useFetchData';

const Recipes = () => {
  // This state stores the array of recipes with the changes performed by the customer.
  const [recipes, setRecipes] = React.useState([]);
  const [box, setBox] = React.useState({});
  const { data, loading } = useFetchData();

  const [minRecipesSelected, setMinRecipesSelected] = React.useState(false);
  const [maxRecipesSelected, setMaxRecipesSelected] = React.useState(false);

  // add/remove recipe, feel free to remove or rename these these variables and values.
  const handleAddRecipe = (recipeId) => {
    // do not add any recipe when the Box is Full
    if (maxRecipesSelected) return;

    // find and update selected recipe
    let selectedRecipes = recipes.map((recipe) => {
      const { id, selected, selectionLimit } = recipe;
      if (id !== recipeId) {
        return recipe;
      }

      if (!selectionLimit || selected <= selectionLimit) {
        recipe.selected = selected + 1;
      }

      return recipe;
    });

    setRecipes(selectedRecipes);
    checkMinMaxRecipesSelected();

    // update Summary list
    updateSummary();
  };

  const handleRemoveRecipe = (recipeId) => {
    // search and add selected recipe
    let selectedRecipes = recipes.map((recipe) => {
      const { id, selected } = recipe;
      if (id !== recipeId) {
        return recipe;
      }

      if (selected > 0) {
        recipe.selected = selected - 1;
      }

      return recipe;
    });

    setRecipes(selectedRecipes);
    checkMinMaxRecipesSelected();

    // update Summary List
    updateSummary();
  };

  const updateSummary = React.useCallback(() => {
    const selectedList = recipes
      .filter((recipe) => recipe.selected > 0)
      .map((recipe) => ({
        title: `${recipe.name}${recipe.selected > 1 ? ' x ' + recipe.selected : ''}`,
        price: (box.baseRecipePrice + recipe.extraCharge) * recipe.selected,
      }));

    // add Shipping const
    selectedList.push({
      title: 'Shipping',
      price: box.shippingPrice,
    });

    const total = selectedList.reduce((sum, item) => sum + item.price, 0);

    setSummary(selectedList);
    setTotalPrice(total);
  }, [box.baseRecipePrice, box.shippingPrice, recipes]);

  /**
   * Check minRecipesSelected and maxRecipesSelected exceeded
   */
  const checkMinMaxRecipesSelected = React.useCallback(() => {
    const selectionsNumber = recipes
      .filter((recipe) => recipe.selected > 0)
      .reduce((accumulator, recipe) => accumulator + recipe.selected, 0);

    setMinRecipesSelected(selectionsNumber >= box.min);
    setMaxRecipesSelected(selectionsNumber >= box.max);
  }, [box.max, box.min, recipes]);

  // price summary and total price, feel free to remove or rename these variables and values.
  const [summary, setSummary] = React.useState([]);
  const [totalPrice, setTotalPrice] = React.useState(0);

  React.useEffect(() => {
    const { recipes: fetchedRecipes, min, max, baseRecipePrice, shippingPrice } = data;

    if (fetchedRecipes) {
      setRecipes(fetchedRecipes);
      setBox({ min, max, baseRecipePrice, shippingPrice });
      checkMinMaxRecipesSelected();
      updateSummary();
    }
  }, [setRecipes, data, checkMinMaxRecipesSelected, updateSummary]);

  if (loading) {
    return null;
  }

  return (
    <>
      <Row>
        <Col sm={6}>
          <h3>{data.headline}</h3>
        </Col>
        <Col sm={6}>
          <Flex alignItems="center" justifyContent="flex-end">
            <Box textAlign="right" mr="xs">
              <h3>{parseRawPrice(totalPrice)}</h3>
            </Box>
            <PriceInfo summary={summary} totalPrice={totalPrice} />
          </Flex>
        </Col>
      </Row>

      <Row>
        {recipes.map((recipe) => (
          <Col sm={12} md={6} xl={4} key={recipe.id}>
            <Box mb="md">
              <RecipeCard
                {...recipe}
                handleAddRecipe={() => handleAddRecipe(recipe.id)}
                handleRemoveRecipe={() => handleRemoveRecipe(recipe.id)}
                minRecipesSelected={minRecipesSelected}
                maxRecipesSelected={maxRecipesSelected}
              />
            </Box>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Recipes;
