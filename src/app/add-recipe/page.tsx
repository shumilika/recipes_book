'use client';
import React, { useState } from 'react';
import { Input, Button, Form, Select, Upload, Row, Col, Space } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
// import { useRouter } from 'next/router';
import styles from '@/styles/addRecipePage.module.css'

const { TextArea } = Input;

const page: React.FC = () => {
  // const router = useRouter();
  const [ingredients, setIngredients] = useState<string[]>(['']);
  const [form] = Form.useForm();

  // Добавление нового ингредиента
  const addIngredient = () => {
    setIngredients([...ingredients, '']);
  };

  // Удаление ингредиента
  const removeIngredient = (index: number) => {
    const newIngredients = ingredients.filter((_, i) => i !== index);
    setIngredients(newIngredients);
  };

  // Обработка отправки формы
  const onFinish = (values: any) => {
    console.log(values);
    // Здесь будет код для отправки данных на сервер или в Firebase
    // router.push('/catalog'); // Перенаправление в каталог после сохранения
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
            {/* Добавьте другие категории по мере необходимости */}
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
          name="steps"
          rules={[{ required: true, message: 'Please enter the preparation steps!' }]}
        >
          <TextArea
            placeholder="Enter the preparation steps"
            rows={4}
          />
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
