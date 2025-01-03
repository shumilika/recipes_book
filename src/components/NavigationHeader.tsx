'use client';
import { Menu, Layout } from 'antd';
import styles from '@/styles/navigationHeader.module.css';
import Link from 'next/link';

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

  return (
    <Header className={styles.header}>
    <div className={styles.logo}><Link href={'/'}>My Recipes Book</Link></div>
    <Menu mode="horizontal" className={styles.menu} items={items} />
  </Header>
  );
};

export default NavigationHeader;


