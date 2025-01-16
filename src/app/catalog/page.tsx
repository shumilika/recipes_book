'use client';
import { Button, Col, Layout, Row, Spin } from 'antd';
import React, { useEffect } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import styles from '@/styles/catalog.module.css'
import { Content } from 'antd/es/layout/layout';
import { RootState } from '@/lib/store';
import { fetchRecipes } from '@/lib/features/recipes/recipesSlice';
import { useAppDispatch, useAppSelector } from '@/app/hooks';

const page:React.FC = () => {

  const {recipesList, loading, error} = useAppSelector((state: RootState)=>state.recipes) 
  const dispatch = useAppDispatch()

  useEffect(()=>{
    dispatch(fetchRecipes())
  },[dispatch])

  if (loading) {
    return <Spin/>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

    return (
     
        <Layout className={styles.layout}>
           <Content className={styles.content}>
      <Button
        icon={<SearchOutlined />}
        type="primary"
        className={styles.searchButton}
      >
        Search
      </Button>

      <Row gutter={[16, 16]} justify="center" className={styles.row}>
      {recipesList.map((recipe) => (
            <Col span={4} key={recipe.id}>
              <Button className={styles.imageButton} href={`/catalog/${recipe.id}`}>
                <img src={recipe.img_url || '/placeholder.png'} alt={recipe.title} />
              </Button>
              <div className={styles.recipeTitle}>{recipe.title}</div>
            </Col>
          ))}
      </Row>
    </Content>
        </Layout>
    );
};

export default page;