import { steps } from '../test/TestQw'

export const collectProfile = (
  answers: Record<string, string>
): Record<string, number> => {
  const profile: Record<string, number> = {}

  for (const step of steps) {
    const answer = answers[step.id]
    if (!answer) continue

    for (const option of step.options) {
      if (typeof option === 'string') continue // у строк нет тегов
      if (option.label === answer) {
        for (const [tag, weight] of Object.entries(option.tags)) {
          profile[tag] = (profile[tag] ?? 0) + weight
        }
      }
    }
  }

  return profile
}