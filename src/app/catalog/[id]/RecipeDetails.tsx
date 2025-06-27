'use client';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { fetchRecipeById } from '@/lib/features/recipes/recipesSlice';
import { Layout, Row, Col, Button, Popconfirm, notification } from 'antd';
import type { PopconfirmProps } from 'antd';
import styles from '@/styles/currentRecipePage.module.css';
import { deleteDoc, doc } from '@firebase/firestore';
import { db } from '@/services/firebase.config';
import { useRouter } from 'next/navigation';
import LoadingRecipePage from '@/components/LoadingRecipePage';
import Image from 'next/image';

export default function RecipeDetails({ recipeId }: { recipeId: string }) {
  const dispatch = useAppDispatch();
  const { currentRecipe, loading } = useAppSelector((state) => state.recipes);
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
      console.log(error)
      openNotification('error','Failed to delete the recipe!')
    }
  };

  const confirm: PopconfirmProps['onConfirm'] = () => {
    handleDeleteRecipe()
  };
  



  return (
    <Layout className={styles.content}>
  {loading
  ? <LoadingRecipePage/>
  :<>
  <Row justify="center" className={styles.recipeHeader}>
        <Col span={20}>
          <h1 className={styles.recipeTitle}>{currentRecipe.title}</h1>
          <Image
            src={currentRecipe.img_url}
            alt={currentRecipe.title}
            className={styles.recipeImage}
            width={500}
            height={500}
          />
        </Col>
      </Row>
      <Row justify="center" className={styles.recipeDetails}>
      <Col>
        
      <Row justify='space-around'>
        <Col span={8}>
         <div className={styles.ingredients}>
         <h2>Ingredients:</h2>
          <ul>
            {currentRecipe.ingredients.map((ingredient, index) => (
                <li key={index}>
                    {ingredient.amount} {ingredient.units} {ingredient.name}
                </li>
            ))}
          </ul>
         </div>
         </Col>

         <Col span={12}>
         <div className={styles.steps}>
         <h2>Cooking steps:</h2>
          <ol>
            {currentRecipe.cooking_steps.map((step, index) => (
              <div key={index}><li>{step}</li><br /></div>
            ))}
          </ol>
         </div>
         </Col>
        </Row>
         <Row justify="center" className={styles.buttonsRow}>
              <Col >
                <Button type="primary" className={styles.editButton} onClick={handleEdit}>
                  Edit
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
                    Delete
                  </Button>
                </Popconfirm>
              </Col>
            </Row>
      </Col>
       
      </Row>
  </>
  }
      
    </Layout>
  );
}
