'use client';
import { Button, Dropdown, Input, Menu, Select } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import { categories } from '@/constants/constants';

const { Option } = Select;

interface RecipeFilterProps {
  onApply: (category: string | null, ingredient: string) => void;
}

const RecipeFilter: React.FC<RecipeFilterProps> = ({ onApply }) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchIngredient, setSearchIngredient] = useState<string>('');
  const [open, setOpen] = useState(false);

  const handleApplyFilters = () => {
    onApply(selectedCategory, searchIngredient);
    setOpen(false); // Close the menu after applying filters
  };

  const menu = (
    <Menu>
      <Menu.Item key="category">
        <label>Category:</label>
        <Select
          value={selectedCategory}
          onChange={(value) => setSelectedCategory(value)}
          style={{ width: '100%' }}
          allowClear
          placeholder="Select Category"
        >
          {categories.map((category) => (
            <Option key={category} value={category}>
              {category}
            </Option>
          ))}
        </Select>
      </Menu.Item>

      <Menu.Item key="ingredient">
        <label>Ingredient:</label>
        <Input
          placeholder="Enter ingredient name"
          value={searchIngredient}
          onChange={(e) => setSearchIngredient(e.target.value)}
        />
      </Menu.Item>

      <Menu.Divider />

      <Menu.Item key="apply">
        <Button type="primary" block onClick={handleApplyFilters}>
          Apply Filters
        </Button>
      </Menu.Item>
      <Menu.Item key="clear">
        <Button block onClick={() => {
          setSelectedCategory(null);
          setSearchIngredient('');
          handleApplyFilters();
        }}>
          Clear Filters
        </Button>
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown overlay={menu} trigger={['click']} open={open} onOpenChange={setOpen}>
      <Button type="primary">
        Filter <DownOutlined />
      </Button>
    </Dropdown>
  );
};

export default RecipeFilter;
