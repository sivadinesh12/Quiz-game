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
  } = props
  const {id, text, is_correct} = optionDetails
  const isCorrect = is_correct

  const runCheckOptions = event => {
    if (!isAnswered) {
      checkOption(optionList, id, optionType)
    }
  }

  return (
    <div className="option-container">
      <li>
        <button id={id} className="list-item" onClick={runCheckOptions}>
          {text}
        </button>
      </li>
      {isAnswered && (
        <>
          {selectedOptionId === id && isCorrect === 'true' && (
            <img
              src="https://res.cloudinary.com/dh46cfc1b/image/upload/v1717426001/check-circle.1_1_lqrzwg.png"
              alt="correct checked circle"
              className="icon correct-icon"
            />
          )}
          {selectedOptionId === id && isCorrect === 'false' && (
            <img
              src="https://res.cloudinary.com/dh46cfc1b/image/upload/v1717426057/Solid_khcbhe.png"
              alt="incorrect close circle"
              className="icon wrong-icon"
            />
          )}
        </>
      )}
    </div>
  )
}

export default DefaultOptionItem
