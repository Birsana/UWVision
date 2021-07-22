import styled from "styled-components";
import { MdClose } from "react-icons/md";
import TextareaAutosize from '@material-ui/core/TextareaAutosize';

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
  width: 80%;
  max-height: calc(100% - 40px);
  overflow-y: auto;
  max-width: 400px;
  transform: translate(-50%, -50%);
  background: #fff;
  padding: 10px;
  border-radius: 4px;
  box-shadow: 0 5px 16px rgba(0, 0, 0, 0.3);
  z-index: 1;
  display: flex;
  flex-direction: column;
`;

export const CloseModalButton = styled(MdClose)`
  cursor: pointer;
  position: absolute;
  top: 14px;
  right: 14px;
  width: 20px;
  height: 20px;
  z-index: 1;
  color: grey;

  &:hover {
    color: black;
  }
`;

export const Title = styled.div`
  margin-left: 22px;
  margin-top: 15px;
  font-size: 30px;
  font-weight: bold;
  @media (max-width: 820px) {
    font-size: 24px;
  }
`;

export const Divider = styled.hr`
  border: none;
  height: 1px;
  width: 100%;
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
  margin-left: 20px;
  width: 90%;
`;

export const ModalButton = styled.button`
  cursor: pointer;
  margin-top: 15px;
  margin-bottom: 20px;
  height: 35px;
  width: 90%;
  border: none;
  border-radius: 4px;
  font-size: 16px;

  background: #2196f3;
  color: white;
  font-weight: bold;

  &:hover {
    background: #1976d2;
  }
`;

export const ModalSignUpButton = ({ onClick }) => {
  return (
    <>
    <Divider />
    <ModalText>New to UWVision? <u onClick={onClick} style={{cursor: "pointer"}}>Sign Up!</u></ModalText>
    </>
  )
}

export const ModalForgotPasswordButton = ({onClick}) => {
  return (
    <ModalText> <u onClick={onClick} style={{cursor: "pointer"}}>Forgot Password?</u></ModalText>
  )
}

export const ModalLogInButton = ({ onClick }) => {
  return (
    <>
      <Divider />
      <ModalText>Already have an account? <u onClick={onClick} style={{cursor: "pointer"}}>Login!</u></ModalText>
    </>
  )
}

export const FormTextarea = styled(TextareaAutosize)`
  margin-top: 10px;
  min-height: 100px;
  width: 90%;
  background-color: rgba(239, 239, 239);
  border: none;
  border-radius: 4px;
  font-size: 16px;
  padding: 10px;
  resize: none;

  &:focus {
    outline: none;
  }
`

export const FormInput = styled.input`
  margin-top: 10px;
  height: 35px;
  width: 90%;
  background-color: rgba(239, 239, 239);
  border: none;
  border-radius: 4px;
  font-size: 16px;
  padding: 10px;

  &:focus {
    outline: none;
  }
`;

export const FormSelect = styled.select`
  margin-top: 10px;
  height: 35px;
  width: 100%;
  background-color: rgba(239, 239, 239);
  border: none;
  border-radius: 4px;
  font-size: 16px;
  padding: 0 10px;
  -webkit-appearance: none;
  appearance: none;

  &:focus {
    outline: none;
  }
`;

export const FormSelectWrapper = styled.div`
  position: relative;
  height: 35px;
  width: 90%;
  &::after {
    content: "▼";
    pointer-events: none;
    font-size: 10px;
    top: 23px;
    right: 10px;
    color: grey;
    position: absolute;
  }
`

export const FormErrorMessage = styled.div`
  margin: 5px 0;
  height: 20px;
  width: 90%;

  p {
    margin-top: 0;
    margin-left: 4px;
    font-size: 13px;
    font-weight: bold;
    color: rgb(255, 86, 48);
  }
`;

export const FormSubmitButton = styled.input.attrs({
  type: "submit",
})`
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  opacity: 1;
  cursor: pointer;
  margin-top: 15px;
  margin-bottom: 10px;
  height: 35px;
  width: 90%;
  border: none;
  border-radius: 4px;
  font-size: 16px;

  background: #2196f3;
  color: white;
  font-weight: bold;

  &:hover {
    background: #1976d2;
  }
`;
