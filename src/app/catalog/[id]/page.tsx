import RecipeDetails from './RecipeDetails';

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function RecipePage({ params }: PageProps) {
  const resolvedParams = await params
  return <RecipeDetails recipeId={resolvedParams.id} />;
}