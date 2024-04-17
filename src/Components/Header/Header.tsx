import React from "react"
import {HeaderTitle, HeaderWrapper, ImageWrapper} from "./styled";
export default function Header (children: any)  {
    return (
        <>
        <HeaderWrapper>
            <ImageWrapper>
            <img src={"/images/argusLogo.png"} width={70} height={50}></img>
            <HeaderTitle>GC-Pointing Poker</HeaderTitle>
            </ImageWrapper>
        </HeaderWrapper>
        </>
    )
}