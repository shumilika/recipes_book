'use client';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { fetchRecipeById } from '@/lib/features/recipes/recipesSlice';
import { Spin, Layout, Row, Col, Button, Popconfirm, notification } from 'antd';
import type { PopconfirmProps } from 'antd';
import styles from '@/styles/currentRecipePage.module.css';
import { deleteDoc, doc } from '@firebase/firestore';
import { db } from '@/services/firebase.config';
import { useRouter } from 'next/navigation';

export default function RecipeDetails({ recipeId }: { recipeId: string }) {
  const dispatch = useAppDispatch();
  const { currentRecipe, loading, error } = useAppSelector((state) => state.recipes);
  const [api, contextHolder] = notification.useNotification();
  const router = useRouter()
  
  const openNotification = (type: 'success' | 'error', message: string) => {
    api[type]({
      message,
      placement: 'top',
    });
  };

  useEffect(() => {
    dispatch(fetchRecipeById(recipeId));
  }, [recipeId, dispatch]);

  if (loading) return <Spin/>;
  if (!currentRecipe) return <div>Recipe not found</div>;

  

  const handleEdit = () =>{
    router.push(`/edit-recipe/${recipeId}`)
  }

  const handleDeleteRecipe = async () => {
    try {
      await deleteDoc(doc(db, "recipes", recipeId));
      openNotification('success','Recipe deleted successfully!')
      setTimeout(() => {
        router.push('/catalog');
      }, 2000);
    } catch (error) {
      openNotification('error','Failed to delete the recipe!')
    }
  };

  const confirm: PopconfirmProps['onConfirm'] = (e) => {
    handleDeleteRecipe()
  };
  

  return (
    <Layout className={styles.content}>
    
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
         <div className={styles.ingredients}>
         <h2>Ингредиенты:</h2>
          <ul>
            {currentRecipe.ingredients.map((ingredient, index) => (
                <li key={index}>
                    {ingredient.amount} {ingredient.units} {ingredient.name}
                </li>
            ))}
          </ul>
         </div>
         <div className={styles.steps}>
         <h2>Шаги приготовления:</h2>
          <ol>
            {currentRecipe.cooking_steps.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ol>
         </div>
         <Row justify="center" className={styles.buttonsRow}>
              <Col>
                <Button type="primary" className={styles.editButton} onClick={handleEdit}>
                  Редактировать
                </Button>
              </Col>
              <Col>
              {contextHolder}
                <Popconfirm
                  title="Delete the recipe"
                  description="Are you sure you want to delete this recipe?"
                  onConfirm={confirm}
                  okText="Delete"
                  cancelText="Cancel"
                >
                  <Button color={"danger"} className={styles.deleteButton}>
                    Удалить
                  </Button>
                </Popconfirm>
              </Col>
            </Row>
        </Col>
      </Row>
    </Layout>
  );
}
