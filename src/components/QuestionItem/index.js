import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import DefaultOptionItem from '../DefaultOptionItem'
import SingleSelectOptionItem from '../SingleSelectOptionItem'
import ImageTypeOptionItem from '../ImageTypeOptionItem'
import './index.css'

class QuestionItem extends Component {
  defaultOption = (optionList, optionType) => {
    const {isAnswered, selectedOptionId, checkOption} = this.props
    return (
      <ul className="defaultlist">
        {optionList.map(each => (
          <DefaultOptionItem
            optionDetails={each}
            key={each.id}
            checkOption={checkOption}
            optionList={optionList}
            isAnswered={isAnswered}
            selectedOptionId={selectedOptionId}
            optionType={optionType}
          />
        ))}
      </ul>
    )
  }

  singleSelect = (optionList, optionType) => {
    const {isAnswered, selectedOptionId} = this.props
    return (
      <ul className="singleOptionList">
        {optionList.map(each => (
          <SingleSelectOptionItem
            optionDetails={each}
            key={each.id}
            checkOption={checkOption}
            optionList={optionList}
            isAnswered={isAnswered}
            selectedOptionId={selectedOptionId}
            optionType={optionType}
          />
        ))}
      </ul>
    )
  }

  imageType = (optionList, optionType) => {
    const {isAnswered, selectedOptionId} = this.props
    return (
      <ul className="img-option-type">
        {optionList.map(each => (
          <ImageTypeOptionItem
            optionDetails={each}
            key={each.id}
            checkOption={checkOption}
            optionList={optionList}
            isAnswered={isAnswered}
            selectedOptionId={selectedOptionId}
            optionType={optionType}
          />
        ))}
      </ul>
    )
  }

  getOptions = (optionsType, optionList) => {
    switch (optionsType) {
      case 'DEFAULT':
        return this.defaultOption(optionList, optionsType)
      case 'SINGLE_SELECT':
        return this.singleSelect(optionList, optionsType)
      case 'IMAGE':
        return this.imageType(optionList, optionsType)
      default:
        return null
    }
  }

  renderNextButton = () => {
    const {
      isAnswered,
      timer,
      questionIndex,
      questions,
      nextQuestion,
      gamereuslts,
    } = this.props
    const totalQuestions = questions.length

    if (questionIndex >= totalQuestions - 1) {
      return (
        <button className="submitBtn" onClick={gamereuslts}>
          Submit
        </button>
      )
    }

    if (isAnswered || timer === 0) {
      return (
        <button className="aswered-nextButton" onClick={nextQuestion}>
          Next Question
        </button>
      )
    } else {
      return (
        <button className="normal-nextbtn" disabled>
          Next Question
        </button>
      )
    }
  }

  render() {
    const {questionIndex, timer, questions} = this.props
    const question = questions[questionIndex].question_text
    const optionType = questions[questionIndex].options_type
    const optionList = questions[questionIndex].options
    const options = this.getOptions(optionType, optionList)

    return (
      <div>
        <div className="count-timer-cotainer">
          <div className="question-count">
            <p className="count-heading">Question</p>
            <p className="count">
              {questionIndex + 1}/{questions.length}
            </p>
          </div>
          <p>{timer}</p>
        </div>
        <p className="question">{question}</p>
        {options}
        <div className="nextbtn">{this.renderNextButton()}</div>
      </div>
    )
  }
}

export default withRouter(QuestionItem)
