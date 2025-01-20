import RecipeDetails from './RecipeDetails';

export default async function RecipePage({ params }: { params: { id: string } }) {
  const { id } = await params;

  return <RecipeDetails recipeId={id} />;
}