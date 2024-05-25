import React from "react";
import { HeaderTitle, HeaderWrapper, ImageWrapper } from "./styled";
import { PrimaryButton } from "../PokerSession/styled";
import { AuthProvider, useAuth } from "../../Hooks/useAuth";
export default function Header(children: any) {
  const { auth, logoutUser } = useAuth();
  console.log("this is auth in header", auth)
  return (
    <>
      <HeaderWrapper>
        <ImageWrapper>
          <img src={"/images/argusLogo.png"} width={70} height={50}></img>
          <HeaderTitle>GC-Pointing Poker</HeaderTitle>
        </ImageWrapper>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            width: "50%",
            height: '100%',
            paddingRight: "60px",
            overflow: 'hidden'
          }}
        >
          
          {auth !== null &&<PrimaryButton onClick={logoutUser}>Logout</PrimaryButton>}
        </div>
      </HeaderWrapper>
    </>
  );
}
