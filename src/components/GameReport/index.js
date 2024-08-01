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
                  {wrongAnswers} Incorrect answers
                </p>
              </div>
              <div className="description-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/quiz-game-un-answered-img.png"
                  alt="unattempted icon"
                  className="icon"
                />
                <p className="report-description">
                  {unanswerdQuestions} Unattempted answers
                </p>
              </div>
            </div>
          </div>
          <div className="unanswered-container">
            {unanswerdQuestions === 0 ? (
              <h1 className="no-unattempted">Attempted all the questions</h1>
            ) : (
              <div className="unattempted-container">
                <h1 className="unattempted-heading">Unattempted Questions</h1>
                <ul className="unanswered-list-container">
                  {unanswerdQuestionsArray.map(each => (
                    <UnansweredListItem
                      key={each.id}
                      itemDetails={each}
                      questionText={each.question_text}
                      optionType={each.options_type}
                    />
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
