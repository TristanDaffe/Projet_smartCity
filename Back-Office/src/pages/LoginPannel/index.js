import React from "react";
import { useParams } from "react-router-dom";
import { getToken } from "../../context/LoginContext";
import { login } from "../../component/API/http";
import { Navigate } from "react-router-dom";
import CustomModal from "../../component/CustomModal";

function withParams(Component) {
  return (props) => <Component {...props} params={useParams()} />;
}

class LoginPannel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      login: "",
      password: "",
      redirect: false,
      token: "",
      modal: false,
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();
<<<<<<< HEAD
    try {
      login(this.state.login, this.state.password)
      .then(() => {
        this.setState({ token: getToken(), redirect: true });
      })
      .catch((error) => {
        const state = {
          modal: true,
          header: "Error",
        };
        
        if (error.response !== undefined) {
          state.body = error.response.data;
        } else {
          state.body = "Something went wrong, try again later";
        }
        this.setState(state);
      });
    } catch (error) {
      const state = {
        modal: true,
        header: "Error",
        body: "Something went wrong, try again later",
      };
      this.setState(state);
    }
=======
    login(this.state.login, this.state.password).then(() => {
        this.setState({ token: getToken() });
        this.setState({ redirect: true });
        console.log(this.state);
    }).catch((error) => {
      console.log(error);
        this.setState({ modal: true });
        this.setState({ header: "Error" });
        this.setState({ body: error.response.data });
    });
>>>>>>> dee27da1806c7779d36d2c4feff376170c6efff1
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
        <form onSubmit={this.handleSubmit} className="addUpdateContainer">
          <div className="firstItem">
            <label htmlFor="login">Login</label>
            <input
              type="text"
              className="addUpdateInput"
              id="login"
              placeholder="Enter login"
              onChange={(event) => this.setState({ login: event.target.value })}
            />
          </div>
          <div className="item">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="addUpdateInput"
              id="password"
              placeholder="Enter password"
              onChange={(event) =>
                this.setState({ password: event.target.value })
              }
            />
          </div>
          <div className="lastItem">
            <button type="submit" className="addUpdateInput">
              Submit
            </button>
          </div>

          {this.state.redirect ? <Navigate to="/welcome" /> : null}
        </form>
        {this.state.modal && (
          <CustomModal
            modal={this.state.modal}
            header={this.state.header}
            body={this.state.body}
            button={
              <button
                onClick={() => this.setState({ modal: false })}
                className="btn-modal"
              >
                Close
              </button>
            }
          ></CustomModal>
        )}
      </div>
    );
  }
}

export default withParams(LoginPannel);
