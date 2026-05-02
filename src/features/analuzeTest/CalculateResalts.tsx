import type {
  KibbeBase, FaceType, ColourSeason, Aesthetic,
  KibbeResult, StepOption, TestTags, StepLayer
} from '../../pages/test/types'
import { bodyTypes, faceTypes, colourSeasons, aesthetics } from '../../pages/test/KibbaData'

export function calculateResult(
  answers: StepOption[],
  layersCompleted: StepLayer[]
): KibbeResult {
  // Суммируем все теги
  const scores: TestTags = {}
  answers.forEach(answer => {
    Object.entries(answer.tags).forEach(([key, value]) => {
      scores[key as keyof TestTags] = (scores[key as keyof TestTags] || 0) + (value || 0)
    })
  })

  // === ТЕЛО ===
  const bodyResult = calculateBody(scores)
  
  // === ЛИЦО ===
  const faceResult = layersCompleted.includes('face') ? calculateFace(scores) : undefined
  
  // === ЦВЕТ ===
  const colourResult = layersCompleted.includes('colour') ? calculateColour(scores) : undefined
  
  // === ЭСТЕТИКА ===
  const aestheticResult = layersCompleted.includes('aesthetic') ? calculateAesthetic(scores) : undefined

  return {
    bodyPrimary: bodyResult.primary,
    bodySecondary: bodyResult.secondary,
    bodyTypeName: bodyResult.typeName,
    bodyChapter: bodyResult.chapter,
    bodyDescription: bodyResult.description,
    bodyTraits: bodyResult.traits,
    
    faceType: faceResult?.type,
    faceTypeName: faceResult?.name,
    faceDescription: faceResult?.description,
    
    colourSeason: colourResult?.season,
    colourSeasonName: colourResult?.name,
    colourPalette: colourResult?.palette,
    colourDescription: colourResult?.description,
    
    aestheticPrimary: aestheticResult?.primary,
    aestheticSecondary: aestheticResult?.secondary,
    aestheticName: aestheticResult?.name,
    aestheticDescription: aestheticResult?.description,
    
    scores,
    layersCompleted,
    answeredAt: new Date().toISOString(),
  }
}

// Тело — Кибби
function calculateBody(scores: TestTags) {
  const bodyScores = {
    dramatic: scores.dramatic || 0,
    natural: scores.natural || 0,
    classic: scores.classic || 0,
    romantic: scores.romantic || 0,
    gamine: scores.gamine || 0,
  }

  const sorted = (Object.keys(bodyScores) as KibbeBase[])
    .map(key => ({ type: key, points: bodyScores[key] }))
    .sort((a, b) => b.points - a.points)

  const primary = sorted[0].type
  const secondary = sorted[1].type
  const ratio = sorted[0].points > 0 ? sorted[1].points / sorted[0].points : 0
  const isPure = ratio < 0.4

  let typeKey: string
  if (isPure) {
    typeKey = primary
  } else {
    typeKey = `${primary}-${secondary}`
    if (!bodyTypes[typeKey]) {
      typeKey = `${secondary}-${primary}`
    }
    if (!bodyTypes[typeKey]) {
      typeKey = primary
    }
  }

  const data = bodyTypes[typeKey] || bodyTypes[primary]

  return {
    primary,
    secondary: isPure ? undefined : secondary,
    typeName: data.name,
    chapter: data.chapter,
    description: data.description,
    traits: data.traits,
  }
}

// Лицо
function calculateFace(scores: TestTags) {
  const faceScores: Record<FaceType, number> = {
    sharp: scores.face_sharp || 0,
    broad: scores.face_broad || 0,
    balanced: scores.face_balanced || 0,
    soft: scores.face_soft || 0,
    compact: scores.face_compact || 0,
  }

  const winner = (Object.keys(faceScores) as FaceType[])
    .reduce((best, current) => faceScores[current] > faceScores[best] ? current : best)

  const data = faceTypes[winner]
  return { type: winner, name: data.name, description: data.description }
}

// Цвет
function calculateColour(scores: TestTags) {
  const warm = scores.warm || 0
  const cool = scores.cool || 0
  const neutral = scores.neutral || 0
  
  const bright = scores.bright || 0
  const muted = scores.muted || 0
  
  const light = scores.light || 0
  const deep = scores.deep || 0

  // Определяем температуру
  const isWarm = warm > cool && warm > neutral
  const isCool = cool > warm && cool > neutral
  const isNeutral = !isWarm && !isCool

  // Определяем светлоту
  const isLight = light > deep
  const isDeep = deep > light

  // Определяем насыщенность
  const isBright = bright > muted
  const isMuted = muted > bright

  // Маппинг в сезоны
  let season: ColourSeason

  if (isCool && isDeep) season = 'deepWinter'
  else if (isCool && isBright) season = 'trueWinter'
  else if (isCool && isMuted) season = 'trueSummer'
  else if (isCool && isLight) season = 'lightSummer'
  else if (isCool) season = 'coolSummer'
  else if (isWarm && isLight && isBright) season = 'lightSpring'
  else if (isWarm && isBright) season = 'trueSpring'
  else if (isWarm && isMuted && isDeep) season = 'deepAutumn'
  else if (isWarm && isMuted) season = 'softAutumn'
  else if (isWarm && isDeep) season = 'trueAutumn'
  else if (isWarm) season = 'warmSpring'
  else if (isDeep) season = 'deepAutumn'
  else if (isLight) season = 'lightSummer'
  else season = 'softAutumn'  // дефолт

  const data = colourSeasons[season]
  return {
    season,
    name: data.name,
    description: data.description,
    palette: data.palette,
  }
}

// Эстетика
function calculateAesthetic(scores: TestTags) {
  const aestheticScores: Record<Aesthetic, number> = {
    oldMoney: scores.oldMoney || 0,
    darkAcademia: scores.darkAcademia || 0,
    coastal: scores.coastal || 0,
    cleanGirl: scores.cleanGirl || 0,
    boho: scores.boho || 0,
    urban: scores.urban || 0,
    romantic_aesthetic: scores.romantic_aesthetic || 0,
    eclectic: scores.eclectic || 0,
  }

  const sorted = (Object.keys(aestheticScores) as Aesthetic[])
    .map(key => ({ type: key, points: aestheticScores[key] }))
    .sort((a, b) => b.points - a.points)

  const primary = sorted[0].type
  const secondary = sorted[1].type
  const ratio = sorted[0].points > 0 ? sorted[1].points / sorted[0].points : 0

  const primaryData = aesthetics[primary]
  const isHybrid = ratio >= 0.5  // если второй близко — это микс

  if (isHybrid) {
    const secondaryData = aesthetics[secondary]
    return {
      primary,
      secondary,
      name: `${primaryData.name} × ${secondaryData.name}`,
      description: `Сочетание двух эстетик. Основа — ${primaryData.name}, акценты — ${secondaryData.name}.`,
    }
  }

  return {
    primary,
    name: primaryData.name,
    description: primaryData.description,
  }
}