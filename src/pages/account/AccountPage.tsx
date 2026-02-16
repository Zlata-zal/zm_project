import React from 'react'
import styles from './AccountPage.module.scss'

interface AccountPageProps {
  user: {
    email: string
    name?: string
  }
  onLogout: () => void
}

const AccountPage: React.FC<AccountPageProps> = ({ user, onLogout }) => {
  return (
    <section className={styles.accountPage}>
      <p className={styles.eyebrow}>ACCOUNT</p>
      <h1 className={styles.title}>Welcome{user.name ? `, ${user.name}` : ''}!</h1>
      <p className={styles.subtitle}>
        You’re signed in as <span className={styles.email}>{user.email}</span>.
      </p>

      <div className={styles.card}>
        <div className={styles.row}>
          <span className={styles.label}>Name</span>
          <span className={styles.value}>{user.name || '—'}</span>
        </div>
        <div className={styles.row}>
          <span className={styles.label}>Email</span>
          <span className={styles.value}>{user.email}</span>
        </div>

        <div className={styles.actions}>
          <button className={styles.logoutButton} onClick={onLogout}>
            Log out
          </button>
        </div>
      </div>
    </section>
  )
}

export default AccountPage

