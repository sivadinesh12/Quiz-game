import React from 'react'
import './index.css'

const DefaultOptionItem = props => {
  const {
    optionDetails,
    checkOption,
    optionList,
    selectedOptionId,
    isAnswered,
    optionType,
    isCorrect,
    selectedOptionAnswer,
  } = props
  const {id, text} = optionDetails

  const runCheckOptions = event => {
    if (!isAnswered) {
      checkOption(optionList, id, optionType, isCorrect)
    }
  }

  let feedbackIcon = null
  if (isAnswered) {
    if (
      (selectedOptionId === id && isCorrect === 'true') ||
      (selectedOptionAnswer === 'false' && isCorrect === 'true')
    ) {
      feedbackIcon = (
        <img
          src="https://assets.ccbp.in/frontend/react-js/quiz-game-check-circle-img.png"
          alt="correct checked circle"
          className="icon correct-icon"
        />
      )
    } else if (selectedOptionId === id && isCorrect === 'false') {
      feedbackIcon = (
        <img
          src="https://assets.ccbp.in/frontend/react-js/quiz-game-close-circle-img.png"
          alt="incorrect close circle"
          className="icon wrong-icon"
        />
      )
    }
  }

  return (
    <div className="option-container">
      <li>
        <button id={id} className="list-item" onClick={runCheckOptions}>
          {text}
        </button>
      </li>
      {feedbackIcon}
    </div>
  )
}

export default DefaultOptionItem
