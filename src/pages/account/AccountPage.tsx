import React from 'react'
import styles from './AccountPage.module.scss'
import { type AuthUser } from '../../widgets/auth/AuthModal'

interface AccountPageProps {
  user: AuthUser
  onLogout: () => void
  onOpenWardrobe: () => void
  onRefine: () => void
}

const AccountPage: React.FC<AccountPageProps> = ({
  user,
  onLogout,
  onOpenWardrobe,
  onRefine,
}) => {
  return (
    <section className={styles.accountPage}>
      <p className={styles.eyebrow}>ACCOUNT</p>
      <h1 className={styles.title}>Welcome{user.name ? `, ${user.name}` : ''}!</h1>
      <p className={styles.subtitle}>
        You’re signed in as <span className={styles.email}>{user.email}</span>.
      </p>

      <div className={styles.iconRow}>
        <button
          type="button"
          className={styles.iconButton}
          aria-label="Your wardrobe"
          onClick={onOpenWardrobe}
        >
          🧥
        </button>
        <button
          type="button"
          className={styles.iconButton}
          aria-label="Refine answers"
          onClick={onRefine}
        >
          ✏️
        </button>
      </div>

      <div className={styles.columns}>
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

        <div className={styles.figureCard}>
          <p className={styles.figureTitle}>Body parameters</p>
          <div className={styles.row}>
            <span className={styles.label}>Height</span>
            <span className={styles.value}>
              {user.body?.heightCm != null ? `${user.body.heightCm} cm` : '— cm'}
            </span>
          </div>
          <div className={styles.row}>
            <span className={styles.label}>Shoulders</span>
            <span className={styles.value}>
              {user.body?.shouldersCm != null ? `${user.body.shouldersCm} cm` : '— cm'}
            </span>
          </div>
          <div className={styles.row}>
            <span className={styles.label}>Waist</span>
            <span className={styles.value}>
              {user.body?.waistCm != null ? `${user.body.waistCm} cm` : '— cm'}
            </span>
          </div>
          <div className={styles.row}>
            <span className={styles.label}>Hips</span>
            <span className={styles.value}>
              {user.body?.hipsCm != null ? `${user.body.hipsCm} cm` : '— cm'}
            </span>
          </div>
          <div className={styles.row}>
            <span className={styles.label}>Body shape</span>
            <span className={styles.value}>{user.body?.shape ?? '—'}</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AccountPage

