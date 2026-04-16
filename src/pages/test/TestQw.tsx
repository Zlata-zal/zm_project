

export type StepOption = {
  label: string
  tags: Record<string, number>
}

export type Step = {
  id: string
  label: string
  title: string
  subtitle: string
  options: string[] | StepOption[]
}
export const steps = [
    {
        id: 'mood',
        label: 'Step 1 · Mood',
        title: 'What kind of music do you feel most like you?',
        subtitle: 'Just tap the option that feels closest to you. There are no wrong answers — we only want to feel your vibe.',
        options: ['Hip-Hop', 'Jazz', 'Lo-fi', 'Rock', 'Classical', 'Electronic'],
  },
  {
    id: 'body',
    label: 'Шаг 2 Вертикальная Линия',
    title: 'Как воспринимается ваш рост и вытянутость тела со стороны',
    subtitle: 'Just tap the option that feels closest to you. There are no wrong answers — we only want to feel your vibe.',
    options: [
        {label: 'Вы выглядите заметно выше, чем есть',tags: {}},
        {label: 'Выглядите чуть выше своего роста', tags: {}},
        {label:  'Выглядите ровно на свой рост',tags: {}},
        {label:  'Выглядите немного ниже', tags: {}},
        {label:  'Выглядите значительно ниже', tags: {}},
    ],
  },
  { 
    id: 'sholders',
    label: 'Шаг 3 Ширина Плеч',
    title: 'Какая форма плеч лучше всего описывает вас?',
    subtitle: 'Just tap the option that feels closest to you. There are no wrong answers — we only want to feel your vibe.',
    options: ['У вас широкие плечи, которые заметно шире бедер', 'У вас широкие плечи, которые немного шире бедер', 'У вас пропорциональные плечи и бедра', 'У вас узкие плечи, которые немного уже бедер', 'У вас узкие плечи, которые заметно уже бедер'],
  },
  {
    id: 'hand and leg',
    label: 'Шаг 3 Длина Рук и Ног',
    title: 'Как выглядят ваши руку и ноги в сравнении с вашим ростом?',
    subtitle: 'Just tap the option that feels closest to you. There are no wrong answers — we only want to feel your vibe.',
    options: [
        {label:  'Длинные и узкие', tags: {}},
        {label:  'Длинные и более широкие/плотные', tags: {}},
        {label:  'Пропорциональные телу',tags: {}},
        {label:  'Немного котортковатые', tags: {}},
        {label:  'Короткие и компактные', tags: {}},
    ],
  },
  {
    id: 'general body',
    label: 'Шаг 4 Общее строение тела',
    title: 'Как можно описать вашу общую форму тела?',
    subtitle: 'Just tap the option that feels closest to you. There are no wrong answers — we only want to feel your vibe.',
    options: [
        {label: 'Вытянутая сухая, худощавая',tags: {}},
        {label: 'Вытянутая, плотная или мускулинная', tags: {}},
        {label:  'Сбалансированная пропорциональная',tags: {}},
        {label:  'Изящная с выраженными изгибами', tags: {}},
        {label:  'Мягкая с заметными округлыми формами', tags: {}},
    ],
  },
  {
    id: 'chest',
    label: 'Шаг 5 Грудь/вверх корпуса',
    title: 'Как выглядит зона груди и верх торса',
    subtitle: 'Just tap the option that feels closest to you. There are no wrong answers — we only want to feel your vibe.',
    options: [
        {label: 'Миниатюрная / поднянутая',tags: {}},
        {label: 'Широкая', tags: {}},
        {label:  'Пропорциональная талии и бедрам',tags: {}},
        {label:  'Округлая и заметно выраженная', tags: {}},
        {label:  'Очень пышная и выступающая', tags: {}},
    ],
  },
  {
    id: 'body',
    label: 'Шаг 6 Талия',
    title: 'Как выглядит ваша талия по отношению к телу ?',
    subtitle: 'Just tap the option that feels closest to you. There are no wrong answers — we only want to feel your vibe.',
    options: [
        {label: 'Удлиненная и слабо выраженная',tags: {}},
        {label: 'Удлиненная и широкая', tags: {}},
        {label:  'Умеренно выраженная',tags: {}},
        {label:  'Очень тонкая по сравнению с грудьб и будрами', tags: {}},
        {label:  'Мягко выраженная может казаться широкой', tags: {}},
    ],
  },
  {
    id: 'chest',
    label: 'Шаг 7 Бедра',
    title: 'Какая форма бедер вам ближе ?',
    subtitle: 'Just tap the option that feels closest to you. There are no wrong answers — we only want to feel your vibe.',
    options: [
        {label: 'Узкие/прямые',tags: {}},
        {label: 'Прямые, немного широкие', tags: {}},
        {label:  'Средние',tags: {}},
        {label:  'Округлые, с выраженной формой', tags: {}},
        {label:  'Очень мягкие и округлые', tags: {}},
    ],
  },
  {
    id: 'body',
    label: 'Шаг 8 Верх рук и бёдер',
    title: 'Как выглядит мягкость/плотность этих зон ?',
    subtitle: 'Just tap the option that feels closest to you. There are no wrong answers — we only want to feel your vibe.',
    options: [
        {label: 'Длинные, сухие, с выраженными линиями',tags: {}},
        {label: 'Удлиненные, плотные или мускулинные', tags: {}},
        {label:  'Сбалансированные',tags: {}},
        {label:  'Мягкие, немного укороченные', tags: {}},
        {label:  'Очень мягкие', tags: {}},
    ],
  },
  {
    id: 'chest',
    label: 'Шаг 9 Линия челючти',
    title: 'Как можно описать форму вашей челюсти ?',
    subtitle: 'Just tap the option that feels closest to you. There are no wrong answers — we only want to feel your vibe.',
    options: [
        {label: 'Острая или угловатая',tags: {}},
        {label: 'Широкая, с тупыми линиями', tags: {}},
        {label:  'Сбалансированная между острой и широкой',tags: {}},
        {label:  'Слегка зауженная', tags: {}},
        {label:  'Круглая или мягкая', tags: {}},
    ],
  },
    
]