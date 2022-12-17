import React from "react";
import "../css/Modal.css";

class ErrorModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: props.modal,
      header: props.header,
      body: props.body, 
      onclick: props.onclick,
      button : props.button,
      closeButton: props.closeButton,
    };
  }

  handleClose = () => {
    this.setState({ modal: false });
    window.location.reload();
    };

  render() {
    return (
      <div>
        {this.state.modal && (
          <div className="modal">
            <div onClick={this.toggleModal} className="overlay"></div>
            <div className="modal-content">
              <h1>{this.state.header}</h1>
              <p>{this.state.body}</p>
              {this.state.button }
              {this.state.closeButton}
              
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default ErrorModal;

