import type { FaceType, ColourSeason, Aesthetic } from '../test/types'

interface BodyTypeData {
  name: string
  chapter: string
  description: string
  //longDescription: string      
  traits: string[]
  //whatSuits: string[]           
  //whatToAvoid: string[]         
}
export const bodyTypes: Record<string, BodyTypeData> = {
  'dramatic': {
    name: 'Dramatic',
    chapter: 'i',
    description: 'Длинный, угловатый, графичный. Высокий рост, узкие плечи, удлинённые конечности. Острые черты, чёткие линии. Твоя сила — графика и контраст.',
    traits: ['длинные линии', 'острые черты', 'графичность'],
  },
  'natural': {
    name: 'Natural',
    chapter: 'ii',
    description: 'Широкий, плотный, прямой. Спортивная фигура, прямые линии. Свобода, мягкая небрежность, расслабленность — твоя территория.',
    traits: ['широкие плечи', 'прямые линии', 'свобода'],
  },
  'classic': {
    name: 'Classic',
    chapter: 'iii',
    description: 'Симметрия, баланс, пропорция. Средний рост, ничего не выпирает. Твоя мода — про вечное и сбалансированное.',
    traits: ['симметрия', 'пропорция', 'баланс'],
  },
  'romantic': {
    name: 'Romantic',
    chapter: 'iv',
    description: 'Мягкий, округлый, женственный. Невысокий рост, выраженные изгибы, пышные формы. Драпировки и мягкие ткани — твоё.',
    traits: ['округлость', 'мягкость', 'женственность'],
  },
  'gamine': {
    name: 'Gamine',
    chapter: 'v',
    description: 'Компактный, контрастный, с яркими деталями. Маленький рост, угловатость + мягкость. Игривая, дерзкая мода с чёткими линиями.',
    traits: ['компактность', 'контрастность', 'игривость'],
  },
//гибриды
  'dramatic-romantic': {
    name: 'Soft Dramatic',
    chapter: 'vi',
    description: 'Длина Драматика и мягкость Романтика. Высокий рост, выраженные изгибы. Драпировки, шёлк, бархат — твоя территория.',
    traits: ['длинные линии', 'мягкие черты', 'выразительность'],
  },
  'natural-dramatic': {
    name: 'Flamboyant Natural',
    chapter: 'vii',
    description: 'Натурал с драматическим уклоном. Высокий, размашистый. Свобода и графичность одновременно.',
    traits: ['размашистость', 'свобода', 'длинные линии'],
  },
  'natural-romantic': {
    name: 'Soft Natural',
    chapter: 'viii',
    description: 'Натурал с романтическим уклоном. Прямые линии плюс мягкие изгибы. Расслабленная женственность.',
    traits: ['мягкость', 'свобода', 'женственность'],
  },
  'classic-dramatic': {
    name: 'Dramatic Classic',
    chapter: 'ix',
    description: 'Классик с драматическим уклоном. Симметрия + удлинённые линии. Строгая, элегантная униформа.',
    traits: ['строгость', 'элегантность', 'графичность'],
  },
  'classic-romantic': {
    name: 'Soft Classic',
    chapter: 'x',
    description: 'Классик с романтическим уклоном. Симметрия + мягкие изгибы. Деликатная женственность.',
    traits: ['деликатность', 'симметрия', 'женственность'],
  },
  'romantic-dramatic': {
    name: 'Theatrical Romantic',
    chapter: 'xi',
    description: 'Романтик с драматическим уклоном. Изгибы + графичность. Самый театральный из мягких типажей.',
    traits: ['изгибы', 'выразительность', 'театральность'],
  },
  'gamine-romantic': {
    name: 'Soft Gamine',
    chapter: 'xii',
    description: 'Гамин с романтическим уклоном. Компактность + округлость. Яркие принты, мини-силуэты.',
    traits: ['компактность', 'округлость', 'игривость'],
  },
  'gamine-dramatic': {
    name: 'Flamboyant Gamine',
    chapter: 'xiii',
    description: 'Гамин с драматическим уклоном. Компактность + острые черты. Графичные контрасты.',
    traits: ['острота', 'контраст', 'дерзость'],
  },
}


export const faceTypes: Record<FaceType, { name: string; description: string }> = {
  sharp: {
    name: 'Графичное',
    description: 'Лицо с выраженной архитектурой — скулы, угол челюсти, форма носа считываются мгновенно. Сила в чётких линиях.',
  },
  broad: {
    name: 'Открытое',
    description: 'Широкое, ясное лицо без острых зон. Дружелюбное и «настоящее». Подходит естественный макияж.',
  },
  balanced: {
    name: 'Симметричное',
    description: 'Гармоничное лицо без перекосов. Подходит почти любой макияж и причёска.',
  },
  soft: {
    name: 'Мягкое',
    description: 'Округлые черты, нет резких переходов. Романтичная внешность. Идут мягкие тени, румянец.',
  },
  compact: {
    name: 'Контрастное',
    description: 'Маленькое лицо с яркими акцентами. Один сильный акцент работает лучше многих мелких.',
  },
}


