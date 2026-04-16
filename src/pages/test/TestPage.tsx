import React, { useState } from 'react'
import { steps } from '../test/TestQw' 
import styles from './TestPage.module.scss'
import { collectProfile } from './CollectProfile'
import stylesbt from '../../app/App.module.scss'


const getLabel = (option: string | { label: string; tags: Record<string, number> }) =>
  typeof option === 'string' ? option : option.label



interface TestPageProps {
  onBack?: () => void
  onFinish?: (profile: Record<string, number>) => void
}

const TestPage: React.FC<TestPageProps> = ({ onBack, onFinish }) => {
  const [stepIndex, setStepIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})

  const step = steps[stepIndex]
  const isLast = stepIndex === steps.length - 1
  const selectedAnswer = answers[step.id]

  const handleSelect = (label: string) => {
    setAnswers(prev => ({ ...prev, [step.id]: label }))
  }

  const handleNext = () => {
    if (isLast) {
      onFinish?.(collectProfile(answers))
    } else {
      setStepIndex(i => i + 1)
    }
  }

  const handleBack = () => {
    if (stepIndex > 0) {
      setStepIndex(i => i - 1)
    } else {
      onBack?.()
    }
  }

  return (
    <section className={styles.testPage}>
      <div className={styles.headerRow}>
        <p className={styles.stepLabel}>{step.label}</p>
        <h1 className={styles.title}>{step.title}</h1>
        <p className={styles.subtitle}>{step.subtitle}</p>
      </div>

      <div className={styles.optionsArea}>
        {step.options.map((option, index) => {
          const label = getLabel(option)
          return (
            <button
              key={label}
              className={`${styles.optionCard} ${styles[`float${(index % 3) + 1}`]} ${
                selectedAnswer === label ? styles.optionSelected : ''
              }`}
              onClick={() => handleSelect(label)}
            >
              <span className={styles.bubbleIndex}>{index + 1}</span>
              <span className={styles.optionText}>{label}</span>
            </button>
          )
        })}
      </div>

      <div className={styles.navRow}>
        <button className={`${stylesbt.btn} ${stylesbt.btnSecondary}`} onClick={handleBack}>← Назад</button>
        <button className={`${stylesbt.btn} ${stylesbt.btnSecondary}`} onClick={handleNext} disabled={!selectedAnswer}>
          {isLast ? 'Завершить' : 'Далее →'}
        </button>
      </div>
    </section>
  )
}

export default TestPage