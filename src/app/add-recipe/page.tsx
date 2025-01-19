'use client';
import React, { useState } from 'react';
import { Input, Button, Form, Select, Upload, Row, Col } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import styles from '@/styles/addRecipePage.module.css'


const page: React.FC = () => {

  const [ingredients, setIngredients] = useState<string[]>(['']);
  const [steps, setSteps] = useState<string[]>(['']);
  const [form] = Form.useForm();


  const addIngredient = () => {
    setIngredients([...ingredients, '']);
  };


  const removeIngredient = (index: number) => {
    const newIngredients = ingredients.filter((_, i) => i !== index);
    setIngredients(newIngredients);
  };

  const handleStepChange = (value: string, index: number) => {
    const newSteps = [...steps];
    newSteps[index] = value;
    setSteps(newSteps);
  };

  const addStep = () => setSteps([...steps, ""]);
  const removeStep = (index: number) => {
    const newSteps = steps.filter((_, i) => i !== index);
    setSteps(newSteps);
  };

  const onFinish = (values: any) => {
    console.log(values);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Add a New Recipe</h2>
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
          <Input placeholder="Enter recipe name" />
        </Form.Item>

        <Form.Item
          label="Category"
          name="category"
          rules={[{ required: true, message: 'Please select a category!' }]}
        >
          <Select placeholder="Select category">
            <Select.Option value="dessert">Dessert</Select.Option>
            <Select.Option value="main-course">Main Course</Select.Option>
            <Select.Option value="snack">Snack</Select.Option>
            
          </Select>
        </Form.Item>

        <Form.Item
          label="Ingredients"
        >
          {ingredients.map((ingredient, index) => (
            <Row key={index} gutter={16} align="middle">
              <Col span={18}>
                <Input
                  placeholder="Enter ingredient"
                  value={ingredient}
                  onChange={(e) => {
                    const newIngredients = [...ingredients];
                    newIngredients[index] = e.target.value;
                    setIngredients(newIngredients);
                  }}
                />
              </Col>
              <Col span={6}>
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
          rules={[{ required: true, message: 'Please enter the preparation steps!' }]}
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
          <Input placeholder="Enter url" />
        </Form.Item>
        
        <Form.Item label="Upload Image" name="image">
          <Upload
            name="image"
            action="/upload"
            listType="picture-card"
            showUploadList={false}
          >
            <Button icon={<UploadOutlined />}>Upload Image</Button>
          </Upload>

         
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
