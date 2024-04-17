import React from "react";
import { LoginRegisterButton, ModalButtonsWrapper, ModalInput, ModalTitle, ModalsWrapper, Paragraph } from "../../common/commonStyles/styled";
interface LoginModalProps {
    isOpen: boolean;
    onClose: () => void;
  }
export default function LoginModal({ isOpen, onClose }: LoginModalProps): JSX.Element | null {
    return isOpen ? (
      <>
        <ModalsWrapper>
            <ModalTitle>Wellcome back to the <br/>GC-Pointing Poker</ModalTitle>
            <Paragraph>Enter your email</Paragraph>
            <ModalInput placeholder="Enter your email"></ModalInput>
            <Paragraph>Enter your password</Paragraph>
            <ModalInput placeholder="Enter your password"></ModalInput>
            <ModalButtonsWrapper>
            <LoginRegisterButton><h2>Login</h2></LoginRegisterButton>
            <LoginRegisterButton onClick={() => onClose()}><h2>Close</h2></LoginRegisterButton>
            </ModalButtonsWrapper>
            </ModalsWrapper>
      </>
    ) : null;
  }
