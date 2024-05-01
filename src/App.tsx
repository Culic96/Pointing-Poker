import React, { useEffect, useState } from 'react';
import Header from './Components/Header';
import { BodyWrapper, LoginRegisterButton } from './common/commonStyles/styled';
import LoginModal from './Components/LoginModal';
import RegisterModal from './Components/RegisterModal/RegisterModal';
import PokerSession from './Components/PokerSession/PokerSession';
import {  AuthProvider, useAuth } from './Hooks/useAuth';
export default function App() {
  const {auth} = useAuth()
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const [isRegisterModalOpen, setISRegisterModalOpen] = useState(false)
  const handleModalClose = () => {
    setIsLoginModalOpen(false)
    setISRegisterModalOpen(false)
  }
  useEffect(() => {
  console.log('auth APP.tsx', auth)

  },[auth])
  return (
    <>
    <Header/>
    <BodyWrapper>
    {(!isLoginModalOpen && !isRegisterModalOpen  && auth === null )&&(
      <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', gap: '20px'}}>
   
  <LoginRegisterButton onClick={() => setIsLoginModalOpen(true)}>
    <h2>Login</h2>
  </LoginRegisterButton>
  <LoginRegisterButton onClick={() =>  setISRegisterModalOpen(true)}><h2>Register</h2></LoginRegisterButton>

  </div>
)}

      {isLoginModalOpen  && <LoginModal  isOpen={isLoginModalOpen} onClose={handleModalClose}/>}
      {isRegisterModalOpen && <RegisterModal  isOpen={isRegisterModalOpen} onClose={handleModalClose}></RegisterModal>}
      

      {auth && <PokerSession/>}
    </BodyWrapper>
    </>
  );
}
