import React, { useState, useRef, useEffect } from "react";
import ReactDom from "react-dom";

// Generic Modal Component Imports:
import { Background, ModalWrapper, CloseModalButton } from "./styles";

// Specific Modal Imports:
import AddCompanyModal from "./AddCompanyModal/AddCompanyModal";
import LogInModal from "./LogInModal/LogInModal";
import SignUpModal from "./SignUpModal/SignUpModal";
import ReviewModal from "./ReviewModal/ReviewModal";
import AddJobModal from "./AddJobModal/AddJobModal";
import InterviewModal from "./InterviewModal/InterviewModal";
import SalaryModal from "./SalaryModal/SalaryModal";
import ForgotPasswordModal from "./ForgotPasswordModal/ForgotPasswordModal";

// ==============================================================================================================

// Generic Modal Handler:
const Modal = ({job, company, initialModal, onClose, onSubmit }) => {
  const [modalType, setModalType] = useState(initialModal);
    
  // Determines which modal to render depending on state
  const ModalToRender = () => {
    if (modalType === "Add Company") {
      return <AddCompanyModal />;
    } else if (modalType === "Log In") {
      return <LogInModal changeModalState={setModalType}/>;
    } else if (modalType === "Sign Up") {
      return <SignUpModal changeModalState={setModalType}/>;
    } else if (modalType === "Add Review") {
        return <ReviewModal job={job} company={company} onSubmit={onSubmit} onClose={onClose} />;
    } else if (modalType === "Add Interview") {
        return <InterviewModal job={job} company={company} onSubmit={onSubmit} onClose={onClose} />;
    } else if (modalType === "Add Salary") {
        return <SalaryModal job={job} company={company} onSubmit={onSubmit} onClose={onClose} />;
    } else if (modalType === "Add Job") {
        return <AddJobModal />
    } else if (modalType === "Forgot Password") {
        return <ForgotPasswordModal onClose={onClose}/>
    }
  };

  // Any clicks outside the modal (in the greyed out background area) will result in the modal being closed
  const modalRef = useRef();
  const closeModalClick = (event) => {
    if (modalRef.current === event.target) {
      onClose();
    }
  };

  // Escape key will also trigger the closing of the modal
  useEffect(() => {
    const closeModalKey = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    }

    window.addEventListener('keydown', closeModalKey);
    return () => window.removeEventListener('keydown', closeModalKey);
  })

  //TODO: Brief fade-in animation for Modal

  return ReactDom.createPortal(
    <Background onMouseDown={closeModalClick} ref={modalRef}>
        <ModalWrapper onClick={(e) => e.stopPropagation()}>
          <CloseModalButton onClick={onClose} />
          <ModalToRender />
        </ModalWrapper>
    </Background>,
    document.getElementById("portal")
  );
};

export default Modal;
