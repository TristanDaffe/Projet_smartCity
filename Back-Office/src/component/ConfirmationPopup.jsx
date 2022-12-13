import React from 'react';
import Popup from 'reactjs-popup';

export default () => (
  <Popup
    trigger={<button className="button"> Open Modal </button>}
    modal
    nested
  >
    {close => (
      <div className="modal">
        <button className="close" onClick={close}>
          &times;
        </button>
        <div className="header"> Modal Title </div>
        <div className="content">
          {' '}
          Titre du popup
          <br />
          Corps du popup
        </div>
        <div className="actions">
          <Popup
            trigger={<button className="button"> Trigger </button>}
            position="top center"
            nested
          >
            <span>
              Ce qui se passe quand ça trigger 
            </span>
          </Popup>
          <button
            className="button"
            onClick={() => {
              console.log('modal closed ');
              close();
            }}
          >
            close modal
          </button>
        </div>
      </div>
    )}
  </Popup>
);

// class ConfirmationPopup extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             showPopup: false
//         };
//         this.togglePopup = this.togglePopup.bind(this);
//     }

//     togglePopup() {
//         console.log("togglePopup");
//         this.setState({
//             showPopup: !this.state.showPopup
//         });
//     }


//     render() {

//         if (this.state.showPopup) {
//             document.body.classList.add('active-modal')
//         }
//         else {
//             document.body.classList.remove('active-modal')
//         }

//         return (
//             <>
//             <button onClick={this.togglePopup} className="btn-modal">
//                 Open
//             </button>
//             {this.showPopup && (
//                 <div className="modal">
//                     <div onClick={this.togglePopup} className="overlay"></div>
//                     <div className="modal-content">
//                         <h2>Hello Modal</h2>
//                         <p>
//                             Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident
//                             perferendis suscipit officia recusandae, eveniet quaerat assumenda
//                             id fugit, dignissimos maxime non natus placeat illo iusto!
//                             Sapiente dolorum id maiores dolores? Illum pariatur possimus
//                             quaerat ipsum quos molestiae rem aspernatur dicta tenetur. Sunt
//                             placeat tempora vitae enim incidunt porro fuga ea.
//                         </p>
//                         <button className="close-modal" onClick={this.togglePopup}>
//                             CLOSE
//                         </button>
//                         <button className="confirmation-button" onClick={this.togglePopup}>
//                             CONFIRM
//                         </button>
//                     </div>
//                 </div>
//             )}
//         </>
                    

//         );
//     }
// }

// export default ConfirmationPopup;




// export default function Modal() {
//     const [modal, setModal] = useState(false);

//     const togglePopup = () => {
//         setModal(!modal);
//     };

//     if (modal) {
//         document.body.classList.add('active-modal')
//     } else {
//         document.body.classList.remove('active-modal')
//     }

//     return (
//         <>
//             <button onClick={this.togglePopup} className="btn-modal">
//                 Open
//             </button>
//             {modal && (
//                 <div className="modal">
//                     <div onClick={this.togglePopup} className="overlay"></div>
//                     <div className="modal-content">
//                         <h2>Hello Modal</h2>
//                         <p>
//                             Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident
//                             perferendis suscipit officia recusandae, eveniet quaerat assumenda
//                             id fugit, dignissimos maxime non natus placeat illo iusto!
//                             Sapiente dolorum id maiores dolores? Illum pariatur possimus
//                             quaerat ipsum quos molestiae rem aspernatur dicta tenetur. Sunt
//                             placeat tempora vitae enim incidunt porro fuga ea.
//                         </p>
//                         <button className="close-modal" onClick={this.togglePopup}>
//                             CLOSE
//                         </button>
//                         <button className="confirmation-button" onClick={this.togglePopup}>
//                             CONFIRM
//                         </button>
//                     </div>
//                 </div>
//             )}
//         </>
//     );
// }