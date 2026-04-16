import { useState } from 'react'


const useQuiz = () => {
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [stepIndex, setStepIndex] = useState(0)

  const currentStep = steps[stepIndex]
  const isDone = stepIndex >= steps.length

  const answer = (label: string) => {
    setAnswers(prev => ({ ...prev, [currentStep.id]: label }))
    setStepIndex(i => i + 1)
  }

  const profile = isDone ? collectProfile(answers) : null
  const result  = profile  ? getResult(profile)    : null

  return { currentStep, answer, isDone, result, profile }
}