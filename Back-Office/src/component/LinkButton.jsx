import React from "react";

class LinkButton extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            txt : props.txt,
            link: props.link,
            img: props.img,
            alt : props.alt,
            paddingTop : props.paddingTop,
            padingLeft : props.padingLeft,
        }
    }

    render() {
        return (<div className="LinkButtonContainer">
            <a 
                href= {this.state.link}
                rel="noreferrer">
                <p className="LinkButtonText"
                   //paddingTop={this.state.paddingTop}
                    >{this.state.txt}</p>
                <img 
                    
                    className="LinkButtonImg"
                    src = {this.state.img}
                    alt = {this.state.alt} ></img>
            </a>
        </div>
        );
    }
}

export default LinkButton;