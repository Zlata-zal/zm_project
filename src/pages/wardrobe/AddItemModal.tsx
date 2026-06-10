import React, { useState } from 'react'
import styles from './AddItemModal.module.scss'
import type { WardrobeCategory, WardrobeItem } from './types'
import { categoryLabels } from './types'
import { removeImageBackground, blobToBase64, compressImage, extractDominantColour } from '../wardrobe/imageProcessing'

interface AddItemModalProps {
  onClose: () => void
  onSave: (item: Omit<WardrobeItem, 'id' | 'addedAt'>) => void
}

// Пресеты цветов
const COLOUR_PRESETS = [
  '#5c1e1f', '#2c1810', '#383d41', '#000000',
  '#c9a96e', '#d8c4a8', '#efead4', '#ffffff',
  '#c4988a', '#963132', '#7f4f24', '#4a3018',
  '#2e0a0b', '#555e63', '#8e979e', '#a8a59a',
]

const AddItemModal: React.FC<AddItemModalProps> = ({ onClose, onSave }) => {
  const [photo, setPhoto] = useState<string | null>(null)
  const [processing, setProcessing] = useState(false)
  const [progress, setProgress] = useState(0)
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState<WardrobeCategory>('dress')
  const [colour, setColour] = useState('#5c1e1f')
  const [brand, setBrand] = useState('')
  const [notes, setNotes] = useState('')

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setProcessing(true)
    setProgress(0)

    try {
      // Шаг 1: удаляем фон
      const blob = await removeImageBackground(file, (p) => setProgress(p))

      // Шаг 2: конвертируем в base64
      const base64 = await blobToBase64(blob)

      // Шаг 3: сжимаем до 400px
      const compressed = await compressImage(base64, 400)

      setPhoto(compressed)

      // Шаг 4: пытаемся определить цвет автоматически
      try {
        const dominantColour = await extractDominantColour(compressed)
        setColour(dominantColour)
      } catch {
        // Игнорируем, оставляем дефолтный цвет
      }
    } catch (err) {
      console.error('Ошибка обработки фото:', err)
      alert('Не удалось обработать фото. Попробуй другое.')
    } finally {
      setProcessing(false)
    }
  }

  const handleSave = () => {
    if (!photo) {
      alert('Сначала загрузи фото')
      return
    }
    if (!title.trim()) {
      alert('Введи название вещи')
      return
    }

    onSave({
      title: title.trim(),
      category,
      photo,
      colour,
      brand: brand.trim() || undefined,
      notes: notes.trim() || undefined,
    })
  }

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>

        <button className={styles.closeBtn} onClick={onClose}>×</button>

        <p className={styles.eyebrow}>— добавить вещь в гардероб —</p>
        <h2 className={styles.title}>Новая вещь</h2>

        {/* === ЗОНА ФОТО === */}
        <div className={styles.photoZone}>
          {processing ? (
            // Обработка
            <div className={styles.processing}>
              <div className={styles.spinner} />
              <p className={styles.processingText}>— обрабатываем фото —</p>
              <p className={styles.processingMeta}>
                убираем фон · {progress}%
              </p>
            </div>
          ) : photo ? (
            // Готовое превью
            <div className={styles.preview}>
              <img src={photo} alt="" />
              <button
                className={styles.previewClose}
                onClick={() => setPhoto(null)}
              >
                переснять
              </button>
            </div>
          ) : (
            // Загрузка
            <label className={styles.uploadLabel}>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className={styles.fileInput}
              />
              <span className={styles.uploadIcon}>+</span>
              <p className={styles.uploadText}>
                <b>загрузить фото</b>
                <br />
                или сфотографировать
              </p>
              <span className={styles.uploadMeta}>— фон уберём автоматически —</span>
            </label>
          )}
        </div>

        {!processing && (
          <>
            {/* Подсказки по фото */}
            {!photo && (
              <div className={styles.tips}>
                <p className={styles.tipsTitle}>— как лучше сфотографировать —</p>
                <ul className={styles.tipsList}>
                  <li>положи вещь на однотонную поверхность</li>
                  <li>используй дневной свет</li>
                  <li>фотографируй прямо сверху</li>
                </ul>
              </div>
            )}

            {/* НАЗВАНИЕ */}
            <div className={styles.field}>
              <label className={styles.fieldLabel}>— название —</label>
              <input
                type="text"
                className={`${styles.fieldInput} ${title ? styles.fieldInputFilled : ''}`}
                placeholder="Шёлковое платье миди"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            {/* КАТЕГОРИЯ */}
            <div className={styles.field}>
              <label className={styles.fieldLabel}>— категория —</label>
              <div className={styles.categoriesGrid}>
                {(Object.keys(categoryLabels) as WardrobeCategory[]).map((cat) => (
                  <span
                    key={cat}
                    className={`${styles.catChip} ${category === cat ? styles.catChipActive : ''}`}
                    onClick={() => setCategory(cat)}
                  >
                    {categoryLabels[cat]}
                  </span>
                ))}
              </div>
            </div>

            {/* ЦВЕТ */}
            <div className={styles.field}>
              <label className={styles.fieldLabel}>— основной цвет —</label>
              <div className={styles.colourRow}>
                {COLOUR_PRESETS.map((c) => (
                  <button
                    key={c}
                    className={`${styles.colourSwatch} ${colour === c ? styles.colourSwatchActive : ''}`}
                    style={{ background: c }}
                    onClick={() => setColour(c)}
                  />
                ))}
              </div>
            </div>

            {/* БРЕНД + ЗАМЕТКА */}
            <div className={styles.fieldRow}>
              <div className={styles.field}>
                <label className={styles.fieldLabel}>— бренд —</label>
                <input
                  type="text"
                  className={`${styles.fieldInput} ${brand ? styles.fieldInputFilled : ''}`}
                  placeholder="Sandro, COS..."
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                />
              </div>

              <div className={styles.field}>
                <label className={styles.fieldLabel}>— заметка —</label>
                <input
                  type="text"
                  className={`${styles.fieldInput} ${notes ? styles.fieldInputFilled : ''}`}
                  placeholder="любимое..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
              </div>
            </div>

            {/* КНОПКИ */}
            <div className={styles.actions}>
              <button className={styles.btnCancel} onClick={onClose}>отмена</button>
              <button
                className={styles.btnSave}
                onClick={handleSave}
                disabled={!photo || !title.trim()}
              >
                сохранить →
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default AddItemModal