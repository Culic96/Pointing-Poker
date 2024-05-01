import React, { FormEvent, useState } from "react";
import {
  LoginRegisterButton,
  ModalButtonsWrapper,
  ModalInput,
  ModalTitle,
  ModalsWrapper,
  Paragraph,
} from "../../common/commonStyles/styled";
import { loginUser } from "../../firebase/firebaseFunctions";
interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}
export default function LoginModal({
  isOpen,
  onClose,
}: LoginModalProps): JSX.Element | null {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      await loginUser(email, password);
      setEmail("");
      setPassword("");
    } catch (error: any) {
      alert(error.message);
    }
    finally{
      onClose();
    }
  }
  return isOpen ? (
    <>
      <form onSubmit={handleSubmit}>
        <ModalsWrapper>
          <ModalTitle>
            Wellcome back to the <br />
            GC-Pointing Poker
          </ModalTitle>
          <Paragraph>Enter your email</Paragraph>
          <ModalInput
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="Enter your email"
          ></ModalInput>
          <Paragraph>Enter your password</Paragraph>
          <ModalInput
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="Enter your password"
          ></ModalInput>
          <ModalButtonsWrapper>
            <LoginRegisterButton
              type="submit"
            >
              <h2>Login</h2>
            </LoginRegisterButton>
            <LoginRegisterButton onClick={() => onClose()}>
              <h2>Close</h2>
            </LoginRegisterButton>
          </ModalButtonsWrapper>
        </ModalsWrapper>
      </form>
    </>
  ) : null;
}
