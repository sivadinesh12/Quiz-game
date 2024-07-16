import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import QuestionItem from '../QuestionItem'
import './index.css'

const apiStatus = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class QuizGame extends Component {
  state = {
    api: apiStatus.initial,
    questions: [],
    questionIndex: 0,
    timer: 15,
    correctQuestions: 0,
    wrongAnswers: 0,
    unanswerdQuestions: 0,
    isAnswered: false,
    lock: false,
    unanswerdQuestionsArray: [],
    selectedOptionId: null,
  }

  componentDidMount() {
    this.getQuizQuestions()
    this.runTimer()
  }

  componentWillUnmount() {
    clearInterval(this.timerId)
  }

  getQuizQuestions = async () => {
    this.setState({api: apiStatus.inProgress})
    const url = 'https://apis.ccbp.in/assess/questions'
    const options = {
      method: 'GET',
    }
    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok === true) {
      this.setState({questions: data, api: apiStatus.success})
    } else {
      console.log(response)
      this.setState({api: apiStatus.failure})
    }
  }

  runTimer = () => {
    this.timerId = setInterval(this.tick, 1000)
  }

  tick = () => {
    const {timer, isAnswered, questionIndex} = this.state
    const {questions} = this.state
    const currentQuestion = questions.questions[questionIndex]

    if (timer > 0) {
      this.setState(prevState => ({
        timer: prevState.timer - 1,
      }))
    } else {
      clearInterval(this.timerId)
      if (!isAnswered) {
        this.setState(prevState => ({
          unanswerdQuestions: prevState.unanswerdQuestions + 1,
          lock: true,
          unanswerdQuestionsArray: [
            ...prevState.unanswerdQuestionsArray,
            currentQuestion,
          ],
        }))
      }
    }
  }

  nextQuestion = () => {
    this.setState(prevState => ({
      questionIndex: prevState.questionIndex + 1,
      isAnswered: false,
      lock: false,
      timer: 15,
      selectedOptionId: null,
    }))
    this.runTimer()
  }

  checkOption = (optionList, id, optionsType) => {
    clearInterval(this.timerId)

    const {lock} = this.state
    if (!lock) {
      const selectedOption = optionList.find(each => each.id === id)
      const correctOption = optionList.find(each => each.is_correct === 'true')

      if (selectedOption.is_correct === 'true') {
        if (optionsType === 'DEFAULT') {
          document.getElementById(selectedOption.id).classList.add('correct')
        }
        this.setState(prevState => ({
          correctQuestions: prevState.correctQuestions + 1,
        }))
      } else {
        if (optionsType === 'DEFAULT') {
          document.getElementById(correctOption.id).classList.add('correct')
          document.getElementById(selectedOption.id).classList.add('wrong')
        }
        this.setState(prevState => ({
          wrongAnswers: prevState.wrongAnswers + 1,
        }))
      }

      this.setState({
        isAnswered: true,
        lock: true,
        selectedOptionId: id,
      })
    }
  }

  gamereuslts = () => {
    const {
      unanswerdQuestions,
      unanswerdQuestionsArray,
      correctQuestions,
      wrongAnswers,
    } = this.state

    const {history} = this.props

    history.replace({
      pathname: '/game-results',
      state: {
        unanswerdQuestions,
        unanswerdQuestionsArray,
        correctAnswers: correctQuestions,
        wrongAnswers,
      },
    })
  }

  lodingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="TailSpin" color="#ffffff" height="50" width="50" />
    </div>
  )

  successView = () => {
    const {questions, questionIndex, timer, isAnswered, selectedOptionId} =
      this.state
    return (
      <div className="questions-card">
        <QuestionItem
          questions={questions.questions}
          questionIndex={questionIndex}
          timer={timer}
          isAnswered={isAnswered}
          selectedOptionId={selectedOptionId}
          checkOption={this.checkOption}
          nextQuestion={this.nextQuestion}
          gamereuslts={this.gamereuslts}
        />
      </div>
    )
  }

  failureView = () => {
    return (
      <div className="failure-view">
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-assess-failure-img.png"
          alt="failure view"
          className="failure-icon"
        />
        <h1 className="error-message">Something went wrong</h1>
        <p>Our servers are busy please try again</p>
        <button
          type="button"
          onClick={this.getQuizQuestions}
          className="retry-button"
        >
          Retry
        </button>
      </div>
    )
  }

  finalRender = () => {
    const {api} = this.state
    switch (api) {
      case apiStatus.inProgress:
        return this.lodingView()
      case apiStatus.success:
        return this.successView()
      case apiStatus.failure:
        return this.failureView()
      default:
        return null
    }
  }

  render() {
    return (
      <div>
        <Header />
        <div className="questions-bg">{this.finalRender()}</div>
      </div>
    )
  }
}

export default QuizGame
