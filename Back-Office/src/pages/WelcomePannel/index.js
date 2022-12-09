import React from "react";
import { useParams } from "react-router-dom";
import LinkButton from "../../component/LinkButton";

function withParams(Component) {
  return (props) => <Component {...props} params={useParams()} />;
}

class WelcomePannel extends React.Component {
  render() {
    return (
      <div>
        <div className="header">
        <h1
            style={{
                fontSize: "60px",
            }}
        >Welcome</h1>
                    <img
                        className='imgCroixRouge'
                        src="https://i.pinimg.com/originals/64/11/f0/6411f0dd5a67d583c81851b1c355833f.png"
                        alt="settings" />
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
                txt="Donation Types"
                link="donationTypeList"
                img="https://dm0qx8t0i9gc9.cloudfront.net/thumbnails/video/e4Gpia8/videoblocks-close-up-footage-of-a-bag-of-blood-at-the-blood-transfusion-department-the-_bv6nvm9qn_thumbnail-1080_01.png"
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
