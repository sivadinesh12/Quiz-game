import './index.css'

const UnansweredListItem = props => {
  const {itemDetails, questionText, optionType} = props
  const {options} = itemDetails
  console.log(itemDetails)
  console.log(options)

  const renderDefaultOption = () => (
    <ul className='option-list'>
      {options.map(each => (
        <div className='default-list-item-container'>
          <li
            className={
              each.is_correct === 'true' ? 'correct' : 'default-list-item'
            }
          >
            <p>{each.text}</p>
          </li>
          {each.is_correct === 'true' && (
            <img
              src='https://res.cloudinary.com/dh46cfc1b/image/upload/v1717426001/check-circle.1_1_lqrzwg.png'
              alt='correct checked circle'
              className='check-img'
            />
          )}
        </div>
      ))}
    </ul>
  )

  const renderSingleSelectOption = () => (
    <ul className='radio-option-list'>
      {options.map(each => (
        <li className='radio-item'>
          <input
            type='radio'
            checked={each.is_correct === 'true'}
            id={each.id}
          />
          <label htmlFor={each.id}>{each.text}</label>
          {each.is_correct === 'true' && (
            <img
              src='https://res.cloudinary.com/dh46cfc1b/image/upload/v1717426001/check-circle.1_1_lqrzwg.png'
              alt='correct checked circle'
              className='check-img'
              readOnly
            />
          )}
        </li>
      ))}
    </ul>
  )

  const renderImageOptions = () => (
    <ul className='option-list'>
      {options.map(each => (
        <li className='img-item'>
          <img className='option-img' src={each.image_url} alt={each.text} />
          {each.is_correct === 'true' && (
            <img
              src='https://res.cloudinary.com/dh46cfc1b/image/upload/v1717426001/check-circle.1_1_lqrzwg.png'
              alt='correct checked circle'
              className='check-img'
              readOnly
            />
          )}
        </li>
      ))}
    </ul>
  )

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
      <p className='unattempted-question-text'>{questionText}</p>
      {renderOptions()}
    </li>
  )
}

export default UnansweredListItem
