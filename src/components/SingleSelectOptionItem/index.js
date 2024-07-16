import React from 'react'
import './index.css'

const SingleSelectOptionItem = props => {
  const {optionDetails, checkOption, optionList, selectedOptionId, isAnswered} =
    props
  const {id, text} = optionDetails
  console.log(optionDetails.is_correct)

  const runCheckOptions = event => {
    if (!isAnswered) {
      checkOption(optionList, id, event)
    }
  }

  return (
    <div className="option-container">
      <li id={id} className="single-option">
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
      {isAnswered && (
        <>
          {selectedOptionId === id && optionDetails.is_correct === 'true' && (
            <img
              src="https://res.cloudinary.com/dh46cfc1b/image/upload/v1717426001/check-circle.1_1_lqrzwg.png"
              alt="correct checked circle"
              className="icon correct-icon"
            />
          )}
          {selectedOptionId === id && optionDetails.is_correct === 'false' && (
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

export default SingleSelectOptionItem
