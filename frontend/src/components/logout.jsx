import React from 'react';
import './module.css'
import { Link } from 'react-router-dom';
const LogoutModal = ({modal, toggleModal}) => {
  if(modal) {
    document.body.classList.add('active-modal')
  } else {
    document.body.classList.remove('active-modal')
  }
  return (
    <>
      {modal && (
        <div className="modal">
          <div onClick={toggleModal} className="overlay"></div>
          <div className="modal-content">
            <p>
            Are you sure you want to logout?
            </p>
            <Link to={'/'} className="close-modal mr-60"  onClick={toggleModal}>
              Yes
            </Link>
            <button className="close-modal" onClick={toggleModal}>
              No
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default LogoutModal;
