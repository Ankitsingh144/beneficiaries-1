import React from 'react';

const ConfirmUpdateModal = ({ show, onClose, onConfirm, beneficiary, title = "Are you sure you want to delete", confirmBtnName = "Delete" }) => {
    if (!show) {
        return null;
    }

    return (
        <div className="modal show" style={{ display: 'block' }}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Confirm ?</h5>
                        <button type="button" className="btn-close" aria-label="Close" onClick={onClose}>  X</button>
                    </div>
                    <div className="modal-body">
                        <p>{title} the beneficiary: <b>{beneficiary?.fullName}</b>?</p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={onClose}>
                            Close
                        </button>
                        <button type="button" className="btn btn-danger" onClick={onConfirm}>
                            {confirmBtnName}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConfirmUpdateModal;
