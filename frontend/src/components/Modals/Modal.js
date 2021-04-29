import React, { useState, useRef } from "react";
import ReactDom from "react-dom";
// TODO: Animations  (import { useSpring, animated } from 'react-spring';)

import { Background, ModalWrapper, CloseModalButton } from "./styles";
import AddCompanyModal from "./AddCompanyModal/AddCompanyModal";
import LogInModal from "./LogInModal/LogInModal";
import SignUpModal from "./SignUpModal/SignUpModal";

const Modal = ({ initialModal, onClose }) => {
  const [modalType, setModalType] = useState(initialModal);
    
  const ModalToRender = () => {
    if (modalType === "Add Company") {
      return <AddCompanyModal changeModalState={setModalType} />;
    } else if (modalType === "Log In") {
      return <LogInModal changeModalState={setModalType} />;
    } else if (modalType === "Sign Up") {
      return <SignUpModal changeModalState={setModalType} />;
    }
  };

  /* Any clicks outside the modal (or rather on the background) will result in the modal being closed */
  const modalRef = useRef();
  const closeModal = (event) => {
    if (modalRef.current === event.target) {
      onClose();
    }
  };

  // TODO: Escape key will also trigger the closing of modal

  return ReactDom.createPortal(
    <Background onClick={closeModal} ref={modalRef}>
      <ModalWrapper>
        <CloseModalButton onClick={onClose} />
        <ModalToRender />
      </ModalWrapper>
    </Background>,
    document.getElementById("portal")
  );
};

export default Modal;
