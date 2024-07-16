import './index.css'

const ImageTypeOptionItem = props => {
  const {optionDetails, checkOption, optionList, selectedOptionId, isAnswered} =
    props
  const {id, text, image_url} = optionDetails
  const imageUrl = image_url

  const runCheckOptions = event => {
    if (!isAnswered) {
      checkOption(optionList, id, event)
    }
  }

  return (
    <div className="option-container">
      <li id={id} onClick={runCheckOptions} className="image-option">
        <img src={imageUrl} className="img-option" alt={text} />
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

export default ImageTypeOptionItem
