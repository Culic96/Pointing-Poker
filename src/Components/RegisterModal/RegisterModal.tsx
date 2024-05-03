import React, { FormEvent, useState } from "react";
import { registerUser } from "../../firebase/firebaseFunctions";
import {
  ModalButtonsWrapper,
  ModalInput,
  ModalTitle,
  ModalsWrapper,
  Paragraph,
} from "../../common/commonStyles/styled";
import { PrimaryButton } from "../PokerSession/styled";




interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function RegisterModal({
  isOpen,
  onClose,
}: RegisterModalProps): JSX.Element | null {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState('');
 
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await registerUser(email, password, name);
      setEmail("");
      setPassword("");
      setName("");
    } catch (error: any) {
      alert(error.message);
    }
    finally {
      onClose()
    }
  }

  return isOpen ? (
    <>
      <form onSubmit={handleSubmit}>
        <ModalsWrapper>
          <ModalTitle>
            Welcome to the <br />
            GC-Pointing Poker
          </ModalTitle>
          <Paragraph>Enter your email</Paragraph>
          <ModalInput
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="Enter your email"
          />
          <Paragraph>Enter your password</Paragraph>
          <ModalInput
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="Enter your password"
          />
          <Paragraph>Enter your name</Paragraph>
          <ModalInput
            type="text"
            onChange={(e) => setName(e.target.value)}
            value={name}
            placeholder="Enter your name"
          />
          <ModalButtonsWrapper>
            <PrimaryButton type="submit">
              <h2>Register</h2>
            </PrimaryButton>
            <PrimaryButton onClick={onClose}>
              <h2>Close</h2>
            </PrimaryButton>
          </ModalButtonsWrapper>
        </ModalsWrapper>
      </form>
    </>
  ) : null;
}
