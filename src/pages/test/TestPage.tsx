import React, { useState } from 'react'
import { steps } from './TestQw'
import { calculateResult } from '../../features/analuzeTest/CalculateResalts'
import type { StepOption, KibbeResult, StepLayer } from './types'
import styles from './TestPage.module.scss'

interface TestPageProps {
  onBack?: () => void
  onFinish?: (result: KibbeResult) => void
}

// Маппинг слоёв на красивые названия
const layerNames: Record<StepLayer, string> = {
  body: 'body',
  face: 'face',
  colour: 'colour',
  aesthetic: 'aesthetic',
}

const layerOrder: StepLayer[] = ['body', 'face', 'colour', 'aesthetic']

// Буквы для опций (а, б, в, г, д)
const optionLetters = ['а', 'б', 'в', 'г', 'д', 'е']

const TestPage: React.FC<TestPageProps> = ({ onBack, onFinish }) => {
  const [stepIndex, setStepIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, StepOption>>({})

  const step = steps[stepIndex]
  const isLast = stepIndex === steps.length - 1
  const selectedAnswer = answers[step.id]

  // Номер вопроса (с ведущим нулём: 01, 02 ... 28)
  const stepNumber = String(stepIndex + 1).padStart(2, '0')

  // Какая часть теста сейчас (i, ii, iii, iv)
  const partNumber = (() => {
    const layerIndex = layerOrder.indexOf(step.layer)
    return ['i', 'ii', 'iii', 'iv'][layerIndex] || 'i'
  })()

  const handleSelect = (option: StepOption) => {
    setAnswers(prev => ({ ...prev, [step.id]: option }))
  }

  const handleNext = () => {
    if (isLast) {
      const allAnswers = Object.values(answers)
      const layersCompleted = Array.from(
        new Set(
          steps
            .filter(s => answers[s.id])
            .map(s => s.layer)
        )
      ) as StepLayer[]

      const result = calculateResult(allAnswers, layersCompleted)
      onFinish?.(result)
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

  // Прогресс для полоски сверху (0..100)
  const progressPercent = ((stepIndex + 1) / steps.length) * 100

  return (
    <section className={styles.testPage}>

      {/* Прогресс-полоска сверху */}
      <div className={styles.progressBar}>
        <div
          className={styles.progressFill}
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Edge-инфо: выпуск / часть / номер */}
      <div className={styles.edgeInfo}>
        <span>— style code · vol 01 —</span>
        <span>part <b>{partNumber}</b> / {layerNames[step.layer]}</span>
        <span>{stepNumber} / {String(steps.length).padStart(2, '0')}</span>
      </div>

      <div className={styles.layout}>

        {/* === ЛЕВАЯ КОЛОНКА === */}
        <div className={styles.left}>
          <div className={styles.stepNum}>{stepNumber}</div>
          <p className={styles.eyebrow}>{step.label}</p>
          <h1 className={styles.title}>{step.title}</h1>
          {step.subtitle && (
            <p className={styles.subtitle}>{step.subtitle}</p>
          )}
        </div>

        {/* === ПРАВАЯ КОЛОНКА === */}
        <div className={styles.right}>
          <div className={styles.options}>
            {step.options.map((option, index) => {
              const isSelected = selectedAnswer?.label === option.label
              return (
                <button
                  key={option.label}
                  className={`${styles.option} ${isSelected ? styles.optionSelected : ''}`}
                  onClick={() => handleSelect(option)}
                >
                  <span className={styles.optionLetter}>
                    — {optionLetters[index] || index + 1} —
                  </span>
                  <span className={styles.optionText}>{option.label}</span>
                  <span className={styles.optionArrow}>→</span>
                </button>
              )
            })}
          </div>

          <div className={styles.nav}>
            <button className={styles.navBack} onClick={handleBack}>
              ← {stepIndex === 0 ? 'выйти' : 'назад'}
            </button>
            <span className={styles.navProgress}>
              {stepIndex + 1} из {steps.length}
            </span>
            <button
              className={styles.navNext}
              onClick={handleNext}
              disabled={!selectedAnswer}
            >
              {isLast ? 'завершить →' : 'далее →'}
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TestPage