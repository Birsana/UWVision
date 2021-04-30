import styled from "styled-components";
import { MdClose } from "react-icons/md";

export const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 1;
`;

export const ModalWrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  width: 300px;
  transform: translate(-50%, -50%);
  background: #fff;
  padding: 10px;
  border-radius: 3px;
  box-shadow: 0 5px 16px rgba(0, 0, 0, 0.3);
  z-index: 1;

  display: flex;
  flex-direction: column;
`;

export const CloseModalButton = styled(MdClose)`
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 10px;
  width: 20px;
  height: 20px;
  z-index: 1;
  color: grey;

  &:hover {
    color: black;
  }
`;

export const Title = styled.div`
  margin-top: 15px;
  margin-left: 10px;
  font-family: Roboto Slab;
  font-size: 23px;
  font-weight: bold;
`;

export const Divider = styled.hr`
  border: none;
  height: 1px;
  width: 107%;
  margin-left: -10px;
  margin-bottom: 5px;
  background-color: #d0d0d0;
`;

export const ModalTitle = ({ title }) => {
  return (
    <>
      <Title>{title}</Title>
      <Divider />
    </>
  );
};

export const ModalText = styled.p`
  margin-left: 11px;
  font-family: Roboto Slab; 
  width: 90%;
`;

export const ModalButton = styled.button`
  cursor: pointer;
  margin-left: 10px;
  margin-top: 15px;
  height: 35px;
  width: 90%;
  border: none;
  border-radius: 5px;
  font-family: Roboto Slab;

  background: #07C45F;
  color: black;
  font-weight: bold;

  &:hover {
    background: #0A9C4E;
  }
`;

export const ModalSignUpButton = ({ onClick }) => {
  return (
    <>
    <Divider />
    <ModalText onClick={onClick}>New to WaterlooVision? <u style={{cursor: "pointer"}}>Sign Up!</u></ModalText>
    </>
  )
}

export const ModalLogInButton = ({ onClick }) => {
  return (
    <>
    <Divider />
    <ModalText onClick={onClick}>Already have an account? <u style={{cursor: "pointer"}}>Log In!</u></ModalText>
    </>
  )
}

export const FormInput = styled.input`
  margin-left: 10px;
  margin-top: 10px;
  height: 35px;
  width: 90%;
  background-color: rgba(239, 239, 239);
  border: none;
  border-radius: 3px;
  font-family: Roboto Slab;
  padding-left: 10px;

  &:focus {
    outline: none;
  }
`;

export const FormErrorMessage = styled.div`
  margin-left: 10px;  
  margin-top: 5px;
  height: 18px;
  width: 90%;
  border-radius: 3px;
  background-color: rgb(255, 86, 48);

  p {
    margin-top: 0;
    margin-left: 4px;
    font-family: Roboto Slab;
    font-size: 12px;
    color: #FFF;
  }
`;

export const FormSubmitButton = styled.input.attrs({
  type: "submit",
})`
  cursor: pointer;
  margin-left: 10px;
  margin-top: 15px;
  margin-bottom: 10px;
  height: 35px;
  width: 90%;
  border: none;
  border-radius: 5px;
  font-family: Roboto Slab;

  background: #ffc333;
  color: black;

  &:hover {
    background: #f1ac15;
  }
`;
