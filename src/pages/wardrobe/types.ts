export type WardrobeCategory = 'dress' | 'top' | 'bottom' | 'outerwear' | 'shoes' | 'accessory'

export interface WardrobeItem {
  id: string
  title: string
  category: WardrobeCategory
  photo: string              // base64 PNG с прозрачным фоном
  colour: string             // hex
  brand?: string
  notes?: string
  isRecommendation?: boolean // если это рекомендация платформы
  sourceUrl?: string         // ссылка на товар (для рекомендаций)
  addedAt: string            // ISO дата
}

export interface Look {
  id: string
  name: string
  description?: string
  itemIds: string[]          // ID вещей из гардероба
  cover?: string             // base64 коллажа
  createdAt: string
  isFeatured?: boolean       // главный лук дня
}

export const categoryLabels: Record<WardrobeCategory, string> = {
  dress: 'платья',
  top: 'верх',
  bottom: 'низ',
  outerwear: 'верхняя',
  shoes: 'обувь',
  accessory: 'аксессуары',
}

export const categoryLabelsSingular: Record<WardrobeCategory, string> = {
  dress: 'платье',
  top: 'верх',
  bottom: 'низ',
  outerwear: 'верхняя одежда',
  shoes: 'обувь',
  accessory: 'аксессуар',
}