import styled from "styled-components";

export const BodyWrapper = styled('div')({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    gap: '20px'
})

export const LoginRegisterButton = styled('button')({
    backgroundColor: 'orange',
    color: '#fff',
    textAlign: 'center',
    width: '200px',
    height: '50px',
    outline: 0,
    border: '2px solid transparent',
    "&:hover": {
        backgroundColor: '#ffcc33',
        cursor: 'pointer',
        transition: '0.3s ease',
        border: '2px solid orange'
    }
})

export const ModalsWrapper = styled('div')({
    padding: '60px 80px',
    display: 'flex',
    textAlign: 'center',    
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: '#f0f0f0',
    gap: '30px',
    zIndex: 1,
    boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px'
})

export const ModalInput = styled('input')({
    outline: 0,
    border: 0,
    borderBottom: '2px solid #000',
    fontSize: '22px',
    transition: '0.3s ease',
    backgroundColor: 'transparent',
    padding: '10px',
    "&:focus": {
        borderBottom: '2px solid orange',
        transition: '0.3s ease'
    }
})

export const ModalButtonsWrapper = styled('div')({
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    gap: '20px'
})

export const Paragraph = styled('p')({
    fontSize: '26px',
})

export const ModalTitle = styled('h2')({
    fontSize: '40px',
    
})