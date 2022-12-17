import React from "react";
import { useParams } from "react-router-dom";
import LinkButton from "../../component/LinkButton";
import { getToken, removeToken } from "../../context/LoginContext";
import { Navigate } from "react-router-dom";

function withParams(Component) {
  return (props) => <Component {...props} params={useParams()} />;
}


class WelcomePannel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
    };
  }

  logout = () => {
    removeToken();
    console.log("token : ");
    console.log(getToken());
    this.setState({ redirect: true });
  };



  render() {
    return (
      
      <div>
        
        <div className="header">
          <div className="backButtonContainer">
            
            <button 
              className="addBackButton"
              onClick={this.logout}
            >
              {this.state.redirect && <Navigate to="/login" />}
              Log out
            </button>
          </div>
          <h1
            style={{
              fontSize: "60px",
            }}
          >
            Welcome
          </h1>
          <img
            className="imgCroixRouge"
            src="https://i.pinimg.com/originals/64/11/f0/6411f0dd5a67d583c81851b1c355833f.png"
            alt="settings"
          />
        </div>

        <div className="WelcomePannelContainer">
          <LinkButton
            txt="Donations"
            link="donationList"
            img="https://thumbs.dreamstime.com/b/young-man-making-blood-donation-hospital-focus-hands-164616106.jpg"
            alt="Donations"
            paddingTop="10px"
          />

          <LinkButton
            txt="Donation Centers"
            link="donationCenterList"
            img="https://www.quickenloans.com/blog/wp-content/uploads/2015/03/donation-center.jpg"
            alt="Donation Centers"
          />
        </div>
        <div className="WelcomePannelContainer">
          <LinkButton
            txt="Opening Days"
            link="openingDayList"
            img="https://media.istockphoto.com/videos/signing-a-day-on-a-calendar-by-red-pen-video-id1087654284?s=640x640"
            alt="Donation Types"
          />
          <LinkButton
            txt="Donors"
            link="donorList"
            img="https://media.istockphoto.com/photos/young-medical-students-interview-patient-during-hospital-rounds-picture-id813533532"
            alt="Donors"
          />
        </div>   
      </div>
    );
  }
}

export default withParams(WelcomePannel);
