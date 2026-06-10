// === КАТЕГОРИИ ===
export type ArticleCategory = 'types' | 'trends' | 'brands' | 'stories' | 'tips'

// === БАЗОВАЯ СТАТЬЯ (для ленты) ===
export interface Article {
  id: string
  title: string
  deck: string
  category: ArticleCategory
  categoryLabel: string
  author: string
  readTime: number
  publishedAt: string
  imageGradient?: string
  forKibbeTypes?: string[]
  isFeatured?: boolean
}

// === БЛОКИ КОНТЕНТА (для отдельной статьи) ===
export type BlockType =
  | { type: 'paragraph'; text: string }
  | { type: 'heading'; text: string; id: string }
  | { type: 'quote'; text: string; author?: string }
  | { type: 'image'; src?: string; gradient?: string; caption?: string }
  | { type: 'list'; items: string[] }

// === ПОЛНАЯ СТАТЬЯ С КОНТЕНТОМ ===
export interface FullArticle extends Article {
  content: BlockType[]
}