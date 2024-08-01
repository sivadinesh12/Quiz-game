import React from 'react'
import './index.css'

const SingleSelectOptionItem = props => {
  const {
    optionDetails,
    checkOption,
    optionList,
    selectedOptionId,
    isAnswered,
    isCorrect,
    selectedOptionAnswer,
  } = props
  const {id, text} = optionDetails

  const runCheckOptions = event => {
    if (!isAnswered) {
      checkOption(optionList, id, event, isCorrect)
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
      <li className="single-option">
        <input
          type="radio"
          name="singleSelect"
          disabled={isAnswered}
          onClick={runCheckOptions}
          id={id}
          value={text}
        />
        <label htmlFor={id}>{text}</label>
      </li>
      {feedbackIcon}
    </div>
  )
}

export default SingleSelectOptionItem
