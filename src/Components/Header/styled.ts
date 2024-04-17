import styled from "styled-components";

export const HeaderWrapper = styled('div')({
    height: '10vh',
    width: '100%',
    backgroundColor: '#fff',
    borderBottom: '3px solid #f0f0f0',
    display: 'flex',
    boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px'
})

export const ImageWrapper = styled('div')({
    width: '50%',
    height: '100%',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingLeft: '100px',
    gap: '10px',
})

export const HeaderTitle = styled('h2')({
    color: 'orange',
    fontSize: '32px',
})