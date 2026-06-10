import React, { useEffect, useState } from 'react'
import styles from './WardrobePage.module.scss'
import { type AuthUser } from '../../widgets/auth/AuthModal'
import type { WardrobeItem, Look} from '../wardrobe/types'
import { categoryLabels } from './types'
import { getItems, saveItem, deleteItem, getLooks } from '../wardrobe/wardrobeStorage'
import AddItemModal from './AddItemModal'

interface WardrobePageProps {
  user: AuthUser | null
  onBack: () => void
  onMoreQuestions: () => void
}

type FilterType = 'all' | 'mine' | 'recommendations' | 'favorites'

const WardrobePage: React.FC<WardrobePageProps> = ({ user, onBack}) => {
  const [items, setItems] = useState<WardrobeItem[]>([])
  const [looks, setLooks] = useState<Look[]>([])
  const [filter, setFilter] = useState<FilterType>('all')
  const [isAddOpen, setIsAddOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState<WardrobeItem | null>(null)

  // Загрузка данных
  useEffect(() => {
    const load = async () => {
      const [loadedItems, loadedLooks] = await Promise.all([getItems(), getLooks()])
      setItems(loadedItems)
      setLooks(loadedLooks)
    }
    load()
  }, [])

  const handleSaveItem = async (data: Omit<WardrobeItem, 'id' | 'addedAt'>) => {
    const newItem = await saveItem(data)
    setItems(prev => [...prev, newItem])
    setIsAddOpen(false)
  }

  const handleDeleteItem = async (id: string) => {
    if (!confirm('Удалить эту вещь из гардероба?')) return
    await deleteItem(id)
    setItems(prev => prev.filter(i => i.id !== id))
    setSelectedItem(null)
  }

  // Фильтрация
  const filteredItems = items.filter(item => {
    if (filter === 'all') return true
    if (filter === 'mine') return !item.isRecommendation
    if (filter === 'recommendations') return item.isRecommendation
    return true
  })

  const userKibbeType = user?.kibbeResult?.bodyTypeName
  const featuredLook = looks.find(l => l.isFeatured) || looks[0]
  const restLooks = looks.filter(l => l.id !== featuredLook?.id).slice(0, 4)

  return (
    <div className={styles.wardrobePage}>

      {/* === ШАПКА === */}
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <p className={styles.eyebrow}>— твоё ателье —</p>
          <h1 className={styles.title}>Atelier</h1>
          {userKibbeType && (
            <p className={styles.subtitle}>
              собрано для <b>{userKibbeType.toLowerCase()}</b>
            </p>
          )}
        </div>

        <div className={styles.headerRight}>
          <div className={styles.stats}>
            <b>{items.length}</b> вещей<br />
            <b>{looks.length}</b> луков
          </div>
          <button className={styles.backLink} onClick={onBack}>
            ← в профиль
          </button>
        </div>
      </div>

      {/* === ФИЛЬТРЫ === */}
      <div className={styles.filters}>
        {[
          { id: 'all', label: 'все' },
          { id: 'mine', label: 'мои вещи' },
          { id: 'recommendations', label: 'рекомендации' },
          { id: 'favorites', label: 'избранное' },
        ].map(f => (
          <span
            key={f.id}
            className={`${styles.chip} ${filter === f.id ? styles.chipActive : ''}`}
            onClick={() => setFilter(f.id as FilterType)}
          >
            {f.label}
          </span>
        ))}
      </div>

      {/* === РАЗДЕЛ I: КОЛЛЕКЦИЯ === */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h3 className={styles.sectionTitle}>
            <span className={styles.sectionNum}>— i —</span>
            Коллекция
          </h3>
          <span className={styles.sectionCount}>
            {filteredItems.length} {filteredItems.length === 1 ? 'элемент' : 'элементов'}
          </span>
        </div>

        {filteredItems.length === 0 ? (
          <div className={styles.emptyCollection}>
            <p className={styles.emptyText}>
              {filter === 'mine'
                ? 'Пока нет своих вещей — добавь первую'
                : 'В этой категории пока ничего нет'}
            </p>
            <button
              className={styles.btnAdd}
              onClick={() => setIsAddOpen(true)}
            >
              + добавить вещь
            </button>
          </div>
        ) : (
          <div className={styles.itemsGrid}>
            {filteredItems.map((item, i) => (
              <article
                key={item.id}
                className={`${styles.itemTile} ${getTileSize(i)}`}
                onClick={() => setSelectedItem(item)}
              >
                <div
                  className={styles.itemPhoto}
                  style={{ background: `${item.colour}22` }}
                >
                  <img src={item.photo} alt={item.title} />
                </div>
                <div className={styles.itemOverlay}>
                  <span className={`${styles.itemTag} ${item.isRecommendation ? styles.itemTagRec : ''}`}>
                    {item.isRecommendation ? '— рек. —' : '— моё —'}
                  </span>
                  <h4 className={styles.itemName}>{item.title}</h4>
                </div>
              </article>
            ))}

            {/* Кнопка добавления */}
            <button
              className={`${styles.itemTile} ${styles.itemAdd}`}
              onClick={() => setIsAddOpen(true)}
            >
              <span className={styles.addPlus}>+</span>
              <span className={styles.addText}>— добавить —</span>
            </button>
          </div>
        )}
      </section>

      {/* === РАЗДЕЛ II: ЛУКИ === */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h3 className={styles.sectionTitle}>
            <span className={styles.sectionNum}>— ii —</span>
            Собранные луки
          </h3>
          <span className={styles.sectionCount}>
            {looks.length} {looks.length === 1 ? 'образ' : looks.length < 5 ? 'образа' : 'образов'}
          </span>
        </div>

        {looks.length === 0 ? (
          <div className={styles.emptyLooks}>
            <p className={styles.emptyText}>
              Когда добавишь хотя бы 3 вещи — мы соберём для тебя первые луки
            </p>
            <p className={styles.emptyHint}>
              сейчас у тебя: <b>{items.length}</b> {items.length === 1 ? 'вещь' : 'вещи'}
            </p>
          </div>
        ) : (
          <div className={styles.looksCarousel}>
            {/* Главный лук */}
            {featuredLook && (
              <div className={styles.lookMain}>
                <div className={styles.lookMainGrid}>
                  <div className={styles.lookMainHero}>
                    {featuredLook.cover ? (
                      <img src={featuredLook.cover} alt={featuredLook.name} />
                    ) : (
                      <div className={styles.lookMainPlaceholder} />
                    )}
                    <span className={styles.lookMainTag}>— главное —</span>
                  </div>
                  <div className={styles.lookMainPieces}>
                    {featuredLook.itemIds.slice(0, 2).map((id, i) => {
                      const item = items.find(it => it.id === id)
                      if (!item) return <div key={i} className={styles.lookPiecePlaceholder} />
                      return (
                        <div key={id} className={styles.lookPiece}>
                          <img src={item.photo} alt={item.title} />
                        </div>
                      )
                    })}
                  </div>
                </div>
                <div className={styles.lookMeta}>
                  <p className={styles.lookNum}>— look 01 · {featuredLook.name.toLowerCase()} —</p>
                  <h4 className={styles.lookName}>{featuredLook.name}</h4>
                  {featuredLook.description && (
                    <p className={styles.lookDesc}>{featuredLook.description}</p>
                  )}
                </div>
              </div>
            )}

            {/* Маленькие луки */}
            {restLooks.map((look, i) => (
              <div key={look.id} className={styles.lookSmall}>
                <div className={styles.lookSmallGrid}>
                  {look.itemIds.slice(0, 4).map(id => {
                    const item = items.find(it => it.id === id)
                    return (
                      <div key={id} className={styles.lookSmallPiece}>
                        {item && <img src={item.photo} alt={item.title} />}
                      </div>
                    )
                  })}
                </div>
                <h4 className={styles.lookSmallName}>{look.name}</h4>
                <span className={styles.lookSmallMeta}>
                  — look 0{i + 2} · {look.itemIds.length} вещей —
                </span>
              </div>
            ))}

            {/* Добавление лука */}
            <button className={styles.addLook}>
              <span className={styles.addPlus}>+</span>
              <span className={styles.addText}>
                — собрать <br />новый лук —
              </span>
            </button>
          </div>
        )}
      </section>

      {/* === МОДАЛКА ДОБАВЛЕНИЯ === */}
      {isAddOpen && (
        <AddItemModal
          onClose={() => setIsAddOpen(false)}
          onSave={handleSaveItem}
        />
      )}

      {/* === МОДАЛКА ПРОСМОТРА ВЕЩИ === */}
      {selectedItem && (
        <ItemDetailModal
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
          onDelete={handleDeleteItem}
        />
      )}
    </div>
  )
}

// Утилита для разных размеров плиток (мозаика)
const getTileSize = (i: number): string => {
  const pattern = ['', styles.itemTileTall, '', styles.itemTileWide, '', '', styles.itemTileTall, '', '']
  return pattern[i % pattern.length] || ''
}

// === МОДАЛКА ПРОСМОТРА ВЕЩИ ===
const ItemDetailModal: React.FC<{
  item: WardrobeItem
  onClose: () => void
  onDelete: (id: string) => void
}> = ({ item, onClose, onDelete }) => (
  <div className={styles.detailOverlay} onClick={onClose}>
    <div className={styles.detailModal} onClick={(e) => e.stopPropagation()}>
      <button className={styles.detailClose} onClick={onClose}>×</button>

      <div
        className={styles.detailPhoto}
        style={{ background: `${item.colour}22` }}
      >
        <img src={item.photo} alt={item.title} />
      </div>

      <div className={styles.detailInfo}>
        <p className={styles.detailEyebrow}>
          — {categoryLabels[item.category]} —
        </p>
        <h2 className={styles.detailTitle}>{item.title}</h2>

        <div className={styles.detailMeta}>
          {item.brand && (
            <div>
              <span className={styles.detailLabel}>бренд:</span> {item.brand}
            </div>
          )}
          <div>
            <span className={styles.detailLabel}>цвет:</span>
            <span
              className={styles.detailColour}
              style={{ background: item.colour }}
            /> {item.colour}
          </div>
          {item.notes && (
            <div>
              <span className={styles.detailLabel}>заметка:</span> {item.notes}
            </div>
          )}
        </div>

        <button
          className={styles.detailDelete}
          onClick={() => onDelete(item.id)}
        >
          удалить из гардероба
        </button>
      </div>
    </div>
  </div>
)

export default WardrobePage