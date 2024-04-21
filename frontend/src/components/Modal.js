import React from 'react';
import '../styles/modalPopUp.css';

const Modal = ({modalTitle, message, closeModal}) => {
    return (
        <div className="modal">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{modalTitle}</h5>
                        <button type="button" className="close" onClick={closeModal} data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <p>{message}</p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="primary-button" onClick={closeModal} data-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;