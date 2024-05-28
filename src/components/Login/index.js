import {Component} from 'react'
import Cookies from 'js-cookie'
import './index.css'

class Home extends Component {
  state = {
    isLoginFailed: false,
    userInput: '',
    password: '',
    isPassWordShowing: false,
    errormsg: '',
  }

  changeInput = event => {
    this.setState({userInput: event.target.value})
  }

  changePassword = event => {
    this.setState({password: event.target.value})
  }

  changeCheckbox = () => {
    this.setState(prevState => ({isPassWordShowing: !prevState.isLoginFailed}))
  }

  onSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30, path: '/'})
    history.replace('/')
  }

  loginUser = async event => {
    event.preventDefault()
    const {userInput, password} = this.state
    const userDetails = {userInput, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const reponse = await fetch(url, options)
    const data = await reponse.json
    if (reponse.ok === true) {
      this.onSuccess(data.jwt_token)
    }
  }

  render() {
    const {userInput, password, isLoginFailed, errormsg} = this.state
    return (
      <div className="bg-container">
        <form className="login-form" onSubmit={this.loginUser}>
          <img
            src="https://res.cloudinary.com/dh46cfc1b/image/upload/v1716805879/Frame_8787logo_hhiheq.png"
            alt="website logo"
            className="logo"
          />
          <div>
            <div className="input-container">
              <label htmlFor="username" className="label-element">
                USERNAME
              </label>
              <input
                type="input"
                value={userInput}
                id="username"
                className="input-element"
                onChange={this.changeInput}
              />
            </div>
            <div className="input-container">
              <label htmlFor="password" className="label-element">
                PASSWORD
              </label>
              <input
                type="input"
                value={password}
                id="password"
                className="input-element"
                onChange={this.changePassword}
              />
            </div>
            <div className="checkbox-container">
              <input
                type="checkbox"
                id="checkbox"
                onClick={this.changeCheckbox}
              />
              <label htmlFor="checkbox">Show Password</label>
            </div>
          </div>
          <button className="login-btn" type="submit">
            Login
          </button>
        </form>
        {isLoginFailed && <p>{errormsg}</p>}
      </div>
    )
  }
}

export default Home
