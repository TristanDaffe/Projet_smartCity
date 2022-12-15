import React from "react";
import { useParams } from "react-router-dom";
import { setToken, getToken, removeToken } from "../../context/LoginContext";
import {login} from '../../component/API/http';
import { Navigate } from 'react-router-dom';

function withParams(Component) {
  return (props) => <Component {...props} params={useParams()} />;
}

class LoginPannel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      login: "",
      password: "",
      redirect: false
    };
  }


  handleSubmit = (event) => {
    event.preventDefault();
    login(this.state.login, this.state.password);
    console.log("token : ");
    console.log(getToken());
    this.setState({ redirect: true });
  };

  render() {
    return (
      <div className="addUpdateForm">
        <div className="header">
          <h1>Log in</h1>
          <img
            className="imgCroixRouge"
            src="https://i.pinimg.com/originals/64/11/f0/6411f0dd5a67d583c81851b1c355833f.png"
            alt="settings"
          />
        </div>
        <div className="addUpdateContainer">
          <div className="firstItem">
            <label>Login:</label>
            <input
              type="text"
              onChange={(event) =>
                this.setState({ login: event.target.value.toString() })
              }
            />
          </div>
          <div className="item">
            <label>Password:</label>
            <input
              type="password"
              onChange={(event) =>
                this.setState({ password: event.target.value.toString() })
              }
            />
          </div>
          <div className="item">
            <button className="addUpdateButton" onClick={this.handleSubmit}>
              Login
            </button>
            {this.state.redirect ? <Navigate to="/welcome" /> : null}
          </div>
        </div>
      </div>
    );
  }
}

export default withParams(LoginPannel);
