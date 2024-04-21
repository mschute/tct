import React from 'react';
import '../styles/modalPopUp.css';

const Modal = ({modalTitle, message, closeModal}) => {
    return (
        <div className="modal-container">
            <div className="modal-dialog-container">
                <div className="modal-content-container">
                    <div className="modal-header-container">
                        <h5 className="modal-title-container">{modalTitle}</h5>
                        <button type="button" className="close-button" onClick={closeModal} data-dismiss="modal"
                                aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body-container">
                        <p>{message}</p>
                    </div>
                    <div className="modal-footer-container">
                        <button type="button" className="primary-button" onClick={closeModal}
                                data-dismiss="modal">Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;