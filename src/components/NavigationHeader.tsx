'use client';
import { Menu, Layout, ConfigProvider, MenuProps } from 'antd';
import styles from '@/styles/navigationHeader.module.css';
import Link from 'next/link';
import { useState } from 'react';


const { Header } = Layout;

const NavigationHeader: React.FC = () => {

  const items = [
    {
      label: <Link href="/catalog">Catalog</Link>,
      key: 'catalog',
    },
    {
      label: <Link href="/add-recipe">Add Recipe</Link>,
      key: 'add-recipe',
    },
  ];

  const [current, setCurrent] = useState<string | null>(null);

  const handleMenuClick: MenuProps['onClick'] = (e) => {
    setCurrent(e.key);
  };

  const handleLogoClick = () => {
    setCurrent(null); 
  };

  return (
    <Header className={styles.header}>
    <div className={styles.logo}><Link href={'/'} onClick={handleLogoClick}>My Recipes Book</Link></div>
    <ConfigProvider
  theme={{
    components: {
      Menu: {
        horizontalItemSelectedColor: 'var(--text-secondary)', 
        itemColor:'var(--text-primary)'
      },
    },
  }}
>
  <Menu mode="horizontal" className={styles.menu} items={items} selectedKeys={current ? [current] : []} 
  onClick={handleMenuClick}
  />
</ConfigProvider>
  </Header>
  );
};

export default NavigationHeader;


