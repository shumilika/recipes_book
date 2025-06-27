'use client';
import { Button, Col, Layout, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import styles from '@/styles/catalog.module.css'
import { Content } from 'antd/es/layout/layout';
import { RootState } from '@/lib/store';
import { fetchRecipes } from '@/lib/features/recipes/recipesSlice';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
// import RecipeFilter from '@/components/RecipeFilter';
import LoadingSkeleton from '../../components/LoadingCatalog';
import Link from 'next/link';
import Image from 'next/image';

const Page:React.FC = () => {

  const {recipesList, loading} = useAppSelector((state: RootState)=>state.recipes) 
  const dispatch = useAppDispatch()

  const [, setFilteredRecipes] = useState(recipesList);
  const [selectedCategory, ] = useState<string | null>(null);
  const [searchIngredient, ] = useState<string>('');

  useEffect(()=>{
    dispatch(fetchRecipes())
  },[dispatch])

  

  useEffect(() => {
    setFilteredRecipes(
      recipesList.filter((recipe) => {
        const matchesCategory = !selectedCategory || recipe.category === selectedCategory;
        const matchesIngredient =
          !searchIngredient ||
          recipe.ingredients.some((ingredient: { name: string }) =>
            ingredient.name.toLowerCase().includes(searchIngredient.toLowerCase())
          );

        return matchesCategory && matchesIngredient;
      })
    );
  }, [recipesList, selectedCategory, searchIngredient]);




    return (
     
        <Layout className={styles.layout}>
           <Content className={styles.content}>
           {/* <RecipeFilter
          onApply={(category, ingredient) => {
            setSelectedCategory(category);
            setSearchIngredient(ingredient);
          }}
        /> */}

     {loading 
     ? <LoadingSkeleton/>

     :  <Row gutter={[32, 24]} justify="space-evenly" className={styles.row}>
     {recipesList.map((recipe) => (
           <Col span={6} key={recipe.id}>
            <Link href={`/catalog/${recipe.id}`} className={styles.linkContainer}>
             <Button className={styles.imageButton} >
               <Image src={recipe.img_url || '/placeholder.png'} alt={recipe.title}  width={500}
      height={500} />
             </Button>
             <div className={styles.recipeTitle}> {recipe.title}</div>
             </Link>
           </Col>
         ))}
     </Row>
    }
    </Content>
        </Layout>
    );
};

export default Page;