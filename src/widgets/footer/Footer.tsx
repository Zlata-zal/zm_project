import React from 'react'
import styles from './Footer.module.scss'

const Footer: React.FC = () => {
  return (
    <footer className={styles.appFooter}>
      <div className={styles.footerLeft}>© 2026 ZM. All rights reserved.</div>
      <div className={styles.footerRight}>
        <a href="#" className={styles.footerLink}>
          Privacy
        </a>
        <a href="#" className={styles.footerLink}>
          Terms
        </a>
      </div>
    </footer>
  )
}

export default Footer
