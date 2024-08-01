import {useLocation, useHistory} from 'react-router-dom'
import React from 'react'
import Header from '../Header'
import './index.css'

const GameResults = props => {
  const location = useLocation()
  const history = useHistory()
  const {
    unanswerdQuestions,
    unanswerdQuestionsArray,
    correctAnswers,
    wrongAnswers,
  } = location.state

  const gameReport = () => {
    history.replace({
      pathname: '/game-report',
      state: {
        unanswerdQuestions,
        unanswerdQuestionsArray,
        correctAnswers,
        wrongAnswers,
      },
    })
  }

  const renderGameResult = () => {
    const percentage = (correctAnswers / 10) * 100
    if (percentage >= 60) {
      return (
        <div className="won-bg">
          <img
            src="https://assets.ccbp.in/frontend/react-js/quiz-game-congrats-trophy-img.png"
            alt="won"
            className="trophy-img"
          />
          <h1>Congrats</h1>
          <h1>{percentage}% Correctly Answered</h1>
          <p>Quiz completed successfully</p>
          <p>You attempted {correctAnswers} out of 10 questions as correct.</p>
          <button className="report-btn" onClick={gameReport}>
            Report
          </button>
        </div>
      )
    }

    return (
      <div className="fail-bg">
        <img
          src="https://assets.ccbp.in/frontend/react-js/quiz-game-lose-img.png"
          alt="lose"
          className="lose-img"
        />
        <p>You lose</p>
        <h1>{percentage}% Correctly Answered</h1>
        <p>You attempted {correctAnswers} out of 10 questions as correct.</p>
        <button className="report-btn" onClick={gameReport}>
          Report
        </button>
      </div>
    )
  }
  return (
    <div>
      <Header />
      <div className="game-result-bg">
        <div className="result-card">{renderGameResult()}</div>
      </div>
    </div>
  )
}

export default GameResults