export const colourSeasons: Record<ColourSeason, { 
  name: string
  description: string
  palette: string[]
}> = {
  deepWinter: {
    name: 'Deep Winter',
    description: 'Тёмный, чистый, холодный. Контрастная внешность с тёмными волосами и светлой кожей.',
    palette: ['#000000', '#1a1a2e', '#5c1e1f', '#0d3b66', '#264653', '#ffffff'],
  },
  trueWinter: {
    name: 'True Winter',
    description: 'Холодный, насыщенный, ясный. Сильный контраст между волосами и кожей.',
    palette: ['#0a0a23', '#003566', '#a4161a', '#7209b7', '#001233', '#f5f5f5'],
  },
  coolWinter: {
    name: 'Cool Winter',
    description: 'Холодный, средний по светлоте. Чистые холодные оттенки.',
    palette: ['#264653', '#283d3b', '#5c1e1f', '#3a506b', '#1c3144', '#e0e1dd'],
  },
  lightSpring: {
    name: 'Light Spring',
    description: 'Светлый, тёплый, ясный. Мягкие тёплые пастельные тона.',
    palette: ['#ffd5c2', '#f8e8d0', '#c8e0c8', '#a3c4f3', '#fcd5b4', '#fffaf0'],
  },
  trueSpring: {
    name: 'True Spring',
    description: 'Тёплый, яркий, ясный. Чистые тёплые цвета без серого.',
    palette: ['#f4a261', '#e76f51', '#2a9d8f', '#e9c46a', '#264653', '#fefae0'],
  },
  warmSpring: {
    name: 'Warm Spring',
    description: 'Тёплый, средний, насыщенный. Земные тёплые тона.',
    palette: ['#bc6c25', '#dda15e', '#606c38', '#a98467', '#283618', '#fefae0'],
  },
  lightSummer: {
    name: 'Light Summer',
    description: 'Светлый, холодный, мягкий. Пыльные пастельные тона.',
    palette: ['#cbc0d3', '#dee2ff', '#efd6d2', '#bde0fe', '#a2d2ff', '#fdf0f5'],
  },
  trueSummer: {
    name: 'True Summer',
    description: 'Холодный, мягкий, средний. Припылённые холодные оттенки.',
    palette: ['#8d99ae', '#a8a4ce', '#c8b6ff', '#7c8ba1', '#525b76', '#edf2f4'],
  },
  coolSummer: {
    name: 'Cool Summer',
    description: 'Холодный, средне-тёмный, мягкий. Глубокие холодные пастельные тона.',
    palette: ['#5c677d', '#7d8597', '#979dac', '#3d405b', '#293241', '#e0e1dd'],
  },
  softAutumn: {
    name: 'Soft Autumn',
    description: 'Тёплый, мягкий, средний. Землистые припылённые тона.',
    palette: ['#a98467', '#c69963', '#7d6b50', '#9d8b73', '#605446', '#e8e0d0'],
  },
  trueAutumn: {
    name: 'True Autumn',
    description: 'Тёплый, насыщенный, средне-тёмный. Глубокие тёплые тона.',
    palette: ['#bc4749', '#e29578', '#a98467', '#6a994e', '#386641', '#f2e8cf'],
  },
  deepAutumn: {
    name: 'Deep Autumn',
    description: 'Тёплый, тёмный, насыщенный. Бордо, оливковый, медовый.',
    palette: ['#5c1e1f', '#7f4f24', '#3d2817', '#582f0e', '#936639', '#e8e0d0'],
  },
}


export const aesthetics: Record<Aesthetic, { name: string; description: string }> = {
  oldMoney: {
    name: 'Old Money',
    description: 'Тихая роскошь, классика без логотипов. Кашемир, шёлк, лоферы. Стиль про "была всегда богатой, не обсуждаем".',
  },
  darkAcademia: {
    name: 'Dark Academia',
    description: 'Библиотеки, твид, осень, винтаж. Стиль про любовь к знаниям и эстетике старого света.',
  },
  coastal: {
    name: 'Coastal',
    description: 'Лён, белый, море, простота. Стиль про спокойную жизнь у воды и лёгкое существование.',
  },
  cleanGirl: {
    name: 'Clean Girl',
    description: 'Минимализм, ухоженность, гладкость. Стиль про "всё на своих местах" и здоровый блеск.',
  },
  boho: {
    name: 'Boho',
    description: 'Свобода, этника, текстуры со всего мира. Стиль про творчество и нестандартность.',
  },
  urban: {
    name: 'Urban Sleek',
    description: 'Город, графичность, кожа, технические ткани. Стиль про современную энергию мегаполиса.',
  },
  romantic_aesthetic: {
    name: 'Modern Romantic',
    description: 'Винтаж, цветы, мягкость с современным акцентом. Стиль про женственность без перебора.',
  },
  eclectic: {
    name: 'Eclectic',
    description: 'Свой микс — берёт лучшее из всего и складывает по-своему. Стиль про самобытность.',
  },
}