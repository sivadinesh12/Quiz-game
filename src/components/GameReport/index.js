import {useLocation} from 'react-router-dom'
import Header from '../Header'
import UnansweredListItem from '../UnansweredListItem'
import './index.css'

const GameReport = props => {
  const location = useLocation()
  const {
    unanswerdQuestions,
    unanswerdQuestionsArray,
    correctAnswers,
    wrongAnswers,
  } = location.state
  console.log(unanswerdQuestionsArray)
  return (
    <div>
      <Header />
      <div className="bg-container">
        <div className="report-bg-card">
          <div className="score-summery">
            <div className="score-card">
              <p className="total-score">
                <span className="score">{correctAnswers}</span>/10
              </p>
            </div>
            <div className="summery-container">
              <div className="description-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/quiz-game-right-check-img.png"
                  alt="correct answer icon"
                  className="icon"
                />
                <p className="report-description">
                  {correctAnswers} Correct answers
                </p>
              </div>
              <div className="description-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/quiz-game-wrong-check-img.png"
                  alt="incorrect answer icon"
                  className="icon"
                />
                <p className="report-description">
                  {wrongAnswers} Wrong answers
                </p>
              </div>
              <div className="description-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/quiz-game-un-answered-img.png"
                  alt="unattempted icon"
                  className="icon"
                />
                <p className="report-description">
                  {unanswerdQuestions} Unattempted
                </p>
              </div>
            </div>
          </div>
          <div className="unanswered-container">
            {unanswerdQuestions === 0 ? (
              <p>Attempted all the questions</p>
            ) : (
              <div>
                <p className="unattempted-heading">Unattempted Questions</p>
                <ul className="unanswered-list-container">
                  {unanswerdQuestionsArray.map(each => (
                    <UnansweredListItem key={each.id} itemDetails={each} />
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default GameReport
