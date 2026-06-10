import React from 'react'
import styles from './Footer.module.scss'

const Footer: React.FC = () => {
  return (
    <footer className={styles.appFooter}>
      
      {/* Журнальная метаинформация сверху */}
      <div className={styles.footerMeta}>
        <span>— end of issue —</span>
        <span>vol. 01 / 2026</span>
        <span>стр. 24</span>
      </div>

      {/* Центральный манифест */}
      <div className={styles.footerManifesto}>
        <p className={styles.footerEyebrow}>— наша философия —</p>
        <h2 className={styles.footerTitle}>
          Стиль — это не вещи.<br />
          <em>Стиль — это ты.</em>
        </h2>
      </div>

      {/* Сетка с колонками */}
      <div className={styles.footerGrid}>
        <div className={styles.footerCol}>
          <p className={styles.footerLogo}>ЗМ</p>
          <p className={styles.footerTagline}>
            платформа о стиле, типажах и осознанном гардеробе
          </p>
        </div>

        <div className={styles.footerCol}>
          <p className={styles.footerColTitle}>метод</p>
          <ul className={styles.footerList}>
            <li><a href="#" className={styles.footerLink}>о методе</a></li>
            <li><a href="#" className={styles.footerLink}>пройти тест</a></li>
            <li><a href="#" className={styles.footerLink}>типажи</a></li>
            <li><a href="#" className={styles.footerLink}>силуэт</a></li>
          </ul>
        </div>

        <div className={styles.footerCol}>
          <p className={styles.footerColTitle}>контент</p>
          <ul className={styles.footerList}>
            <li><a href="#" className={styles.footerLink}>статьи</a></li>
            <li><a href="#" className={styles.footerLink}>гардероб</a></li>
            <li><a href="#" className={styles.footerLink}>аксессуары</a></li>
            <li><a href="#" className={styles.footerLink}>ткани</a></li>
          </ul>
        </div>

        <div className={styles.footerCol}>
          <p className={styles.footerColTitle}>контакты</p>
          <ul className={styles.footerList}>
            <li><a href="#" className={styles.footerLink}>telegram</a></li>
            <li><a href="#" className={styles.footerLink}>вк</a></li>
            <li><a href="#" className={styles.footerLink}>email</a></li>
            <li><a href="#" className={styles.footerLink}>сотрудничество</a></li>
          </ul>
        </div>
      </div>

      {/* Нижняя строка с копирайтом */}
      <div className={styles.footerBottom}>
        <div className={styles.footerLeft}>
          © 2026 ZM. All rights reserved.
        </div>
        <div className={styles.footerCenter}>
          — подготовлено редакцией —
        </div>
        <div className={styles.footerRight}>
          <a href="#" className={styles.footerLink}>Privacy</a>
          <a href="#" className={styles.footerLink}>Terms</a>
        </div>
      </div>

    </footer>
  )
}

export default Footer