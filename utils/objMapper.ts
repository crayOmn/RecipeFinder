import {Recipe} from '../components/RecipeCard';

const mapApiResponseToRecipe = (meals: any): Recipe[] | [] => {
  if (!meals || meals.length === 0) {
    return [];
  }
  const recipes: Recipe[] = [];

  for (let index = 0; index < meals.length; index++) {
    const meal = meals[index];
    const ingredients = [];
    const measures: any[] = [];

    for (let i = 1; i <= 20; i++) {
      const ingredient = meal[`strIngredient${i}`];
      const measure = meal[`strMeasure${i}`];

      if (
        ingredient &&
        ingredient.trim() !== '' &&
        measure &&
        measure.trim() !== ''
      ) {
        ingredients.push(ingredient);
        measures.push(measure);
      }
    }
    const recipe: Recipe = {
      id: meal.idMeal,
      title: meal.strMeal,
      category: meal.strCategory,
      image: meal.strMealThumb,
      instructions: meal.strInstructions,
      ingredients: ingredients.map(
        (ingredient, index) => `${measures[index]} ${ingredient}`,
      ),
    };
    recipes.push(recipe);
  }
  return recipes;
};

export default mapApiResponseToRecipe;