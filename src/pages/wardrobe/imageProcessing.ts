import {removeBackground} from '@imgly/background-removal'

/**
 * Удаляет фон с фотографии
 * Возвращает PNG-Blob с прозрачным фоном
 */
export const removeImageBackground = async (
  file: File,
  onProgress?: (progress: number) => void
): Promise<Blob> => {
  const blob = await removeBackground(file, {
    progress: (_key, current, total) => {
      if (onProgress) {
        const progress = Math.round((current / total) * 100)
        onProgress(progress)
      }
    },
  })
  return blob
}

/**
 * Конвертирует Blob в base64 строку
 */
export const blobToBase64 = (blob: Blob): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onloadend = () => resolve(reader.result as string)
    reader.onerror = reject
    reader.readAsDataURL(blob)
  })
}

/**
 * Сжимает изображение до нужного размера
 * @param base64 — исходная картинка в base64
 * @param maxWidth — максимальная ширина в пикселях
 */
export const compressImage = async (base64: string, maxWidth = 400): Promise<string> => {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => {
      const canvas = document.createElement('canvas')
      const scale = Math.min(maxWidth / img.width, 1)
      canvas.width = img.width * scale
      canvas.height = img.height * scale

      const ctx = canvas.getContext('2d')
      if (!ctx) {
        reject(new Error('Не удалось создать canvas'))
        return
      }

      ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
      resolve(canvas.toDataURL('image/png'))
    }
    img.onerror = () => reject(new Error('Не удалось загрузить изображение'))
    img.src = base64
  })
}

/**
 * Извлекает основной цвет из изображения (среднее значение пикселей)
 * Полезно для авто-определения цвета вещи
 */
export const extractDominantColour = async (base64: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => {
      const canvas = document.createElement('canvas')
      canvas.width = 50
      canvas.height = 50
      const ctx = canvas.getContext('2d')
      if (!ctx) {
        reject(new Error('Не удалось создать canvas'))
        return
      }
      ctx.drawImage(img, 0, 0, 50, 50)
      
      const data = ctx.getImageData(0, 0, 50, 50).data
      let r = 0, g = 0, b = 0, count = 0
      
      for (let i = 0; i < data.length; i += 4) {
        // Пропускаем прозрачные пиксели
        if (data[i + 3] < 200) continue
        r += data[i]
        g += data[i + 1]
        b += data[i + 2]
        count++
      }
      
      if (count === 0) {
        resolve('#cccccc')
        return
      }
      
      r = Math.round(r / count)
      g = Math.round(g / count)
      b = Math.round(b / count)
      
      const hex = '#' + [r, g, b].map(x => x.toString(16).padStart(2, '0')).join('')
      resolve(hex)
    }
    img.onerror = () => reject(new Error('Не удалось загрузить изображение'))
    img.src = base64
  })
}