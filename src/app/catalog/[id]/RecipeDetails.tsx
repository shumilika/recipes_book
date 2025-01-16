'use client';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { fetchRecipeById } from '@/lib/features/recipes/recipesSlice';
import { Spin, Layout, Row, Col } from 'antd';
import styles from '@/styles/currentRecipePage.module.css';

export default function RecipeDetails({ recipeId }: { recipeId: string }) {
  const dispatch = useAppDispatch();
  const { currentRecipe, loading, error } = useAppSelector((state) => state.recipes);

  useEffect(() => {
    dispatch(fetchRecipeById(recipeId));
  }, [recipeId, dispatch]);

  if (loading) return <Spin/>;
  if (error) return <div>Error: {error}</div>;
  if (!currentRecipe) return <div>Recipe not found</div>;

  return (
    <Layout>
      <Row justify="center" className={styles.recipeHeader}>
        <Col span={20}>
          <h1 className={styles.recipeTitle}>{currentRecipe.title}</h1>
          <img
            src={currentRecipe.img_url}
            alt={currentRecipe.title}
            className={styles.recipeImage}
          />
        </Col>
      </Row>
      <Row justify="center" className={styles.recipeDetails}>
        <Col span={20}>
          <h2>Ингредиенты:</h2>
          <ul>
            {currentRecipe.ingredients.map((ingredient, index) => (
                <li key={index}>
                    {ingredient.amount} {ingredient.units} {ingredient.name}
                </li>
            ))}
          </ul>
          <h2>Шаги приготовления:</h2>
          <ol>
            {currentRecipe.cooking_steps.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ol>
        </Col>
      </Row>
    </Layout>
  );
}
