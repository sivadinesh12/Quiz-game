import {withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Header = props => {
  const logOut = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }

  return (
    <div className="header-bg">
      <img
        src="https://res.cloudinary.com/dh46cfc1b/image/upload/v1716805879/Frame_8787logo_hhiheq.png"
        alt="website logo"
      />
      <button type="button" className="logout-btn" onClick={logOut}>
        Logout
      </button>
    </div>
  )
}

export default withRouter(Header)
