
export type KibbeBase =
  | 'dramatic'
  | 'natural'
  | 'classic'
  | 'romantic'
  | 'gamine'

export type FaceType =
  | 'sharp'      // острое, графичное
  | 'broad'      // широкое, открытое
  | 'balanced'   // сбалансированное
  | 'soft'       // мягкое, округлое
  | 'compact'    // компактное, контрастное

export type ColourSeason =
  | 'deepWinter'   | 'trueWinter'  | 'coolWinter'
  | 'lightSpring'  | 'trueSpring'  | 'warmSpring'
  | 'lightSummer'  | 'trueSummer'  | 'coolSummer'
  | 'softAutumn'   | 'trueAutumn'  | 'deepAutumn'

export type ColourScores = {
  // По температуре
  warm: number
  cool: number
  neutral: number
  // По насыщенности
  bright: number
  muted: number
  // По светлоте
  light: number
  deep: number
}


export type Aesthetic =
  | 'oldMoney'      // классическая роскошь, тихая
  | 'darkAcademia'  // твид, библиотеки, винтаж
  | 'coastal'       // лён, море, простота
  | 'cleanGirl'     // минимализм, гладкость
  | 'boho'          // свобода, этника
  | 'urban'         // city sleek, графичность
  | 'romantic_aesthetic'        // винтаж, цветы, мягкость
  | 'eclectic'      // свой микс


export type StepLayer = 'body' | 'face' | 'colour' | 'aesthetic'

export type TestTags = {
  // Кибби
  dramatic?: number
  natural?: number
  classic?: number
  romantic?: number
  gamine?: number
  // Лицо
  face_sharp?: number
  face_broad?: number
  face_balanced?: number
  face_soft?: number
  face_compact?: number
  // Цвет
  warm?: number
  cool?: number
  neutral?: number
  bright?: number
  muted?: number
  light?: number
  deep?: number
  // Эстетика
  oldMoney?: number
  darkAcademia?: number
  coastal?: number
  cleanGirl?: number
  boho?: number
  urban?: number
  romantic_aesthetic?: number
  eclectic?: number
}

export type StepOption = {
  label: string
  tags: TestTags
}

export type Step = {
  id: string
  layer: StepLayer
  label: string
  title: string
  subtitle: string
  options: StepOption[]
}


export interface KibbeResult {
  // Тело
  bodyPrimary: KibbeBase
  bodySecondary?: KibbeBase
  bodyTypeName: string
  bodyChapter: string
  bodyDescription: string
  bodyTraits: string[]
  
  // Лицо (опционально, если прошёл этот слой)
  faceType?: FaceType
  faceTypeName?: string
  faceDescription?: string
  
  // Цвет (опционально)
  colourSeason?: ColourSeason
  colourSeasonName?: string
  colourPalette?: string[]    // массив hex-цветов
  colourDescription?: string
  
  
  aestheticPrimary?: Aesthetic
  aestheticSecondary?: Aesthetic
  aestheticName?: string
  aestheticDescription?: string
  
  
  scores: TestTags  // полные баллы для отладки
  layersCompleted: StepLayer[]
  answeredAt: string
}