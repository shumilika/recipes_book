'use client';
import NavigationHeader from '@/components/NavigationHeader';
import { Button, Col, Layout, Row } from 'antd';
import { Content } from 'antd/es/layout/layout';
// import { useRouter } from 'next/router';
import React from 'react';
import styles from '@/styles/currentRecipePage.module.css'

const page:React.FC = () => {
    // const router = useRouter();
    // const { id } = router.query;
    const id =1
  
    
    const recipe = {
      id,
      title: 'Борщ',
      imageUrl: '/placeholder.png', 
      ingredients: [
        '3 свеклы',
        '2 картофелины',
        '1 морковь',
        '1 луковица',
        '2 ст. ложки уксуса',
        '1 ст. ложка сахара',
        'Соль, перец по вкусу',
      ],
      steps: [
        'Нарезать овощи.',
        'Варить свеклу и картофель 30 минут.',
        'Добавить остальные овощи и варить еще 15 минут.',
        'Добавить уксус и сахар, варить 5 минут.',
        'Подавайте горячим с чесноком и сметаной.',
      ],
    };
  
    if (!id) {
      return <p>Loading...</p>;
    }
  
    return (
      <Layout>
      <NavigationHeader />
      <Content className={styles.content}>
        <Row justify="center" className={styles.recipeHeader}>
          <Col span={20}>
            <h1 className={styles.recipeTitle}>{recipe.title}</h1>
            <img
              src={recipe.imageUrl}
              alt={recipe.title}
              className={styles.recipeImage}
            />
          </Col>
        </Row>
        <Row justify="center" className={styles.recipeDetails}>
          <Col span={20}>
            <div className={styles.ingredients}>
              <h2>Ингредиенты:</h2>
              <ul>
                {recipe.ingredients.map((ingredient, index) => (
                  <li key={index}>{ingredient}</li>
                ))}
              </ul>
            </div>
            <div className={styles.steps}>
              <h2>Шаги приготовления:</h2>
              <ol>
                {recipe.steps.map((step, index) => (
                  <li key={index}>{step}</li>
                ))}
              </ol>
            </div>
            <Row justify="center" className={styles.buttonsRow}>
              <Col>
                <Button type="primary" className={styles.editButton}>
                  Редактировать
                </Button>
              </Col>
              <Col>
                <Button color={"danger"} className={styles.deleteButton}>
                  Удалить
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </Content>
    </Layout>
    );
};

export default page;