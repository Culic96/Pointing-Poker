import styled from "styled-components";

export const BodyWrapper = styled('div')({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    gap: '20px',
})


export const ModalsWrapper = styled('div')({
    padding: '100px', // Decrease padding for less space
    display: 'flex',
    textAlign: 'center',    
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: '#f0f0f0',
    gap: '30px',
    zIndex: 1,
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', // Adjust shadow for depth
    borderRadius: '12px', // Add rounded corners for a softer look
})

export const ModalInput = styled('input')({
    outline: 0,
    border: 0,
    borderBottom: '2px solid #000',
    fontSize: '18px', // Decrease font size for better proportion
    transition: 'border-color 0.3s ease',
    backgroundColor: 'transparent',
    padding: '10px',
    "&:focus": {
        borderBottom: '2px solid orange',
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
    fontSize: '22px', // Decrease font size for better proportion
})

export const ModalTitle = styled('h2')({
    fontSize: '32px', // Decrease font size for better proportion
    fontWeight: 'bold', // Add bold font weight for emphasis
    marginBottom: '20px', // Add margin bottom for spacing
})
