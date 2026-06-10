import type { WardrobeItem, Look } from '../wardrobe/types'

const ITEMS_KEY = 'zm_wardrobe_items'
const LOOKS_KEY = 'zm_wardrobe_looks'

// === ВЕЩИ ===

export const getItems = async (): Promise<WardrobeItem[]> => {
  try {
    const raw = localStorage.getItem(ITEMS_KEY)
    if (!raw) return []
    return JSON.parse(raw) as WardrobeItem[]
  } catch {
    return []
  }
}

export const saveItem = async (item: Omit<WardrobeItem, 'id' | 'addedAt'>): Promise<WardrobeItem> => {
  const newItem: WardrobeItem = {
    ...item,
    id: `item_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`,
    addedAt: new Date().toISOString(),
  }
  const items = await getItems()
  items.push(newItem)
  localStorage.setItem(ITEMS_KEY, JSON.stringify(items))
  return newItem
}

export const deleteItem = async (id: string): Promise<void> => {
  const items = await getItems()
  const filtered = items.filter(i => i.id !== id)
  localStorage.setItem(ITEMS_KEY, JSON.stringify(filtered))
}

export const updateItem = async (id: string, updates: Partial<WardrobeItem>): Promise<void> => {
  const items = await getItems()
  const idx = items.findIndex(i => i.id === id)
  if (idx === -1) return
  items[idx] = { ...items[idx], ...updates }
  localStorage.setItem(ITEMS_KEY, JSON.stringify(items))
}

// === ЛУКИ ===

export const getLooks = async (): Promise<Look[]> => {
  try {
    const raw = localStorage.getItem(LOOKS_KEY)
    if (!raw) return []
    return JSON.parse(raw) as Look[]
  } catch {
    return []
  }
}

export const saveLook = async (look: Omit<Look, 'id' | 'createdAt'>): Promise<Look> => {
  const newLook: Look = {
    ...look,
    id: `look_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`,
    createdAt: new Date().toISOString(),
  }
  const looks = await getLooks()
  looks.push(newLook)
  localStorage.setItem(LOOKS_KEY, JSON.stringify(looks))
  return newLook
}

export const deleteLook = async (id: string): Promise<void> => {
  const looks = await getLooks()
  const filtered = looks.filter(l => l.id !== id)
  localStorage.setItem(LOOKS_KEY, JSON.stringify(filtered))
}