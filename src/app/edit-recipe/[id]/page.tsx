'use client';
import React, { useEffect, useState } from 'react';
import { Input, Button, Form, Select, Row, Col, InputNumber } from 'antd';
import styles from '@/styles/addRecipePage.module.css'
import UploadImg from '@/components/UploadImg';
import { categories, units } from '@/constants/constants';
import { doc, updateDoc } from '@firebase/firestore';
import { db } from '@/services/firebase.config';
import { useParams, useRouter } from 'next/navigation';
import { useAppSelector } from '../../hooks';


interface Ingredient {
  amount: number;
  name: string;
  units: string;
}


const page: React.FC = () => {
  
  const { id: recipeId } = useParams() as {id: string}
  const { currentRecipe } = useAppSelector((state) => state.recipes);
  const [name, setName] = useState<string>('')
  const [category, setCategory] = useState<string>('')
  const [url, setUrl] = useState<string>('')
  const [ingredients, setIngredients] = useState<
    { amount: number; name: string; units: string }[]
  >([{ amount: 0, name: '', units: '' }]);
  const [steps, setSteps] = useState<string[]>([''])
  const [imgUrl, setImgUrl] = useState<string>('')
  const [form] = Form.useForm();
  const router = useRouter()

  useEffect(() => {
    if (currentRecipe) {
      setName(currentRecipe.title || '');
      setCategory(currentRecipe.category || '');
      setUrl(currentRecipe.origin || '');
      setIngredients(currentRecipe.ingredients || [{ amount: 0, name: '', units: '' }]);
      setSteps(currentRecipe.cooking_steps || ['']);
      setImgUrl(currentRecipe.img_url || '');

     
      form.setFieldsValue({
        name: currentRecipe.title,
        category: currentRecipe.category,
        url: currentRecipe.origin,
        image: currentRecipe.img_url,
      });
    }
  }, [currentRecipe, form]);

 

  const ImgUrlOnChange = (value:string) => {
    setImgUrl(value)
  }

  const nameOnChange = (value:string) => {
    setName(value)
  }

  const categoryOnChange = (value:string) => {
    setCategory(value)
  }
  const urlOnChange = (value:string) => {
    setUrl(value)
  }

  const addIngredient = () => {
    setIngredients([...ingredients, { amount: 0, name: '', units: '' }]);
  }

  const removeIngredient = (index: number) => {
    const newIngredients = ingredients.filter((_, i) => i !== index);
    setIngredients(newIngredients);
  }

  const updateIngredient = (
    index: number,
    field: keyof Ingredient,
    value: string | number
  ) => {
    setIngredients((prevIngredients) =>
      prevIngredients.map((ingredient, i) =>
        i === index ? { ...ingredient, [field]: value } : ingredient
      )
    );
  };

  const handleStepChange = (value: string, index: number) => {
    const newSteps = [...steps];
    newSteps[index] = value;
    setSteps(newSteps);
  }

  const addStep = () => setSteps([...steps, ""]);

  const removeStep = (index: number) => {
    const newSteps = steps.filter((_, i) => i !== index);
    setSteps(newSteps);
  }

  const onFinish = async () => {
     
    const updateRecipe = {
      title:name,
      category,
      cooking_steps:steps,
      img_url:imgUrl,
      ingredients,
      origin:url,
    }
    
    try{
       await updateDoc(doc(db, "recipes",recipeId), updateRecipe)
      router.push(`/catalog/${recipeId}`)
    }
    catch(error){

    }
    
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Edit the Recipe</h2>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        className={styles.form}
      >
        <Form.Item
          label="Recipe Name"
          name="name"
          rules={[{ required: true, message: 'Please enter the recipe name!' }]}
        >
          <Input placeholder="Enter recipe name" value={name} onChange={(event)=>nameOnChange(event.target.value)} />
        </Form.Item>

        <Form.Item
          label="Category"
          name="category"
          rules={[{ required: true, message: 'Please select a category!' }]}
        >
          <Select placeholder="Select category"
            onChange={categoryOnChange}
          >{categories.map((category, index)=>
             <Select.Option value={category} key={index}>{category}</Select.Option>
          )}            
          </Select>
        </Form.Item>

        <Form.Item label="Ingredients"
          // rules={[{ required: true, message: 'Please enter ingredients!' }]}
        >
      {ingredients.map((ingredient, index) => (
        <Row key={index} gutter={16} align="middle">
          <Col span={3}>
            <InputNumber
              placeholder="Amount"
              min={1}
              value={ingredient.amount}
              onChange={(value) => updateIngredient(index, 'amount', value || 1)}
            />
          </Col>
          <Col span={12}>
            <Input
              placeholder="Ingredient name"
              value={ingredient.name}
              onChange={(e) =>
                updateIngredient(index, 'name', e.target.value)
              }
            />
          </Col>
          <Col span={4}>
            <Select
              placeholder="Units"
              value={ingredient.units}
              onChange={(value) => updateIngredient(index, 'units', value)}
            >
              {units.map((unit, index)=>
              <Select.Option value={unit} key={index}>{unit}</Select.Option>
              )}
            </Select>
          </Col>
          <Col span={2}>
            <Button
              danger
              onClick={() => removeIngredient(index)}
              type="text"
            >
              Remove
            </Button>
          </Col>
        </Row>
      ))}
      <Button type="dashed" onClick={addIngredient} block>
        Add Ingredient
      </Button>
    </Form.Item>

        

        <Form.Item
          label="Preparation Steps"
          // rules={[{ required: true, message: 'Please enter the preparation steps!' }]}
        >
        {steps.map((step, index) => (
         <Row key={index} gutter={16} align="middle">
              <Col span={18}>
          <Input
            value={step}
            onChange={(e) => handleStepChange(e.target.value, index)}
            placeholder={`Step ${index + 1}`}
          />
          </Col>
          <Col span={6}>
          <Button onClick={() => removeStep(index)} type='text' danger>
            Remove
          </Button>
          </Col>
          </Row>
        
      ))}
      <Button onClick={addStep} type="dashed" block>
        Add Step
      </Button>
        </Form.Item>

        <Form.Item
          label="Origin url"
          name="url"
          rules={[{  message: 'Please enter origin url!' }]}
        >
          <Input placeholder="Enter url" value={url} onChange={(event)=>urlOnChange(event.target.value)}/>
        </Form.Item>
        
        <Form.Item name="image" >
          <UploadImg setUrl={ImgUrlOnChange} />
        </Form.Item>


        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Save Recipe
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default page;
