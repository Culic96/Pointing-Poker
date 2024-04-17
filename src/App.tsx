import React, { useEffect, useState } from 'react';
import Header from './Components/Header';
import { BodyWrapper, LoginRegisterButton } from './common/commonStyles/styled';
import LoginModal from './Components/LoginModal';
import RegisterModal from './Components/RegisterModal/RegisterModal';



function App() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const [isRegisterModalOpen, setISRegisterModalOpen] = useState(false)
  const handleModalClose = () => {
    setIsLoginModalOpen(false)
    setISRegisterModalOpen(false)
  }
  return (
    <>
    <Header/>
    <BodyWrapper>
    {!isLoginModalOpen && !isRegisterModalOpen && (
  <LoginRegisterButton onClick={() => setIsLoginModalOpen(true)}>
    <h2>Login</h2>
  </LoginRegisterButton>
)}
      {isLoginModalOpen  && <LoginModal isOpen={isLoginModalOpen} onClose={handleModalClose}/>}
      {isRegisterModalOpen && <RegisterModal isOpen={isRegisterModalOpen} onClose={handleModalClose}></RegisterModal>}
      {(!isLoginModalOpen && !isRegisterModalOpen) && (
      <LoginRegisterButton onClick={() =>  setISRegisterModalOpen(true)}><h2>Register</h2></LoginRegisterButton>

      )}
    </BodyWrapper>
    </>
  );
}

export default App;
