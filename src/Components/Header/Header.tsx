import React from "react";
import { HeaderTitle, HeaderWrapper, ImageWrapper } from "./styled";
import { PrimaryButton } from "../PokerSession/styled";
import { useAuth } from "../../Hooks/useAuth";
export default function Header(children: any) {
  const { auth, logoutUser } = useAuth();
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
            paddingRight: "40px",
          }}
        >
          {auth && <PrimaryButton onClick={logoutUser}>Logout</PrimaryButton>}
        </div>
      </HeaderWrapper>
    </>
  );
}
