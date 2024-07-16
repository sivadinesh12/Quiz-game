import './index.css'

const UnansweredListItem = props => {
  const {itemDetails} = props
  const {options, question_text, options_type} = itemDetails
  const questionText = question_text
  const optionType = options_type

  const renderDefaultOption = () => (
    <ul className="option-list">
      {options.map(each => (
        <div className="default-list-item-container">
          <li
            className={
              each.is_correct === 'true' ? 'correct' : 'default-list-item'
            }
          >
            <p>{each.text}</p>
          </li>
          {each.is_correct === 'true' && (
            <img
              src="https://res.cloudinary.com/dh46cfc1b/image/upload/v1717426001/check-circle.1_1_lqrzwg.png"
              alt="correct checked circle"
            />
          )}
        </div>
      ))}
    </ul>
  )

  const renderSingleSelectOption = () => (
    <ul className="radio-option-list">
      {options.map(each => (
        <li className="radio-item">
          <input
            type="radio"
            checked={each.is_correct === 'true'}
            id={each.id}
          />
          <label htmlFor={each.id}>{each.text}</label>
          {each.is_correct === 'true' && (
            <img
              src="https://res.cloudinary.com/dh46cfc1b/image/upload/v1717426001/check-circle.1_1_lqrzwg.png"
              alt="correct checked circle"
              className="check-img"
              readOnly
            />
          )}
        </li>
      ))}
    </ul>
  )

  const renderImageOptions = () => {
    console.log('image')
  }

  const renderOptions = () => {
    switch (optionType) {
      case 'DEFAULT':
        return renderDefaultOption()
      case 'SINGLE_SELECT':
        return renderSingleSelectOption()
      case 'IMAGE':
        return renderImageOptions()
      default:
        return null
    }
  }

  return (
    <li>
      <p className="unattempted-question-text">{questionText}</p>
      {renderOptions()}
    </li>
  )
}

export default UnansweredListItem
