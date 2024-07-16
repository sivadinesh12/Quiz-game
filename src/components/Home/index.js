import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import Header from '../Header'
import './index.css'

class Home extends Component {
  quizGame = () => {
    const {history} = this.props
    history.replace('quiz-game')
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken === undefined) {
      return <Redirect to="/login" />
    }
    return (
      <div>
        <Header />
        <div className="home-bg-container">
          <div className="start-quiz-card">
            <img
              src="https://assets.ccbp.in/frontend/react-js/quiz-game-start-the-quiz-img.png"
              alt="start quiz game"
              className="quiz-game-img"
            />
            <h1 className="heading">
              How Many Of These Questions Do You Actually Know?
            </h1>
            <p className="description">
              Test yourself with these easy quiz questions and answers
            </p>
            <button type="button" className="quiz-btn" onClick={this.quizGame}>
              Start Quiz
            </button>
            <div className="warnig">
              <img
                src="https://assets.ccbp.in/frontend/react-js/quiz-game-error-img.png"
                alt="warning icon"
                className="warnig-icon"
              />
              <p>
                All the progress will be lost, if you reload during the quiz
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Home
