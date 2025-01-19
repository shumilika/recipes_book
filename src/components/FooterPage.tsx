import React from 'react';
import styles from "@/styles/page.module.css";

const FooterPage:React.FC = () => {
    return (
        <footer className={styles.footer}>
        <p>
            <a
              href="https://github.com/shumilika"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.footerLink}
            >
              GitHub
            </a>
            , 2025
          </p>
        </footer>
    );
};

export default FooterPage;