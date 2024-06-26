import React, { useEffect, useState } from 'react';
import Header from './Components/Header';
import { BodyWrapper } from './common/commonStyles/styled';
import LoginModal from './Components/LoginModal';
import RegisterModal from './Components/RegisterModal/RegisterModal';
import PokerSession from './Components/PokerSession/PokerSession';
import {  useAuth } from './Hooks/useAuth';
import { PrimaryButton } from './Components/PokerSession/styled';
const INACTIVITY_TIMEOUT = 45 * 60 * 1000;
export default function App() {
  const {auth, logoutUser} = useAuth()
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const [isRegisterModalOpen, setISRegisterModalOpen] = useState(false)
  const handleModalClose = () => {
    setIsLoginModalOpen(false)
    setISRegisterModalOpen(false)
  }

  useEffect(() => {
    let inactivityTimer: NodeJS.Timeout;

    const resetInactivityTimer = () => {
      clearTimeout(inactivityTimer);
      inactivityTimer = setTimeout(async () => {
        await logoutUser();
      }, INACTIVITY_TIMEOUT);
    };

    const handleUserActivity = () => {
      resetInactivityTimer();
    };

    window.addEventListener('mousemove', handleUserActivity);
    window.addEventListener('keypress', handleUserActivity);
    window.addEventListener('scroll', handleUserActivity);
    window.addEventListener('click', handleUserActivity);

    resetInactivityTimer();

    return () => {
      clearTimeout(inactivityTimer);
      window.removeEventListener('mousemove', handleUserActivity);
      window.removeEventListener('keypress', handleUserActivity);
      window.removeEventListener('scroll', handleUserActivity);
      window.removeEventListener('click', handleUserActivity);
    };
  }, [logoutUser]);

  return (
    <>
    <Header/>
    <BodyWrapper>
    {(!isLoginModalOpen && !isRegisterModalOpen  && auth === null )&&(
      <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', gap: '20px'}}>
   
  <PrimaryButton onClick={() => setIsLoginModalOpen(true)}>
    <h2>Login</h2>
  </PrimaryButton>
  <PrimaryButton onClick={() =>  setISRegisterModalOpen(true)}><h2>Register</h2></PrimaryButton>

  </div>
)}

      {isLoginModalOpen  && <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', gap: '20px', padding: '50px'}}> <LoginModal  isOpen={isLoginModalOpen} onClose={handleModalClose}/> </div>  }
      {isRegisterModalOpen && <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', gap: '20px'}}> <RegisterModal  isOpen={isRegisterModalOpen} onClose={handleModalClose}></RegisterModal></div>}
      

      {auth && <PokerSession/>}
    </BodyWrapper>
    </>
  );
}
