import React from 'react';

import { Row, Col } from '../../components/Grid';
import Flex from '../../components/Flex';
import Box from '../../components/Box';
import RecipeCard from './RecipeCard';
import PriceInfo from './PriceInfo';
import { parseRawPrice } from './price';
import useFetchHelloFreshBox from '../../hooks/useFetchHelloFreshBox';

const Recipes = () => {
  // This state stores the array of recipes with the changes performed by the customer.
  const [recipes, setRecipes] = React.useState([]);
  const [box, setBox] = React.useState({});
  const { data, loading } = useFetchHelloFreshBox();

  const [minRecipesSelected, setMinRecipesSelected] = React.useState(false);
  const [maxRecipesSelected, setMaxRecipesSelected] = React.useState(false);

  console.log(minRecipesSelected, maxRecipesSelected);

  // add/remove recipe, feel free to remove or rename these these variables and values.
  const handleAddRecipe = (recipeId) => {
    // do not add any recipe when the Box is Full
    if (maxRecipesSelected) return;

    // search and add selected recipe
    let recipesClone = recipes.map((recipe) => {
      const { id, selected, selectionLimit } = recipe;
      if (id !== recipeId) {
        return recipe;
      }

      console.log(selected, selectionLimit);
      if (!selectionLimit || selected <= selectionLimit) {
        recipe.selected = selected + 1;
      }

      return recipe;
    });

    setRecipes(recipesClone);

    checkMinMaxRecipesSelected();
  };

  const handleRemoveRecipe = () => null;

  const checkMinMaxRecipesSelected = () => {
    const selectionsNumber = recipes
      .filter((recipe) => recipe.selected > 0)
      .reduce((accumulator, recipe) => accumulator + recipe.selected, 0);

    console.log(selectionsNumber);

    if (selectionsNumber <= box.min) {
      setMinRecipesSelected(true);
    }

    if (selectionsNumber >= box.max) {
      setMaxRecipesSelected(true);
    }
  };

  // min/max recipe boundaries, feel free to remove or rename these variables and values.
  // const minRecipesSelected = false;
  // const maxRecipesSelected = false;

  // price summary and total price, feel free to remove or rename these variables and values.
  const summary = [];
  const totalPrice = parseRawPrice(0);

  React.useEffect(() => {
    const { recipes: fetchedRecipes, min, max, baseRecipePrice, shippingPrice } = data;

    if (fetchedRecipes) {
      setRecipes(fetchedRecipes);
      setBox({ min, max, baseRecipePrice, shippingPrice });
    }
  }, [setRecipes, data]);

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
              <h3>{totalPrice}</h3>
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
